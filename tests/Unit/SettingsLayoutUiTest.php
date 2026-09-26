<?php

test('settings layout keeps only the mobile navigation trigger', function () {
    $root = dirname(__DIR__, 2);
    $layout = file_get_contents($root.'/resources/js/layouts/settings/layout.tsx');

    expect($layout)->toBeString()
        ->toContain('<SidebarTrigger className="-ml-1" />')
        ->toContain('md:hidden')
        ->not->toContain('Breadcrumbs')
        ->not->toContain('breadcrumbs = []')
        ->toContain("import type { NavItem } from '@/types'");
});

test('settings search keeps the requested navigation icon mapping', function () {
    $layout = file_get_contents(dirname(__DIR__, 2).'/resources/js/layouts/settings/layout.tsx');

    expect($layout)->toBeString()
        ->toContain('group.label.toLowerCase().includes(term)')
        ->toContain('className="text-sidebar-foreground/70"')
        ->toContain('icon: SunMoonIcon')
        ->toContain('icon: NewOfficeIcon')
        ->toContain('icon: UserAdd01Icon')
        ->not->toContain('PaintBoardIcon')
        ->not->toContain('ApiIcon')
        ->not->toContain('KeyRoundIcon')
        ->not->toContain('ColorsIcon');
});

test('profile settings uses an avatar upload trigger and email status badge', function () {
    $profile = file_get_contents(dirname(__DIR__, 2).'/resources/js/pages/settings/profile.tsx');

    expect($profile)->toBeString()
        ->toContain('Camera01Icon')
        ->toContain('group/avatar-upload relative block cursor-pointer')
        ->toContain('group-hover/avatar-upload:opacity-100')
        ->toContain('group-focus-within/avatar-upload:opacity-100')
        ->toContain("import { Badge } from '@/components/ui/badge'")
        ->toContain('<Badge')
        ->toContain('isEmailVerified')
        ->toContain("? 'success'")
        ->toContain("? 'Verified'")
        ->toContain(': \'Unverified\'')
        ->not->toContain('Choose photo')
        ->not->toContain('CheckmarkCircle02Icon');
});

test('appearance settings uses the sliding tabs primitive for color mode', function () {
    $appearanceTabs = file_get_contents(dirname(__DIR__, 2).'/resources/js/components/appearance-tabs.tsx');

    expect($appearanceTabs)->toBeString()
        ->toContain("from '@/components/ui/tabs'")
        ->toContain('<TabsList variant="sliding" aria-label="Color mode">')
        ->toContain('onValueChange={(value) => updateAppearance(value as Appearance)}')
        ->toContain('<TabsTrigger key={value} value={value}>')
        ->not->toContain('aria-pressed')
        ->not->toContain('<button');
});

test('workspace settings mirrors the profile identity controls', function () {
    $workspace = file_get_contents(dirname(__DIR__, 2).'/resources/js/pages/workspaces/edit.tsx');

    expect($workspace)->toBeString()
        ->not->toContain('eyebrow=')
        ->toContain('title="Workspace settings"')
        ->toContain('Camera01Icon')
        ->toContain('group/logo-upload relative block cursor-pointer rounded-full')
        ->toContain('group-hover/logo-upload:opacity-100')
        ->toContain('group-focus-within/logo-upload:opacity-100')
        ->not->toContain('Choose logo');
});

test('workspace settings omit eyebrow labels', function () {
    $root = dirname(__DIR__, 2);

    foreach (['edit', 'members'] as $page) {
        $source = file_get_contents($root."/resources/js/pages/workspaces/{$page}.tsx");

        expect($source)->toBeString()->not->toContain('eyebrow=');
    }
});

test('settings page headers render a plain title without an icon', function () {
    $root = dirname(__DIR__, 2);

    $header = file_get_contents($root.'/resources/js/components/settings-page-header.tsx');

    expect($header)->toBeString()
        ->not->toContain('icon')
        ->not->toContain('HugeiconsIcon');

    foreach ([
        'settings/profile',
        'settings/security',
        'settings/appearance',
        'workspaces/edit',
        'workspaces/members',
    ] as $page) {
        $source = file_get_contents($root."/resources/js/pages/{$page}.tsx");

        preg_match_all('/<SettingsPageHeader\\b[^>]*>/', (string) $source, $usages);

        expect($usages[0])->not->toBeEmpty();

        foreach ($usages[0] as $usage) {
            expect($usage)->not->toContain('icon=');
        }
    }
});

test('account settings pages omit the eyebrow label above the title', function () {
    $root = dirname(__DIR__, 2);

    foreach (['profile', 'security', 'appearance'] as $page) {
        $source = file_get_contents($root."/resources/js/pages/settings/{$page}.tsx");

        expect($source)->toBeString()->not->toContain('eyebrow=');
    }
});

test('members settings uses compact paginated tables', function () {
    $members = file_get_contents(dirname(__DIR__, 2).'/resources/js/pages/workspaces/members.tsx');

    expect($members)->toBeString()
        ->toContain("from '@/components/ui/table'")
        ->toContain('members.data.map')
        ->toContain('invitations.data.map')
        ->toContain('<ListPagination')
        ->toContain('Rows per page')
        ->toContain('members_per_page')
        ->toContain('invitations_per_page')
        ->toContain('PaginationPrevious')
        ->toContain('PaginationNext')
        ->toContain('p-3 sm:p-4')
        ->toContain('px-5 py-4')
        ->not->toContain("import { Paginator } from '@/components/paginator'")
        ->not->toContain('overflow-hidden rounded-lg border')
        ->not->toContain('member.uuid');
});

test('settings pages share the inset-card workspace, page header, and panel hierarchy', function () {
    $root = dirname(__DIR__, 2);
    $layout = file_get_contents($root.'/resources/js/layouts/settings/layout.tsx');
    $panel = file_get_contents($root.'/resources/js/components/settings-panel.tsx');
    $header = file_get_contents($root.'/resources/js/components/settings-page-header.tsx');
    $deleteUser = file_get_contents($root.'/resources/js/components/delete-user.tsx');

    expect($layout)->toBeString()
        ->toContain('max-w-4xl')
        ->toContain('flex min-h-0 flex-1 flex-col p-10')
        ->not->toContain('variant="inset"');

    expect($panel)->toBeString()
        ->toContain("variant?: 'card' | 'inset'")
        ->toContain("variant = 'card'")
        ->toContain("variant === 'card'")
        ->toContain('grainy relative overflow-hidden rounded-xl bg-muted p-1 shadow-inner')
        ->toContain('rounded-lg border bg-card shadow-xs');

    expect($header)->toBeString()
        ->toContain('<h1')
        ->toContain('text-2xl');

    foreach ([
        'settings/profile',
        'settings/security',
        'settings/appearance',
        'workspaces/edit',
        'workspaces/members',
    ] as $page) {
        $source = file_get_contents($root."/resources/js/pages/{$page}.tsx");

        expect($source)->toBeString()
            ->toContain('SettingsPageHeader')
            ->toContain('flex flex-col gap-8')
            ->toContain('variant="inset"');
    }

    expect($deleteUser)->toBeString()->toContain('variant="inset"');
});

test('settings pages do not export unused breadcrumb data', function () {
    $root = dirname(__DIR__, 2);

    foreach ([
        'settings/profile',
        'settings/security',
        'settings/appearance',
        'workspaces/edit',
        'workspaces/members',
    ] as $page) {
        $source = file_get_contents($root."/resources/js/pages/{$page}.tsx");

        expect($source)->toBeString()
            ->not->toContain('breadcrumbs:');
    }
});
