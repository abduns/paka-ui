<?php

test('sidebar components use Hugeicons instead of Lucide', function () {
    $sidebarComponents = [
        'resources/js/components/app-sidebar.tsx',
        'resources/js/components/nav-main.tsx',
        'resources/js/components/nav-footer.tsx',
        'resources/js/components/nav-user.tsx',
        'resources/js/components/workspace-switcher.tsx',
        'resources/js/components/user-menu-content.tsx',
        'resources/js/components/ui/sidebar.tsx',
    ];

    foreach ($sidebarComponents as $sidebarComponent) {
        $source = file_get_contents(dirname(__DIR__, 2).'/'.$sidebarComponent);

        expect($source)->toBeString()->not->toContain('lucide-react');
    }
});

test('the application uses Hugeicons everywhere instead of Lucide', function () {
    $root = dirname(__DIR__, 2);

    $sources = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($root.'/resources/js', RecursiveDirectoryIterator::SKIP_DOTS)
    );

    $offenders = [];

    foreach ($sources as $source) {
        if (! $source->isFile() || ! in_array($source->getExtension(), ['ts', 'tsx'], true)) {
            continue;
        }

        if (str_contains(file_get_contents($source->getPathname()), 'lucide-react')) {
            $offenders[] = str_replace($root.'/', '', $source->getPathname());
        }
    }

    expect($offenders)->toBe([]);
    expect(json_decode(file_get_contents($root.'/package.json'), true))
        ->not->toHaveKey('dependencies.lucide-react')
        ->not->toHaveKey('devDependencies.lucide-react');
});

test('app logo is an inline SVG that adapts to every theme', function () {
    $root = dirname(__DIR__, 2);
    $logoComponent = file_get_contents($root.'/resources/js/components/app-logo-icon.tsx');

    expect($logoComponent)->toBeString()
        ->toContain('<svg')
        ->toContain('viewBox="0 0 63.72 70.16"')
        ->toContain("mode?: 'theme' | 'light' | 'dark';")
        ->toContain('fill-current')
        ->toContain("'text-[#212121] dark:text-white'")
        ->not->toContain('<img');
});

test('the application favicon uses the provided logo assets', function () {
    $root = dirname(__DIR__, 2);
    $appView = file_get_contents($root.'/resources/views/app.blade.php');

    expect($appView)->toBeString()
        ->toContain('href="/assets/img/logo.svg"')
        ->toContain('href="/assets/img/logo-white.svg"')
        ->not->toContain('href="/favicon.svg"');
});

test('sidebar keeps the sidebar-07 layout primitives', function () {
    $appSidebar = file_get_contents(dirname(__DIR__, 2).'/resources/js/components/app-sidebar.tsx');
    $navMain = file_get_contents(dirname(__DIR__, 2).'/resources/js/components/nav-main.tsx');

    expect($appSidebar)->toBeString()
        ->toContain('<AppLogo showName={false} />')
        ->toContain('<SidebarMenuButton')
        ->toContain('size="lg"')
        ->toContain('SidebarTrigger')
        ->toContain('text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground')
        ->toContain('group/logo')
        ->toContain('group-hover/logo:opacity-100')
        ->toContain('<SidebarRail />')
        ->toContain('<NavUser />')
        ->not->toContain('<WorkspaceSwitcher />')
        ->not->toContain('Repository')
        ->not->toContain('Documentation')
        ->not->toContain('NavFooter');
    expect(file_get_contents(dirname(__DIR__, 2).'/resources/js/components/app-header.tsx'))
        ->toBeString()
        ->not->toContain('Repository')
        ->not->toContain('Documentation');
    $appLogo = file_get_contents(
        dirname(__DIR__, 2).'/resources/js/components/app-logo.tsx',
    );

    expect($appLogo)->toBeString()
        ->toContain('group-data-[collapsible=icon]:hidden')
        ->toContain('<AppLogoIcon mode="theme" className="size-7" />')
        ->toContain('showName?: boolean;')
        ->not->toContain('bg-sidebar-primary')
        ->not->toContain('text-sidebar-primary-foreground');
    expect($appSidebar)->toContain('<AppLogo showName={false} />');
    expect(file_get_contents(dirname(__DIR__, 2).'/resources/js/components/app-sidebar-header.tsx'))
        ->toBeString()
        ->toContain('md:hidden');
    expect($navMain)->toBeString()
        ->toContain('CollapsibleContent')
        ->toContain('SidebarMenuSubButton');
    expect(file_get_contents(dirname(__DIR__, 2).'/resources/js/components/user-menu-content.tsx'))
        ->toBeString()
        ->toContain('<WorkspaceSwitcher />')
        ->toContain('<HugeiconsIcon icon={Logout02Icon} />')
        ->not->toContain('Logout01Icon');
    expect(file_get_contents(dirname(__DIR__, 2).'/resources/js/components/workspace-switcher.tsx'))
        ->toBeString()
        ->toContain('DropdownMenuSub')
        ->not->toContain('SidebarMenuButton');
});

test('the user dropdown provides workspace switching and a theme menu', function () {
    $root = dirname(__DIR__, 2);
    $userMenu = file_get_contents(
        $root.'/resources/js/components/user-menu-content.tsx',
    );

    expect($userMenu)->toBeString()
        ->toContain('<WorkspaceSwitcher />')
        ->toContain('data-test="theme-menu-trigger"')
        ->toContain('data-test={`theme-${value}-item`}')
        ->toContain('icon={Settings01Icon}')
        ->toContain('icon={Logout02Icon}')
        ->toContain('icon={SunMoonIcon}')
        ->toContain('data-test="logout-button"')
        ->toContain('value: \'light\'')
        ->toContain('value: \'dark\'')
        ->toContain('value: \'system\'');
});

test('sidebar search uses the secondary menu button variant', function () {
    $root = dirname(__DIR__, 2);
    $navSearch = file_get_contents($root.'/resources/js/components/nav-search.tsx');
    $sidebar = file_get_contents($root.'/resources/js/components/ui/sidebar.tsx');

    expect($navSearch)->toBeString()
        ->toContain('variant="secondary"')
        ->not->toContain('text-sidebar-foreground/70');

    expect($sidebar)->toBeString()
        ->toContain('secondary:')
        ->toContain('bg-secondary text-secondary-foreground');
});

test('sidebar keeps a single generic dashboard destination', function () {
    $appSidebar = file_get_contents(dirname(__DIR__, 2).'/resources/js/components/app-sidebar.tsx');

    expect($appSidebar)->toBeString()
        ->toContain("title: 'Dashboard'")
        ->toContain('icon: DashboardSquare01Icon')
        ->toContain('solidIcon: DashboardSquare01SolidIcon')
        ->toContain('<NavMain items={mainNavItems} label="Workspace" />')
        ->not->toContain('NavCampaigns');
});

test('active sidebar items swap to Hugeicons solid rounded icons', function () {
    $root = dirname(__DIR__, 2);
    $navMain = file_get_contents($root.'/resources/js/components/nav-main.tsx');
    $navIcon = file_get_contents($root.'/resources/js/components/nav-icon.tsx');
    $settingsLayout = file_get_contents($root.'/resources/js/layouts/settings/layout.tsx');

    expect($navIcon)->toBeString()
        ->toContain('altIcon={solidIcon ?? undefined}')
        ->toContain('showAlt={isActive}');

    expect($navMain)->toBeString()
        ->toContain('<NavIcon')
        ->toContain('solidIcon={item.solidIcon}')
        ->toContain('isActive={isActive}');

    expect($settingsLayout)->toBeString()
        ->toContain("from '@hugeicons/core-solid-rounded'")
        ->toContain('<NavIcon')
        ->toContain('item.solidIcon')
        ->toContain('isActive={isActive}');
});
