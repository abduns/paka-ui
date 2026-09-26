<?php

use App\Enums\WorkspacePermission;
use App\Enums\WorkspaceRole;
use App\Models\User;
use App\Models\Workspace;

function joinWorkspaceAt(Workspace $workspace, User $user, WorkspaceRole $role, int $daysAgo): void
{
    $workspace->members()->attach($user, ['role' => $role->value]);

    $workspace->memberships()
        ->where('user_id', $user->id)
        ->update(['created_at' => now()->subDays($daysAgo)]);
}

test('a departing owner hands a shared workspace to its longest standing admin', function () {
    $owner = User::factory()->create();
    $newcomer = User::factory()->create();
    $veteran = User::factory()->create();
    $workspace = Workspace::factory()->create();

    joinWorkspaceAt($workspace, $owner, WorkspaceRole::Owner, 30);
    joinWorkspaceAt($workspace, $newcomer, WorkspaceRole::Admin, 2);
    joinWorkspaceAt($workspace, $veteran, WorkspaceRole::Admin, 20);

    $this->actingAs($owner)
        ->delete(route('profile.destroy'), ['password' => 'password'])
        ->assertRedirect('/');

    $workspace->refresh();

    expect($workspace->trashed())->toBeFalse()
        ->and($workspace->owner()?->is($veteran))->toBeTrue()
        ->and($veteran->fresh()->hasWorkspacePermission($workspace, WorkspacePermission::DeleteWorkspace))->toBeTrue()
        ->and($newcomer->fresh()->workspaceRole($workspace))->toBe(WorkspaceRole::Admin);
});

test('a shared workspace with no admin falls back to its longest standing member', function () {
    $owner = User::factory()->create();
    $member = User::factory()->create();
    $workspace = Workspace::factory()->create();

    joinWorkspaceAt($workspace, $owner, WorkspaceRole::Owner, 30);
    joinWorkspaceAt($workspace, $member, WorkspaceRole::Member, 10);

    $this->actingAs($owner)
        ->delete(route('profile.destroy'), ['password' => 'password'])
        ->assertRedirect('/');

    expect($member->fresh()->workspaceRole($workspace->refresh()))->toBe(WorkspaceRole::Owner)
        ->and($member->fresh()->hasWorkspacePermission($workspace, WorkspacePermission::RemoveMember))->toBeTrue();
});

test('a workspace nobody is left to inherit goes with the account', function () {
    $owner = User::factory()->create();
    $personalWorkspace = $owner->currentWorkspace;
    $soloWorkspace = Workspace::factory()->create();

    joinWorkspaceAt($soloWorkspace, $owner, WorkspaceRole::Owner, 5);
    $this->actingAs($owner)
        ->delete(route('profile.destroy'), ['password' => 'password'])
        ->assertRedirect('/');

    expect(Workspace::withTrashed()->findOrFail($soloWorkspace->id)->trashed())->toBeTrue()
        ->and(Workspace::withTrashed()->findOrFail($personalWorkspace->id)->trashed())->toBeTrue();
});

test('deleting an account leaves no workspace role assignments behind', function () {
    $owner = User::factory()->create();
    $workspace = Workspace::factory()->create();
    $ownerId = $owner->id;

    joinWorkspaceAt($workspace, $owner, WorkspaceRole::Owner, 5);
    joinWorkspaceAt($workspace, User::factory()->create(), WorkspaceRole::Admin, 1);

    $this->actingAs($owner)
        ->delete(route('profile.destroy'), ['password' => 'password'])
        ->assertRedirect('/');

    $this->assertDatabaseMissing('users', ['id' => $ownerId]);
    $this->assertDatabaseMissing('workspace_members', ['user_id' => $ownerId]);
    $this->assertDatabaseMissing(config('permission.table_names.model_has_roles'), [
        'model_id' => $ownerId,
        'model_type' => User::class,
    ]);
});
