<?php

use App\Enums\WorkspacePermission;
use App\Enums\WorkspaceRole;
use App\Models\User;
use App\Models\Workspace;

test('permissions are isolated by workspace', function () {
    $user = User::factory()->create();
    $personalWorkspace = $user->personalWorkspace();
    $memberWorkspace = Workspace::factory()->create();

    $memberWorkspace->members()->attach($user, ['role' => WorkspaceRole::Member->value]);

    expect($user->hasWorkspacePermission($personalWorkspace, WorkspacePermission::UpdateWorkspace))->toBeTrue()
        ->and($user->hasWorkspacePermission($memberWorkspace, WorkspacePermission::UpdateWorkspace))->toBeFalse();

    $this->assertDatabaseHas('roles', [
        'workspace_id' => $personalWorkspace->id,
        'name' => WorkspaceRole::Owner->value,
        'guard_name' => 'web',
    ]);

    $this->assertDatabaseHas('model_has_roles', [
        'workspace_id' => $memberWorkspace->id,
        'model_id' => $user->id,
        'model_type' => User::class,
    ]);
});

test('changing a membership role changes its workspace permissions', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($user, ['role' => WorkspaceRole::Member->value]);

    expect($user->hasWorkspacePermission($workspace, WorkspacePermission::UpdateWorkspace))->toBeFalse();

    $workspace->memberships()
        ->where('user_id', $user->id)
        ->firstOrFail()
        ->update(['role' => WorkspaceRole::Admin]);

    expect($user->hasWorkspacePermission($workspace, WorkspacePermission::UpdateWorkspace))->toBeTrue()
        ->and($user->hasWorkspacePermission($workspace, WorkspacePermission::DeleteWorkspace))->toBeFalse();
});

test('invitation management is granted to owners and admins but not members', function () {
    $owner = User::factory()->create();
    $admin = User::factory()->create();
    $member = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);
    $workspace->members()->attach($admin, ['role' => WorkspaceRole::Admin->value]);
    $workspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    expect($owner->hasWorkspacePermission($workspace, WorkspacePermission::CreateInvitation))->toBeTrue()
        ->and($admin->hasWorkspacePermission($workspace, WorkspacePermission::CreateInvitation))->toBeTrue()
        ->and($member->hasWorkspacePermission($workspace, WorkspacePermission::CreateInvitation))->toBeFalse();
});

test('membership roles provision the current permission set', function () {
    $workspace = Workspace::factory()->create();
    $owner = User::factory()->create();
    $admin = User::factory()->create();
    $member = User::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);
    $workspace->members()->attach($admin, ['role' => WorkspaceRole::Admin->value]);
    $workspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    foreach ([
        [$owner, WorkspaceRole::Owner],
        [$admin, WorkspaceRole::Admin],
        [$member, WorkspaceRole::Member],
    ] as [$user, $role]) {
        foreach (WorkspacePermission::cases() as $permission) {
            expect($user->hasWorkspacePermission($workspace, $permission))->toBe($role->hasPermission($permission));
        }
    }
});

test('member management is reserved for workspace owners', function () {
    $owner = User::factory()->create();
    $admin = User::factory()->create();
    $member = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);
    $workspace->members()->attach($admin, ['role' => WorkspaceRole::Admin->value]);
    $workspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    expect($owner->hasWorkspacePermission($workspace, WorkspacePermission::UpdateMember))->toBeTrue()
        ->and($admin->hasWorkspacePermission($workspace, WorkspacePermission::UpdateMember))->toBeFalse()
        ->and($member->hasWorkspacePermission($workspace, WorkspacePermission::UpdateMember))->toBeFalse();
});

test('changing a membership role re-synchronizes all permissions', function () {
    $workspace = Workspace::factory()->create();
    $user = User::factory()->create();

    $workspace->members()->attach($user, ['role' => WorkspaceRole::Member->value]);

    expect($user->hasWorkspacePermission($workspace, WorkspacePermission::UpdateWorkspace))->toBeFalse()
        ->and($user->hasWorkspacePermission($workspace, WorkspacePermission::CreateInvitation))->toBeFalse();

    $workspace->memberships()
        ->where('user_id', $user->id)
        ->firstOrFail()
        ->update(['role' => WorkspaceRole::Owner]);

    foreach (WorkspacePermission::cases() as $permission) {
        expect($user->hasWorkspacePermission($workspace, $permission))->toBeTrue();
    }
});
