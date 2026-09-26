<?php

use App\Enums\WorkspaceRole;
use App\Models\User;
use App\Models\Workspace;
use App\Services\DiceBearAvatarGenerator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Inertia\Testing\AssertableInertia as Assert;

test('the workspaces index page redirects to the current workspace editor', function () {
    $user = User::factory()->create();

    $this
        ->actingAs($user)
        ->get(route('workspaces.index'))
        ->assertRedirect(route('workspaces.edit', $user->currentWorkspace));

    $this
        ->actingAs($user)
        ->followingRedirects()
        ->get(route('workspaces.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('workspaces/edit')
            ->where('workspace.slug', $user->currentWorkspace->slug),
        );
});

test('the workspace creation page can be rendered', function () {
    $user = User::factory()->create();

    expect(parse_url(route('workspaces.create'), PHP_URL_PATH))
        ->toBe('/settings/workspace/create');

    $this
        ->actingAs($user)
        ->get(route('workspaces.create'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('workspaces/create'),
        );
});

test('workspace settings links use the singular workspace path', function () {
    $routeNames = [
        'workspaces.index',
        'workspaces.create',
        'workspaces.store',
        'workspaces.edit',
        'workspaces.update',
        'workspaces.destroy',
        'workspaces.switch',
        'workspaces.leave',
        'workspaces.members.index',
        'workspaces.members.update',
        'workspaces.members.destroy',
        'workspaces.members.generate-password',
        'workspaces.members.send-password-reset-link',
        'workspaces.invitations.store',
        'workspaces.invitations.destroy',
    ];

    foreach ($routeNames as $routeName) {
        $uri = app('router')->getRoutes()->getByName($routeName)?->uri();

        expect($uri)
            ->not->toBeNull()
            ->toStartWith('settings/workspace')
            ->not->toContain('settings/workspaces');
    }
});

test('workspaces can be created', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post(route('workspaces.store'), [
            'name' => 'Test Workspace',
        ]);

    $workspace = Workspace::where('name', 'Test Workspace')->firstOrFail();

    $response
        ->assertRedirect(route('workspaces.edit', $workspace))
        ->assertInertiaFlash('toast', ['type' => 'success', 'message' => 'Workspace created.']);

    $this->assertDatabaseHas('workspaces', [
        'name' => 'Test Workspace',
        'is_personal' => false,
    ]);
});

test('a workspace can be created with a logo', function () {
    Storage::fake('public');

    $user = User::factory()->create();

    $this
        ->actingAs($user)
        ->post(route('workspaces.store'), [
            'name' => 'Acme Workspace',
            'logo' => UploadedFile::fake()->image('acme.png'),
        ])
        ->assertSessionHasNoErrors();

    $workspace = Workspace::where('name', 'Acme Workspace')->firstOrFail();

    expect($workspace->logo_path)->not->toBeNull();
    Storage::disk('public')->assertExists($workspace->logo_path);
});

test('workspace slug uses next available suffix', function () {
    $user = User::factory()->create();

    Workspace::factory()->create(['name' => 'Acme', 'slug' => 'acme']);
    Workspace::factory()->create(['name' => 'Acme One', 'slug' => 'acme-1']);
    Workspace::factory()->create(['name' => 'Acme Ten', 'slug' => 'acme-10']);

    $this
        ->actingAs($user)
        ->post(route('workspaces.store'), [
            'name' => 'Acme',
        ]);

    $this->assertDatabaseHas('workspaces', [
        'name' => 'Acme',
        'slug' => 'acme-11',
    ]);
});

test('the workspace edit page can be rendered', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($user, ['role' => WorkspaceRole::Owner->value]);

    $response = $this
        ->actingAs($user)
        ->get(route('workspaces.edit', $workspace));

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('workspaces/edit')
            ->missing('members')
            ->missing('invitations')
            ->where('permissions.canLeaveWorkspace', false),
        );
});

test('workspaces can be updated by owners', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['name' => 'Original Name']);

    $workspace->members()->attach($user, ['role' => WorkspaceRole::Owner->value]);

    $response = $this
        ->actingAs($user)
        ->patch(route('workspaces.update', $workspace), [
            'name' => 'Updated Name',
        ]);

    $response->assertRedirect(route('workspaces.edit', $workspace->fresh()));

    $this->assertDatabaseHas('workspaces', [
        'id' => $workspace->id,
        'name' => 'Updated Name',
    ]);
});

test('workspace logo can be uploaded', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $workspace = Workspace::factory()->create();
    $workspace->members()->attach($user, ['role' => WorkspaceRole::Owner->value]);

    $logo = UploadedFile::fake()->image('logo.png');

    $response = $this
        ->actingAs($user)
        ->patch(route('workspaces.update', $workspace), [
            'name' => $workspace->name,
            'logo' => $logo,
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('workspaces.edit', $workspace->fresh()));

    $workspace->refresh();

    expect($workspace->logo_path)->not->toBeNull()
        ->and($workspace->logo)->toBe(Storage::disk('public')->url($workspace->logo_path));
    Storage::disk('public')->assertExists($workspace->logo_path);
});

test('a local loops logo is generated when no workspace logo has been uploaded', function () {
    $user = User::factory()->create();
    $workspace = $user->currentWorkspace;
    $expectedLogo = URL::signedRoute('avatars.show', [
        'style' => DiceBearAvatarGenerator::LOOPS,
        'seed' => $workspace->uuid,
    ], absolute: false);

    expect($workspace->logo)
        ->toBe($expectedLogo)
        ->not->toContain('api.dicebear.com')
        ->and($workspace->fresh()->logo)->toBe($expectedLogo)
        ->and($workspace->toArray()['logo'])->toBe($expectedLogo);

    $this->actingAs($user)
        ->get(route('workspaces.edit', $workspace))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('workspace.logo', $expectedLogo)
            ->where('currentWorkspace.logo', $expectedLogo));
});

test('replacing a workspace logo removes the previous file', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $workspace = Workspace::factory()->create();
    $workspace->members()->attach($user, ['role' => WorkspaceRole::Owner->value]);

    $this
        ->actingAs($user)
        ->patch(route('workspaces.update', $workspace), [
            'name' => $workspace->name,
            'logo' => UploadedFile::fake()->image('logo-one.png'),
        ]);

    $originalLogoPath = $workspace->refresh()->logo_path;

    $this
        ->actingAs($user)
        ->patch(route('workspaces.update', $workspace), [
            'name' => $workspace->name,
            'logo' => UploadedFile::fake()->image('logo-two.png'),
        ]);

    $workspace->refresh();

    expect($workspace->logo_path)->not->toBe($originalLogoPath);
    Storage::disk('public')->assertMissing($originalLogoPath);
    Storage::disk('public')->assertExists($workspace->logo_path);
});

test('members can view leave workspace on the editor', function () {
    $owner = User::factory()->create();
    $member = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);
    $workspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    $this
        ->actingAs($member)
        ->get(route('workspaces.edit', $workspace))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('workspaces/edit')
            ->where('permissions.canLeaveWorkspace', true)
            ->where('permissions.canUpdateWorkspace', false),
        );
});

test('workspaces cannot be updated by members', function () {
    $owner = User::factory()->create();
    $member = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);
    $workspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    $response = $this
        ->actingAs($member)
        ->patch(route('workspaces.update', $workspace), [
            'name' => 'Updated Name',
        ]);

    $response->assertForbidden();
});

test('workspaces can be deleted by owners', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($user, ['role' => WorkspaceRole::Owner->value]);
    $response = $this
        ->actingAs($user)
        ->delete(route('workspaces.destroy', $workspace), [
            'name' => $workspace->name,
        ]);

    $response->assertRedirect();

    $this->assertSoftDeleted('workspaces', [
        'id' => $workspace->id,
    ]);
});

test('workspace deletion requires name confirmation', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($user, ['role' => WorkspaceRole::Owner->value]);

    $response = $this
        ->actingAs($user)
        ->delete(route('workspaces.destroy', $workspace), [
            'name' => 'Wrong Name',
        ]);

    $response->assertSessionHasErrors('name');

    $this->assertDatabaseHas('workspaces', [
        'id' => $workspace->id,
        'deleted_at' => null,
    ]);
});

test('deleting current workspace switches to alphabetically first remaining workspace', function () {
    $user = User::factory()->create(['name' => 'Mike']);

    $zuluWorkspace = Workspace::factory()->create(['name' => 'Zulu Workspace']);
    $zuluWorkspace->members()->attach($user, ['role' => WorkspaceRole::Owner->value]);

    $alphaWorkspace = Workspace::factory()->create(['name' => 'Alpha Workspace']);
    $alphaWorkspace->members()->attach($user, ['role' => WorkspaceRole::Owner->value]);

    $betaWorkspace = Workspace::factory()->create(['name' => 'Beta Workspace']);
    $betaWorkspace->members()->attach($user, ['role' => WorkspaceRole::Owner->value]);

    $user->update(['current_workspace_id' => $zuluWorkspace->id]);

    $response = $this
        ->actingAs($user)
        ->delete(route('workspaces.destroy', $zuluWorkspace), [
            'name' => $zuluWorkspace->name,
        ]);

    $response->assertRedirect(route('workspaces.edit', $alphaWorkspace));

    $this->assertSoftDeleted('workspaces', [
        'id' => $zuluWorkspace->id,
    ]);

    expect($user->fresh()->current_workspace_id)->toEqual($alphaWorkspace->id);
});

test('deleting current workspace falls back to personal workspace when alphabetically first', function () {
    $user = User::factory()->create();
    $personalWorkspace = $user->personalWorkspace();
    $workspace = Workspace::factory()->create(['name' => 'Zulu Workspace']);
    $workspace->members()->attach($user, ['role' => WorkspaceRole::Owner->value]);

    $user->update(['current_workspace_id' => $workspace->id]);

    $response = $this
        ->actingAs($user)
        ->delete(route('workspaces.destroy', $workspace), [
            'name' => $workspace->name,
        ]);

    $response->assertRedirect(route('workspaces.edit', $personalWorkspace));

    $this->assertSoftDeleted('workspaces', [
        'id' => $workspace->id,
    ]);

    expect($user->fresh()->current_workspace_id)->toEqual($personalWorkspace->id);
});

test('deleting non current workspace leaves current workspace unchanged', function () {
    $user = User::factory()->create();
    $personalWorkspace = $user->personalWorkspace();
    $workspace = Workspace::factory()->create();
    $workspace->members()->attach($user, ['role' => WorkspaceRole::Owner->value]);

    $user->update(['current_workspace_id' => $personalWorkspace->id]);

    $response = $this
        ->actingAs($user)
        ->delete(route('workspaces.destroy', $workspace), [
            'name' => $workspace->name,
        ]);

    $response->assertRedirect(route('workspaces.edit', $personalWorkspace));

    $this->assertSoftDeleted('workspaces', [
        'id' => $workspace->id,
    ]);

    expect($user->fresh()->current_workspace_id)->toEqual($personalWorkspace->id);
});

test('members can leave non personal workspaces', function () {
    $owner = User::factory()->create();
    $member = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);
    $workspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    $response = $this
        ->actingAs($member)
        ->delete(route('workspaces.leave', $workspace));

    $response->assertRedirect(route('workspaces.edit', $member->personalWorkspace()));
    $response->assertInertiaFlash('toast', ['type' => 'success', 'message' => "You left the workspace \"{$workspace->name}\""]);

    expect($member->fresh()->belongsToWorkspace($workspace))->toBeFalse();
});

test('leaving current workspace switches to alphabetically first remaining workspace', function () {
    $owner = User::factory()->create();
    $member = User::factory()->create(['name' => 'Mike']);

    $zuluWorkspace = Workspace::factory()->create(['name' => 'Zulu Workspace']);
    $zuluWorkspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);
    $zuluWorkspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    $alphaWorkspace = Workspace::factory()->create(['name' => 'Alpha Workspace']);
    $alphaWorkspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    $betaWorkspace = Workspace::factory()->create(['name' => 'Beta Workspace']);
    $betaWorkspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    $member->update(['current_workspace_id' => $zuluWorkspace->id]);

    $response = $this
        ->actingAs($member)
        ->delete(route('workspaces.leave', $zuluWorkspace));

    $response->assertRedirect(route('workspaces.edit', $alphaWorkspace));

    expect($member->fresh()->belongsToWorkspace($zuluWorkspace))->toBeFalse();
    expect($member->fresh()->current_workspace_id)->toEqual($alphaWorkspace->id);
});

test('personal workspaces cannot be left', function () {
    $user = User::factory()->create();
    $personalWorkspace = $user->personalWorkspace();

    $response = $this
        ->actingAs($user)
        ->delete(route('workspaces.leave', $personalWorkspace));

    $response->assertForbidden();

    expect($user->fresh()->belongsToWorkspace($personalWorkspace))->toBeTrue();
});

test('workspace owners cannot leave their workspace', function () {
    $owner = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);

    $response = $this
        ->actingAs($owner)
        ->delete(route('workspaces.leave', $workspace));

    $response->assertForbidden();

    expect($owner->fresh()->belongsToWorkspace($workspace))->toBeTrue();
});

test('users cannot leave workspaces they dont belong to', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $response = $this
        ->actingAs($user)
        ->delete(route('workspaces.leave', $workspace));

    $response->assertForbidden();
});

test('deleting workspace switches other affected users to their personal workspace', function () {
    $owner = User::factory()->create();
    $member = User::factory()->create();

    $workspace = Workspace::factory()->create();
    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);
    $workspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    $owner->update(['current_workspace_id' => $workspace->id]);
    $member->update(['current_workspace_id' => $workspace->id]);

    $response = $this
        ->actingAs($owner)
        ->delete(route('workspaces.destroy', $workspace), [
            'name' => $workspace->name,
        ]);

    $response->assertRedirect();

    expect($member->fresh()->current_workspace_id)->toEqual($member->personalWorkspace()->id);
});

test('personal workspaces cannot be deleted', function () {
    $user = User::factory()->create();

    $personalWorkspace = $user->personalWorkspace();

    $response = $this
        ->actingAs($user)
        ->delete(route('workspaces.destroy', $personalWorkspace), [
            'name' => $personalWorkspace->name,
        ]);

    $response->assertForbidden();

    $this->assertDatabaseHas('workspaces', [
        'id' => $personalWorkspace->id,
        'deleted_at' => null,
    ]);
});

test('workspaces cannot be deleted by non owners', function () {
    $owner = User::factory()->create();
    $member = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);
    $workspace->members()->attach($member, ['role' => WorkspaceRole::Member->value]);

    $response = $this
        ->actingAs($member)
        ->delete(route('workspaces.destroy', $workspace), [
            'name' => $workspace->name,
        ]);

    $response->assertForbidden();
});

test('users can switch workspaces', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($user, ['role' => WorkspaceRole::Member->value]);

    $response = $this
        ->actingAs($user)
        ->post(route('workspaces.switch', $workspace));

    $response->assertRedirect();

    expect($user->fresh()->current_workspace_id)->toEqual($workspace->id);
});

test('users cannot switch to workspace they dont belong to', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post(route('workspaces.switch', $workspace));

    $response->assertForbidden();
});

test('guests cannot access workspaces', function () {
    $response = $this->get(route('workspaces.index'));

    $response->assertRedirect(route('login'));
});
