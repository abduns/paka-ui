<?php

test('workspace switching lives in the user dropdown, not a workspace list page', function () {
    $root = dirname(__DIR__, 2);
    $userMenu = file_get_contents($root.'/resources/js/components/user-menu-content.tsx');
    $teamSwitcher = file_get_contents($root.'/resources/js/components/workspace-switcher.tsx');
    $appHeader = file_get_contents($root.'/resources/js/components/app-header.tsx');
    $settingsLayout = file_get_contents($root.'/resources/js/layouts/settings/layout.tsx');
    $teamEdit = file_get_contents($root.'/resources/js/pages/workspaces/edit.tsx');

    expect($userMenu)->toBeString()
        ->toContain('<WorkspaceSwitcher />');
    expect($teamSwitcher)->toBeString()
        ->toContain('DropdownMenuSub')
        ->toContain('<DropdownMenuLabel>Workspaces</DropdownMenuLabel>')
        ->toContain('Switch workspace')
        ->toContain('data-test="workspace-switcher-trigger"')
        ->toContain('data-test="workspace-switcher-item"')
        ->toContain('data-test="workspace-switcher-new-workspace"')
        ->toContain('<WorkspaceLogo workspace={currentWorkspace} />')
        ->toContain('<WorkspaceLogo workspace={workspace} />')
        ->toContain('src={workspace.logo}')
        ->toContain('render={<Link href={create()} prefetch />}')
        ->not->toContain('inHeader');
    expect($appHeader)->toBeString()
        ->toContain('<UserMenuContent')
        ->not->toContain('<WorkspaceSwitcher');
    expect($settingsLayout)->toBeString()
        ->toContain('editWorkspace(currentWorkspace.slug)')
        ->toContain('workspaceMembers(currentWorkspace.slug)');
    expect($teamEdit)->toBeString()
        ->toContain('data-test="leave-workspace-button"')
        ->toContain('data-test="manage-members-button"')
        ->toContain('placeholder="Acme"')
        ->not->toContain('data-test="workspace-row"')
        ->not->toContain('data-test="member-row"');
    expect(file_get_contents($root.'/resources/js/pages/workspaces/members.tsx'))
        ->toBeString()
        ->toContain('data-test="member-row"')
        ->toContain('data-test="invite-member-button"');
    expect(file_exists($root.'/resources/js/pages/workspaces/index.tsx'))->toBeFalse();
});

test('creating a workspace opens a dedicated page with an inset illustration', function () {
    $root = dirname(__DIR__, 2);
    $teamSwitcher = file_get_contents($root.'/resources/js/components/workspace-switcher.tsx');
    $navUser = file_get_contents($root.'/resources/js/components/nav-user.tsx');
    $appHeader = file_get_contents($root.'/resources/js/components/app-header.tsx');
    $app = file_get_contents($root.'/resources/js/app.tsx');
    $createPage = file_get_contents($root.'/resources/js/pages/workspaces/create.tsx');

    expect($teamSwitcher)->toBeString()
        ->toContain('href={create()}')
        ->not->toContain('useCreateWorkspace')
        ->not->toContain('onClick={openCreateWorkspace}');
    expect($navUser)->toBeString()
        ->not->toContain('<CreateWorkspaceModal>');
    expect($appHeader)->toBeString()
        ->not->toContain('<CreateWorkspaceModal>');
    expect($app)->toBeString()
        ->toContain("case name === 'workspaces/create':")
        ->toContain('return null;');
    expect($createPage)->toBeString()
        ->toContain('Create workspace')
        ->toContain('data-test="create-workspace-name"')
        ->toContain('data-test="create-workspace-submit"')
        ->toContain('encType="multipart/form-data"')
        ->toContain('className="hidden p-[6px] lg:flex"')
        ->toContain('src="/assets/img/create-workspace-illustration.webp"')
        ->toContain('className="relative w-full overflow-hidden rounded-2xl bg-muted"')
        ->toContain('max-w-6xl')
        ->toContain('lg:min-h-[42rem]')
        ->not->toContain('<WorkspacePreview')
        ->not->toContain('rounded-[2rem]')
        ->not->toContain('border-border/70');
    expect(file_exists($root.'/public/assets/img/create-workspace-illustration.webp'))->toBeTrue();
    expect(file_exists($root.'/resources/js/components/create-workspace-modal.tsx'))->toBeFalse();
});
