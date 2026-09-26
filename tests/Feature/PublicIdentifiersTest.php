<?php

use App\Models\User;
use App\Models\Workspace;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

test('users and workspaces receive stable public UUIDs', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create();

    expect(Str::isUuid($user->uuid))->toBeTrue()
        ->and(Str::isUuid($workspace->uuid))->toBeTrue()
        ->and($user->fresh()->uuid)->toBe($user->uuid)
        ->and($workspace->fresh()->uuid)->toBe($workspace->uuid)
        ->and($user->uuid)->not->toBe($workspace->uuid);
});

test('public UUIDs are exposed in settings props', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($user, ['role' => 'owner']);

    $this->actingAs($user)
        ->get(route('profile.edit'))
        ->assertInertia(fn (Assert $page) => $page
            ->where('auth.user.uuid', $user->uuid)
        );

    $this->actingAs($user)
        ->get(route('workspaces.edit', $workspace))
        ->assertInertia(fn (Assert $page) => $page
            ->where('workspace.uuid', $workspace->uuid)
        );

    $this->actingAs($user)
        ->get(route('workspaces.members.index', $workspace))
        ->assertInertia(fn (Assert $page) => $page
            ->where('workspace.uuid', $workspace->uuid)
            ->where('members.data.0.uuid', $user->uuid)
        );
});

test('workspace lists include public workspace identifiers', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('workspaces.edit', $user->personalWorkspace()))
        ->assertInertia(fn (Assert $page) => $page
            ->where('workspaces.0.uuid', $user->personalWorkspace()->uuid)
        );
});
