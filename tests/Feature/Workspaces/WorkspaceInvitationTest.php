<?php

use App\Enums\WorkspaceRole;
use App\Models\User;
use App\Models\Workspace;
use App\Models\WorkspaceInvitation;
use App\Notifications\Workspaces\WorkspaceInvitation as WorkspaceInvitationNotification;
use Illuminate\Support\Facades\Notification;

test('workspace invitations can be created', function () {
    Notification::fake();

    $owner = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);

    $response = $this
        ->actingAs($owner)
        ->post(route('workspaces.invitations.store', $workspace), [
            'email' => 'invited@example.com',
            'role' => WorkspaceRole::Member->value,
        ]);

    $response->assertRedirect(route('workspaces.members.index', $workspace));

    $this->assertDatabaseHas('workspace_invitations', [
        'workspace_id' => $workspace->id,
        'email' => 'invited@example.com',
        'role' => WorkspaceRole::Member->value,
    ]);
});

test('invitation email for existing users uses login route', function () {
    $owner = User::factory()->create();
    $invitedUser = User::factory()->create(['email' => 'invited@example.com']);
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);

    $invitation = WorkspaceInvitation::factory()->create([
        'workspace_id' => $workspace->id,
        'email' => $invitedUser->email,
        'invited_by' => $owner->id,
    ]);

    $mail = (new WorkspaceInvitationNotification($invitation))->toMail($invitedUser);

    expect($mail->actionUrl)->toBe(route('login', ['invitation' => $invitation->code]));
    $this->assertStringContainsString('dashboard', implode(' ', $mail->introLines));
});

test('invitation email for unknown users uses login route', function () {
    $owner = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);

    $invitation = WorkspaceInvitation::factory()->create([
        'workspace_id' => $workspace->id,
        'email' => 'unknown@example.com',
        'invited_by' => $owner->id,
    ]);

    $mail = (new WorkspaceInvitationNotification($invitation))->toMail((object) []);

    expect($mail->actionUrl)->toBe(route('login', ['invitation' => $invitation->code]));
    $this->assertStringContainsString('log in', strtolower(implode(' ', $mail->introLines)));
});

test('workspace invitations can be created by admins', function () {
    Notification::fake();

    $owner = User::factory()->create();
    $admin = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);
    $workspace->members()->attach($admin, ['role' => WorkspaceRole::Admin->value]);

    $response = $this
        ->actingAs($admin)
        ->post(route('workspaces.invitations.store', $workspace), [
            'email' => 'invited@example.com',
            'role' => WorkspaceRole::Member->value,
        ]);

    $response->assertRedirect(route('workspaces.members.index', $workspace));
});

test('existing workspace members cannot be invited', function () {
    Notification::fake();

    $owner = User::factory()->create();
    $member = User::factory()->create(['email' => 'member@example.com']);
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);
    $workspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    $response = $this
        ->actingAs($owner)
        ->post(route('workspaces.invitations.store', $workspace), [
            'email' => 'member@example.com',
            'role' => WorkspaceRole::Member->value,
        ]);

    $response->assertSessionHasErrors('email');
});

test('duplicate invitations cannot be created', function () {
    Notification::fake();

    $owner = User::factory()->create();
    $workspace = Workspace::factory()->create();
    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);

    WorkspaceInvitation::factory()->create([
        'workspace_id' => $workspace->id,
        'email' => 'invited@example.com',
        'invited_by' => $owner->id,
    ]);

    $response = $this
        ->actingAs($owner)
        ->post(route('workspaces.invitations.store', $workspace), [
            'email' => 'invited@example.com',
            'role' => WorkspaceRole::Member->value,
        ]);

    $response->assertSessionHasErrors('email');
});

test('workspace invitations cannot be created by members', function () {
    $owner = User::factory()->create();
    $member = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);
    $workspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    $response = $this
        ->actingAs($member)
        ->post(route('workspaces.invitations.store', $workspace), [
            'email' => 'invited@example.com',
            'role' => WorkspaceRole::Member->value,
        ]);

    $response->assertForbidden();
});

test('workspace invitations can be cancelled by owners', function () {
    $owner = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);

    $invitation = WorkspaceInvitation::factory()->create([
        'workspace_id' => $workspace->id,
        'invited_by' => $owner->id,
    ]);

    $response = $this
        ->actingAs($owner)
        ->delete(route('workspaces.invitations.destroy', [$workspace, $invitation]));

    $response->assertRedirect(route('workspaces.members.index', $workspace));

    $this->assertDatabaseMissing('workspace_invitations', [
        'id' => $invitation->id,
    ]);
});

test('workspace invitations can be accepted', function () {
    $owner = User::factory()->create();
    $invitedUser = User::factory()->create(['email' => 'invited@example.com']);
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);

    $invitation = WorkspaceInvitation::factory()->create([
        'workspace_id' => $workspace->id,
        'email' => 'invited@example.com',
        'role' => WorkspaceRole::Member,
        'invited_by' => $owner->id,
    ]);

    $response = $this
        ->actingAs($invitedUser)
        ->post(route('invitations.accept', $invitation));

    $response->assertRedirect(route('dashboard'));
    $response->assertInertiaFlash('toast', ['type' => 'success', 'message' => 'Invitation accepted.']);

    expect($invitedUser->fresh()->belongsToWorkspace($workspace))->toBeTrue();
    expect($invitation->fresh()->accepted_at)->not->toBeNull();
});

test('workspace invitations can be declined by the invited user', function () {
    $owner = User::factory()->create();
    $invitedUser = User::factory()->create(['email' => 'invited@example.com']);
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);

    $invitation = WorkspaceInvitation::factory()->create([
        'workspace_id' => $workspace->id,
        'email' => 'invited@example.com',
        'invited_by' => $owner->id,
    ]);

    $response = $this
        ->actingAs($invitedUser)
        ->delete(route('invitations.decline', $invitation));

    $response->assertRedirect(route('dashboard'));

    $this->assertDatabaseMissing('workspace_invitations', [
        'id' => $invitation->id,
    ]);
});

test('workspace invitations cannot be declined by uninvited user', function () {
    $owner = User::factory()->create();
    $uninvitedUser = User::factory()->create(['email' => 'uninvited@example.com']);
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);

    $invitation = WorkspaceInvitation::factory()->create([
        'workspace_id' => $workspace->id,
        'email' => 'invited@example.com',
        'invited_by' => $owner->id,
    ]);

    $response = $this
        ->actingAs($uninvitedUser)
        ->delete(route('invitations.decline', $invitation));

    $response->assertSessionHasErrors('invitation');

    $this->assertDatabaseHas('workspace_invitations', [
        'id' => $invitation->id,
    ]);
});

test('accepted workspace invitations cannot be declined', function () {
    $owner = User::factory()->create();
    $invitedUser = User::factory()->create(['email' => 'invited@example.com']);
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);

    $invitation = WorkspaceInvitation::factory()->accepted()->create([
        'workspace_id' => $workspace->id,
        'email' => 'invited@example.com',
        'invited_by' => $owner->id,
    ]);

    $response = $this
        ->actingAs($invitedUser)
        ->delete(route('invitations.decline', $invitation));

    $response->assertSessionHasErrors('invitation');

    $this->assertDatabaseHas('workspace_invitations', [
        'id' => $invitation->id,
    ]);
});

test('workspace invitations cannot be accepted by uninvited user', function () {
    $owner = User::factory()->create();
    $uninvitedUser = User::factory()->create(['email' => 'uninvited@example.com']);
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);

    $invitation = WorkspaceInvitation::factory()->create([
        'workspace_id' => $workspace->id,
        'email' => 'invited@example.com',
        'invited_by' => $owner->id,
    ]);

    $response = $this
        ->actingAs($uninvitedUser)
        ->post(route('invitations.accept', $invitation));

    $response->assertSessionHasErrors('invitation');

    expect($uninvitedUser->fresh()->belongsToWorkspace($workspace))->toBeFalse();
});

test('expired invitations cannot be accepted', function () {
    $owner = User::factory()->create();
    $invitedUser = User::factory()->create(['email' => 'invited@example.com']);
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);

    $invitation = WorkspaceInvitation::factory()->expired()->create([
        'workspace_id' => $workspace->id,
        'email' => 'invited@example.com',
        'invited_by' => $owner->id,
    ]);

    $response = $this
        ->actingAs($invitedUser)
        ->post(route('invitations.accept', $invitation));

    $response->assertSessionHasErrors('invitation');

    expect($invitedUser->fresh()->belongsToWorkspace($workspace))->toBeFalse();
});

test('an admin cannot mint an owner through an invitation', function () {
    Notification::fake();

    $admin = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($admin, ['role' => WorkspaceRole::Admin->value]);

    $this->actingAs($admin)
        ->post(route('workspaces.invitations.store', $workspace), [
            'email' => 'invited@example.com',
            'role' => WorkspaceRole::Owner->value,
        ])
        ->assertSessionHasErrors('role');

    $this->assertDatabaseMissing('workspace_invitations', [
        'workspace_id' => $workspace->id,
        'email' => 'invited@example.com',
    ]);

    Notification::assertNothingSent();
});

test('an owner cannot mint a second owner through an invitation either', function () {
    Notification::fake();

    $owner = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);

    $this->actingAs($owner)
        ->post(route('workspaces.invitations.store', $workspace), [
            'email' => 'invited@example.com',
            'role' => WorkspaceRole::Owner->value,
        ])
        ->assertSessionHasErrors('role');
});

test('the assignable roles can still be invited', function (string $role) {
    Notification::fake();

    $admin = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($admin, ['role' => WorkspaceRole::Admin->value]);

    $this->actingAs($admin)
        ->post(route('workspaces.invitations.store', $workspace), [
            'email' => $role.'@example.com',
            'role' => $role,
        ])
        ->assertRedirect(route('workspaces.members.index', $workspace));

    $this->assertDatabaseHas('workspace_invitations', [
        'workspace_id' => $workspace->id,
        'email' => $role.'@example.com',
        'role' => $role,
    ]);
})->with([WorkspaceRole::Member->value, WorkspaceRole::Admin->value]);
