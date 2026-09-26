<?php

use App\Enums\WorkspaceRole;
use App\Models\User;
use App\Models\Workspace;
use Inertia\Testing\AssertableInertia as Assert;

test('a new workspace starts with its workspace step complete', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('dashboard', [
        'current_workspace' => $user->currentWorkspace,
    ]));

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('onboarding.completed', 1)
            ->where('onboarding.total', 3)
            ->where('onboarding.steps', [
                ['key' => 'workspace', 'completed' => true],
                ['key' => 'member', 'completed' => false],
                ['key' => 'profile', 'completed' => false],
            ]));
});

test('the checklist recognizes workspace members and a profile avatar', function () {
    $user = User::factory()->create(['avatar_path' => 'avatars/profile.png']);
    $user->currentWorkspace->members()->attach(
        User::factory()->create(),
        ['role' => WorkspaceRole::Member->value],
    );

    $response = $this->actingAs($user)->get(route('dashboard', [
        'current_workspace' => $user->currentWorkspace,
    ]));

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('onboarding.completed', 3)
            ->where('onboarding.steps.1.completed', true)
            ->where('onboarding.steps.2.completed', true));
});

test('members in another workspace do not complete the current workspace checklist', function () {
    $user = User::factory()->create();
    $otherWorkspace = Workspace::factory()->create();
    $otherWorkspace->members()->attach(User::factory()->create(), ['role' => WorkspaceRole::Member->value]);

    $response = $this->actingAs($user)->get(route('dashboard', [
        'current_workspace' => $user->currentWorkspace,
    ]));

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('onboarding.completed', 1)
            ->where('onboarding.steps.1.completed', false));
});
