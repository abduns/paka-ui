<?php

namespace Database\Seeders;

use App\Enums\WorkspaceRole;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminUserSeeder extends Seeder
{
    public const string DEMO_EMAIL = 'admin@example.com';

    public function run(): void
    {
        $user = User::query()->oldest('id')->first();

        if (! $user instanceof User) {
            $password = Str::password(32);
            $user = User::query()->create([
                'name' => 'Demo Administrator',
                'email' => self::DEMO_EMAIL,
                'email_verified_at' => now(),
                'password' => Hash::make($password),
            ]);

            $this->command->warn("Demo administrator created with a one-time password: {$password}");
        }

        $workspace = $user->personalWorkspace() ?? Workspace::query()->create([
            'name' => "{$user->name}'s Workspace",
            'is_personal' => true,
        ]);

        $membership = $workspace->memberships()->firstOrCreate(
            ['user_id' => $user->id],
            ['role' => WorkspaceRole::Admin],
        );

        if ($membership->role !== WorkspaceRole::Admin) {
            $membership->update(['role' => WorkspaceRole::Admin]);
        }

        $user->switchWorkspace($workspace);
    }
}
