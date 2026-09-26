<?php

namespace App\Http\Controllers\Workspaces;

use App\Enums\WorkspaceRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Workspaces\UpdateWorkspaceMemberRequest;
use App\Models\Membership;
use App\Models\User;
use App\Models\Workspace;
use App\Models\WorkspaceInvitation;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Fortify;

class WorkspaceMemberController extends Controller
{
    /** @var list<int> */
    private const PER_PAGE_OPTIONS = [10, 25, 50, 100];

    /**
     * Display the workspace's members and pending invitations.
     */
    public function index(Request $request, Workspace $workspace): Response
    {
        Gate::authorize('view', $workspace);

        $user = $request->user();

        return Inertia::render('workspaces/members', [
            'workspace' => [
                'id' => $workspace->id,
                'uuid' => $workspace->uuid,
                'name' => $workspace->name,
                'slug' => $workspace->slug,
                'logo' => $workspace->logo,
                'isPersonal' => $workspace->is_personal,
            ],
            'members' => $workspace->members()
                ->orderByPivot('created_at')
                ->paginate($this->perPage($request, 'members_per_page'))
                ->withQueryString()
                ->through(fn (User $member): array => $this->memberProps($member)),
            'invitations' => $workspace->invitations()
                ->whereNull('accepted_at')
                ->latest()
                ->paginate(
                    perPage: $this->perPage($request, 'invitations_per_page'),
                    pageName: 'invitations_page',
                )
                ->withQueryString()
                ->through(fn (WorkspaceInvitation $invitation): array => [
                    'code' => $invitation->code,
                    'email' => $invitation->email,
                    'role' => $invitation->role->value,
                    'role_label' => $invitation->role->label(),
                    'created_at' => $invitation->created_at->toISOString(),
                ]),
            'permissions' => $user->toWorkspacePermissions($workspace),
            'availableRoles' => WorkspaceRole::assignable(),
        ]);
    }

    private function perPage(Request $request, string $key): int
    {
        $perPage = $request->integer($key, 25);

        return in_array($perPage, self::PER_PAGE_OPTIONS, true) ? $perPage : 25;
    }

    /**
     * Serialize a workspace member for the settings page.
     *
     * @return array{id: int, uuid: string, name: string, email: string, avatar: string|null, role: string, role_label: string}
     */
    private function memberProps(User $member): array
    {
        /** @var Membership $membership */
        $membership = $member->getRelation('pivot');

        return [
            'id' => $member->id,
            'uuid' => $member->uuid,
            'name' => $member->name,
            'email' => $member->email,
            'avatar' => $member->avatar ?? null,
            'role' => $membership->role->value,
            'role_label' => $membership->role->label(),
        ];
    }

    /**
     * Update the specified workspace member's role.
     */
    public function update(UpdateWorkspaceMemberRequest $request, Workspace $workspace, User $user): RedirectResponse
    {
        Gate::authorize('updateMember', $workspace);

        $newRole = WorkspaceRole::from($request->validated('role'));

        $workspace->memberships()
            ->where('user_id', $user->id)
            ->firstOrFail()
            ->update(['role' => $newRole]);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Member role updated.')]);

        return to_route('workspaces.members.index', ['workspace' => $workspace->slug]);
    }

    /**
     * Generate a new password for the specified workspace member.
     */
    public function generatePassword(Workspace $workspace, User $user): RedirectResponse
    {
        Gate::authorize('updateMember', $workspace);
        $this->ensureMemberPasswordCanBeManaged($workspace, $user);

        $password = $this->newPassword();

        $user->forceFill([
            'password' => $password,
            'remember_token' => Str::random(60),
        ])->save();

        Password::broker(config('fortify.passwords'))->deleteToken($user);

        event(new PasswordReset($user));

        Inertia::flash('memberPassword', [
            'memberId' => $user->id,
            'memberName' => $user->name,
            'password' => $password,
        ]);
        Inertia::flash('toast', ['type' => 'success', 'message' => __('New password generated.')]);

        return to_route('workspaces.members.index', ['workspace' => $workspace->slug]);
    }

    /**
     * Send a password reset link to the specified workspace member.
     */
    public function sendPasswordResetLink(Workspace $workspace, User $user): RedirectResponse
    {
        Gate::authorize('updateMember', $workspace);
        $this->ensureMemberPasswordCanBeManaged($workspace, $user);

        $status = Password::broker(config('fortify.passwords'))->sendResetLink([
            Fortify::email() => $user->email,
        ]);

        Inertia::flash('toast', $status === Password::RESET_LINK_SENT
            ? ['type' => 'success', 'message' => __('Password reset link sent.')]
            : [
                'type' => 'error',
                'message' => $status === Password::RESET_THROTTLED
                    ? __('A password reset link was recently sent. Please wait before sending another.')
                    : __('Unable to send a password reset link. Please try again.'),
            ]);

        return to_route('workspaces.members.index', ['workspace' => $workspace->slug]);
    }

    /**
     * Remove the specified workspace member.
     */
    public function destroy(Workspace $workspace, User $user): RedirectResponse
    {
        Gate::authorize('removeMember', $workspace);

        abort_if($workspace->owner()?->is($user), 403, __('The workspace owner cannot be removed.'));

        $workspace->memberships()
            ->where('user_id', $user->id)
            ->firstOrFail()
            ->delete();

        if ($user->isCurrentWorkspace($workspace)) {
            $user->switchWorkspace($user->personalWorkspace());
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Member removed.')]);

        return to_route('workspaces.members.index', ['workspace' => $workspace->slug]);
    }

    /**
     * Ensure the user is a non-owner member of the selected workspace.
     */
    private function ensureMemberPasswordCanBeManaged(Workspace $workspace, User $user): void
    {
        $membership = $workspace->memberships()
            ->where('user_id', $user->id)
            ->firstOrFail();

        abort_if($membership->role === WorkspaceRole::Owner, 403, __('The workspace owner password cannot be managed.'));
    }

    /**
     * Generate a password that satisfies the production composition requirements.
     */
    private function newPassword(): string
    {
        do {
            $password = Str::password(20);
        } while (! preg_match('/[a-z]/', $password) || ! preg_match('/[A-Z]/', $password));

        return $password;
    }
}
