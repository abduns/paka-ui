<?php

test('shared breadcrumbs render only meaningful hierarchy with compact semantics', function () {
    $root = dirname(__DIR__, 2);
    $breadcrumbs = file_get_contents($root.'/resources/js/components/breadcrumbs.tsx');
    $primitive = file_get_contents($root.'/resources/js/components/ui/breadcrumb.tsx');

    expect($breadcrumbs)->toBeString()
        ->toContain('if (breadcrumbs.length < 2)')
        ->toContain('title={item.title}')
        ->toContain('className="min-w-0"');

    expect($primitive)->toBeString()
        ->toContain('text-xs')
        ->toContain('max-w-[12rem] truncate')
        ->toContain('aria-current="page"')
        ->not->toContain('role="link"')
        ->not->toContain('aria-disabled="true"');
});

test('breadcrumb hosts use the shared compact bar', function () {
    $root = dirname(__DIR__, 2);
    $sidebarHeader = file_get_contents($root.'/resources/js/components/app-sidebar-header.tsx');
    $appHeader = file_get_contents($root.'/resources/js/components/app-header.tsx');

    expect($sidebarHeader)->toBeString()
        ->toContain('const hasBreadcrumbs = breadcrumbs.length > 1;')
        ->toContain("'md:hidden'")
        ->toContain('border-b');

    expect($appHeader)->toBeString()
        ->toContain('breadcrumbs.length > 1')
        ->toContain('text-muted-foreground')
        ->not->toContain('text-neutral-500');
});
