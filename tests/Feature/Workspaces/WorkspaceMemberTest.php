<?php

use App\Enums\WorkspaceRole;
use App\Models\User;
use App\Models\Workspace;
use App\Models\WorkspaceInvitation;
use App\Notifications\ResetPassword;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Notifications\SendQueuedNotifications;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Queue;
use Inertia\Testing\AssertableInertia as Assert;

test('the workspace members page can be rendered', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($user, ['role' => WorkspaceRole::Owner->value]);

    $this
        ->actingAs($user)
        ->get(route('workspaces.members.index', $workspace))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('workspaces/members')
            ->where('members.data.0.role', WorkspaceRole::Owner->value)
            ->where('members.data.0.role_label', WorkspaceRole::Owner->label())
            ->where('members.data.0.uuid', $user->uuid),
        );
});

test('workspace members and pending invitations are paginated independently', function () {
    $owner = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);

    User::factory()
        ->count(25)
        ->create()
        ->each(fn (User $member) => $workspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]));

    WorkspaceInvitation::factory()
        ->count(11)
        ->create([
            'workspace_id' => $workspace->id,
            'invited_by' => $owner->id,
            'accepted_at' => null,
        ]);

    $this
        ->actingAs($owner)
        ->get(route('workspaces.members.index', [
            $workspace,
            'page' => 2,
            'members_per_page' => 25,
            'invitations_page' => 2,
            'invitations_per_page' => 10,
        ]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->has('members.data', 1)
            ->where('members.current_page', 2)
            ->where('members.per_page', 25)
            ->where('members.total', 26)
            ->has('invitations.data', 1)
            ->where('invitations.current_page', 2)
            ->where('invitations.per_page', 10)
            ->where('invitations.total', 11),
        );
});

test('users cannot view members of workspaces they do not belong to', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $this
        ->actingAs($user)
        ->get(route('workspaces.members.index', $workspace))
        ->assertForbidden();
});

test('workspace member roles can be updated by owners', function () {
    $owner = User::factory()->create();
    $member = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);
    $workspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    $response = $this
        ->actingAs($owner)
        ->patch(route('workspaces.members.update', [$workspace, $member]), [
            'role' => WorkspaceRole::Admin->value,
        ]);

    $response->assertRedirect(route('workspaces.members.index', $workspace));

    expect($workspace->members()->where('user_id', $member->id)->first()->pivot->role->value)->toEqual(WorkspaceRole::Admin->value);
});

test('workspace member roles cannot be updated by non owners', function () {
    $owner = User::factory()->create();
    $admin = User::factory()->create();
    $member = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);
    $workspace->members()->attach($admin, ['role' => WorkspaceRole::Admin->value]);
    $workspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    $response = $this
        ->actingAs($admin)
        ->patch(route('workspaces.members.update', [$workspace, $member]), [
            'role' => WorkspaceRole::Admin->value,
        ]);

    $response->assertForbidden();
});

test('workspace members can be removed by owners', function () {
    $owner = User::factory()->create();
    $member = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);
    $workspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    $response = $this
        ->actingAs($owner)
        ->delete(route('workspaces.members.destroy', [$workspace, $member]));

    $response->assertRedirect(route('workspaces.members.index', $workspace));

    expect($member->fresh()->belongsToWorkspace($workspace))->toBeFalse();
});

test('workspace members cannot be removed by non owners', function () {
    $owner = User::factory()->create();
    $admin = User::factory()->create();
    $member = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);
    $workspace->members()->attach($admin, ['role' => WorkspaceRole::Admin->value]);
    $workspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    $response = $this
        ->actingAs($admin)
        ->delete(route('workspaces.members.destroy', [$workspace, $member]));

    $response->assertForbidden();
});

test('workspace owner cannot be removed', function () {
    $owner = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);

    $response = $this
        ->actingAs($owner)
        ->delete(route('workspaces.members.destroy', [$workspace, $owner]));

    $response->assertForbidden();

    expect($owner->fresh()->belongsToWorkspace($workspace))->toBeTrue();
});

test('workspace member role cannot be set to owner', function () {
    $owner = User::factory()->create();
    $member = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);
    $workspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    $response = $this
        ->actingAs($owner)
        ->patch(route('workspaces.members.update', [$workspace, $member]), [
            'role' => WorkspaceRole::Owner->value,
        ]);

    $response->assertSessionHasErrors('role');

    expect($workspace->members()->where('user_id', $member->id)->first()->pivot->role->value)->toEqual(WorkspaceRole::Member->value);
});

test('removed member current workspace is set to personal workspace', function () {
    $owner = User::factory()->create();
    $member = User::factory()->create();
    $personalWorkspace = $member->personalWorkspace();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);
    $workspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    $member->update(['current_workspace_id' => $workspace->id]);

    $this
        ->actingAs($owner)
        ->delete(route('workspaces.members.destroy', [$workspace, $member]));

    expect($member->fresh()->current_workspace_id)->toEqual($personalWorkspace->id);
});

test('workspace owners can generate a new password for a member', function () {
    $owner = User::factory()->create();
    $member = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);
    $workspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    $previousPassword = $member->password;
    $previousRememberToken = $member->remember_token;
    $passwordBroker = Password::broker(config('fortify.passwords'));
    $resetToken = $passwordBroker->createToken($member);

    Event::fake([PasswordReset::class]);

    $response = $this
        ->actingAs($owner)
        ->withSession(['auth.password_confirmed_at' => time()])
        ->post(route('workspaces.members.generate-password', [$workspace, $member]));

    $response
        ->assertRedirect(route('workspaces.members.index', $workspace))
        ->assertInertiaFlash('memberPassword.memberId', $member->id)
        ->assertInertiaFlash('memberPassword.memberName', $member->name)
        ->assertInertiaFlash('memberPassword.password')
        ->assertInertiaFlash('toast', ['type' => 'success', 'message' => 'New password generated.']);

    Event::assertDispatched(PasswordReset::class, fn (PasswordReset $event): bool => $event->user->is($member));

    $firstVisit = $this
        ->actingAs($owner)
        ->get(route('workspaces.members.index', $workspace))
        ->assertInertia(fn (Assert $page) => $page
            ->hasFlash('memberPassword.memberId', $member->id)
            ->hasFlash('memberPassword.memberName', $member->name)
            ->hasFlash('memberPassword.password'),
        );

    $password = data_get($firstVisit->viewData('page'), 'flash.memberPassword.password');
    $freshMember = $member->fresh();

    expect($password)
        ->toBeString()
        ->and(Hash::check($password, $freshMember->password))->toBeTrue()
        ->and($freshMember->password)->not->toBe($previousPassword)
        ->and($freshMember->remember_token)->not->toBe($previousRememberToken)
        ->and($passwordBroker->tokenExists($freshMember, $resetToken))->toBeFalse();

    $this
        ->get(route('workspaces.members.index', $workspace))
        ->assertInertia(fn (Assert $page) => $page->missingFlash('memberPassword'));
});

test('workspace owners can send a password reset link to a member', function () {
    Queue::fake();

    $owner = User::factory()->create();
    $member = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);
    $workspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    $this
        ->actingAs($owner)
        ->withSession(['auth.password_confirmed_at' => time()])
        ->post(route('workspaces.members.send-password-reset-link', [$workspace, $member]))
        ->assertRedirect(route('workspaces.members.index', $workspace))
        ->assertInertiaFlash('toast', ['type' => 'success', 'message' => 'Password reset link sent.'])
        ->assertInertiaFlashMissing('memberPassword');

    Queue::assertPushed(SendQueuedNotifications::class, function (SendQueuedNotifications $job) use ($member): bool {
        return $job->notification instanceof ResetPassword
            && $job->notifiables->contains(fn (User $notifiable): bool => $notifiable->is($member));
    });
});

test('member password actions require a recent password confirmation', function (string $routeName) {
    $owner = User::factory()->create();
    $member = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);
    $workspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    $this
        ->actingAs($owner)
        ->post(route($routeName, [$workspace, $member]))
        ->assertRedirect(route('password.confirm'));
})->with([
    'generate password' => 'workspaces.members.generate-password',
    'send reset link' => 'workspaces.members.send-password-reset-link',
]);

test('non owners cannot manage member passwords', function (string $routeName) {
    $owner = User::factory()->create();
    $admin = User::factory()->create();
    $member = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);
    $workspace->members()->attach($admin, ['role' => WorkspaceRole::Admin->value]);
    $workspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    $this
        ->actingAs($admin)
        ->withSession(['auth.password_confirmed_at' => time()])
        ->post(route($routeName, [$workspace, $member]))
        ->assertForbidden();
})->with([
    'generate password' => 'workspaces.members.generate-password',
    'send reset link' => 'workspaces.members.send-password-reset-link',
]);

test('member password actions require the target to belong to the selected workspace', function (string $routeName) {
    $owner = User::factory()->create();
    $nonMember = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);

    $this
        ->actingAs($owner)
        ->withSession(['auth.password_confirmed_at' => time()])
        ->post(route($routeName, [$workspace, $nonMember]))
        ->assertNotFound();
})->with([
    'generate password' => 'workspaces.members.generate-password',
    'send reset link' => 'workspaces.members.send-password-reset-link',
]);

test('workspace owners cannot manage their own passwords from member actions', function (string $routeName) {
    $owner = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);

    $this
        ->actingAs($owner)
        ->withSession(['auth.password_confirmed_at' => time()])
        ->post(route($routeName, [$workspace, $owner]))
        ->assertForbidden();
})->with([
    'generate password' => 'workspaces.members.generate-password',
    'send reset link' => 'workspaces.members.send-password-reset-link',
]);
