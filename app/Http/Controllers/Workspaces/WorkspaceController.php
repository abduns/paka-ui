<?php

namespace App\Http\Controllers\Workspaces;

use App\Actions\Workspaces\CreateWorkspace;
use App\Http\Controllers\Controller;
use App\Http\Requests\Workspaces\DeleteWorkspaceRequest;
use App\Http\Requests\Workspaces\SaveWorkspaceRequest;
use App\Models\Membership;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use RuntimeException;

class WorkspaceController extends Controller
{
    /**
     * Redirect to the current workspace's settings page.
     */
    public function index(Request $request): RedirectResponse
    {
        return $this->redirectToWorkspaceSettings($request->user()->currentWorkspace);
    }

    /**
     * Show the workspace creation page.
     */
    public function create(): Response
    {
        return Inertia::render('workspaces/create');
    }

    /**
     * Store a newly created workspace.
     */
    public function store(SaveWorkspaceRequest $request, CreateWorkspace $createWorkspace): RedirectResponse
    {
        $workspace = $createWorkspace->handle(
            $request->user(),
            $request->validated('name'),
            $request->file('logo'),
        );

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Workspace created.')]);

        return to_route('workspaces.edit', ['workspace' => $workspace->slug]);
    }

    /**
     * Show the workspace edit page.
     */
    public function edit(Request $request, Workspace $workspace): Response
    {
        $user = $request->user();

        return Inertia::render('workspaces/edit', [
            'workspace' => [
                'id' => $workspace->id,
                'uuid' => $workspace->uuid,
                'name' => $workspace->name,
                'slug' => $workspace->slug,
                'logo' => $workspace->logo,
                'isPersonal' => $workspace->is_personal,
            ],
            'permissions' => $user->toWorkspacePermissions($workspace),
        ]);
    }

    /**
     * Update the specified workspace.
     */
    public function update(SaveWorkspaceRequest $request, Workspace $workspace): RedirectResponse
    {
        Gate::authorize('update', $workspace);

        $oldLogoPath = null;

        $workspace = DB::transaction(function () use ($request, $workspace, &$oldLogoPath) {
            $workspace = Workspace::whereKey($workspace->id)->lockForUpdate()->firstOrFail();

            $workspace->name = $request->validated('name');

            if ($request->hasFile('logo')) {
                $storedPath = $request->file('logo')->store('workspace-logos', 'public');

                if ($storedPath === false) {
                    throw new RuntimeException('Unable to store the uploaded workspace logo.');
                }

                $oldLogoPath = $workspace->getRawOriginal('logo_path');
                $workspace->logo_path = $storedPath;
            }

            $workspace->save();

            return $workspace;
        });

        if ($oldLogoPath) {
            Storage::disk('public')->delete($oldLogoPath);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Workspace updated.')]);

        return to_route('workspaces.edit', ['workspace' => $workspace->slug]);
    }

    /**
     * Switch the user's current workspace.
     */
    public function switch(Request $request, Workspace $workspace): RedirectResponse
    {
        abort_unless($request->user()->belongsToWorkspace($workspace), 403);

        $request->user()->switchWorkspace($workspace);

        return back();
    }

    /**
     * Leave the specified workspace.
     */
    public function leave(Request $request, Workspace $workspace): RedirectResponse
    {
        Gate::authorize('leave', $workspace);

        $user = $request->user();

        $fallbackWorkspace = $user->isCurrentWorkspace($workspace)
            ? $user->fallbackWorkspace($workspace)
            : null;

        $workspace->memberships()
            ->where('user_id', $user->id)
            ->firstOrFail()
            ->delete();

        if ($fallbackWorkspace) {
            $user->switchWorkspace($fallbackWorkspace);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => __('You left the workspace ":name"', ['name' => $workspace->name])]);

        return $this->redirectToWorkspaceSettings($fallbackWorkspace ?? $user->fresh()->currentWorkspace);
    }

    /**
     * Delete the specified workspace.
     */
    public function destroy(DeleteWorkspaceRequest $request, Workspace $workspace): RedirectResponse
    {
        $user = $request->user();
        $fallbackWorkspace = $user->isCurrentWorkspace($workspace)
            ? $user->fallbackWorkspace($workspace)
            : null;

        DB::transaction(function () use ($user, $workspace) {
            User::where('current_workspace_id', $workspace->id)
                ->where('id', '!=', $user->id)
                ->each(fn (User $affectedUser) => $affectedUser->switchWorkspace($affectedUser->personalWorkspace()));

            $workspace->invitations()->delete();
            $workspace->memberships()
                ->get()
                ->each(fn (Membership $membership) => $membership->delete());
            $workspace->delete();
        });

        if ($fallbackWorkspace) {
            $user->switchWorkspace($fallbackWorkspace);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Workspace deleted.')]);

        return $this->redirectToWorkspaceSettings($fallbackWorkspace ?? $user->fresh()->currentWorkspace);
    }

    private function redirectToWorkspaceSettings(?Workspace $workspace): RedirectResponse
    {
        abort_if($workspace === null, 404);

        return to_route('workspaces.edit', ['workspace' => $workspace->slug]);
    }
}
