<?php

use App\Enums\WorkspaceRole;
use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Support\Facades\Storage;

test('the database seeder creates an admin membership and is idempotent', function () {
    Storage::fake('public');

    $this->seed(DatabaseSeeder::class);
    $this->seed(DatabaseSeeder::class);

    $user = User::query()->where('email', AdminUserSeeder::DEMO_EMAIL)->sole();
    $workspace = $user->personalWorkspace();

    $this->assertModelExists($user);

    expect($user->name)->toBe('Demo Administrator')
        ->and($user->email_verified_at)->not->toBeNull()
        ->and($workspace)->not->toBeNull()
        ->and($workspace->slug)->not->toBeEmpty()
        ->and($user->fresh()->current_workspace_id)->toBe($workspace->id)
        ->and($user->workspaceRole($workspace))->toBe(WorkspaceRole::Admin)
        ->and($workspace->memberships()->where('user_id', $user->id)->count())->toBe(1);
});

test('the demo seeder reuses an existing administrator without creating a predictable account', function () {
    $administrator = User::factory()->create();

    $this->seed(AdminUserSeeder::class);

    expect(User::query()->count())->toBe(1)
        ->and(User::query()->where('email', AdminUserSeeder::DEMO_EMAIL)->exists())->toBeFalse()
        ->and($administrator->fresh()->personalWorkspace())->not->toBeNull();
});
