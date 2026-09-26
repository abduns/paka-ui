<?php

namespace Database\Seeders;

use App\Enums\WorkspacePermission;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

/**
 * The baseline every deployment needs.
 */
class InstallSeeder extends Seeder
{
    public function run(): void
    {
        $registrar = app(PermissionRegistrar::class);
        $registrar->forgetCachedPermissions();

        foreach (WorkspacePermission::cases() as $permission) {
            Permission::findOrCreate($permission->value, 'web');
        }

        $registrar->forgetCachedPermissions();
    }
}
