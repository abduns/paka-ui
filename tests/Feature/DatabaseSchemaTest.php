<?php

use Illuminate\Support\Facades\Schema;

test('fresh migrations preserve the starter-kit schema', function () {
    expect(Schema::hasColumns('users', [
        'uuid',
        'avatar_path',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'two_factor_confirmed_at',
    ]))->toBeTrue()
        ->and(Schema::hasColumns('workspaces', [
            'uuid',
            'name',
            'slug',
            'logo_path',
            'is_personal',
        ]))->toBeTrue()
        ->and(Schema::hasColumns('workspace_members', ['workspace_id', 'user_id', 'role']))->toBeTrue()
        ->and(Schema::hasColumns('workspace_invitations', ['workspace_id', 'email', 'role', 'code']))->toBeTrue()
        ->and(Schema::hasColumns('passkeys', ['user_id', 'credential_id', 'credential']))->toBeTrue()
        ->and(Schema::hasColumns('installations', ['id', 'started_at', 'completed_at']))->toBeTrue()
        ->and(Schema::hasColumn('model_has_roles', 'workspace_id'))->toBeTrue()
        ->and(Schema::hasColumn('model_has_permissions', 'workspace_id'))->toBeTrue();
});
