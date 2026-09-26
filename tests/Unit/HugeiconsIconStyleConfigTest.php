<?php

test('Vite defaults to free Hugeicons while supporting licensed Pro styles', function () {
    $root = dirname(__DIR__, 2);
    $viteConfig = file_get_contents($root.'/vite.config.ts');
    $environmentExample = file_get_contents($root.'/.env.example');
    $npmrcPath = $root.'/.npmrc';
    $npmrc = is_file($npmrcPath) ? file_get_contents($npmrcPath) : false;

    expect($viteConfig)->toBeString()
        ->toContain("'free-stroke-rounded': '@hugeicons/core-free-icons'")
        ->toContain("'pro-stroke-rounded': '@hugeicons-pro/core-stroke-rounded'")
        ->toContain("'pro-stroke-standard': '@hugeicons-pro/core-stroke-standard'")
        ->toContain("'pro-solid-rounded': '@hugeicons-pro/core-solid-rounded'")
        ->toContain('HUGEICONS_ICON_STYLE')
        ->toContain('find: /^@hugeicons\\/core-free-icons$/')
        ->toContain('find: /^@hugeicons\\/core-solid-rounded$/')
        ->toContain("'@hugeicons/core-solid-rounded'")
        ->toContain('noExternal: [');

    expect($environmentExample)
        ->toBeString()
        ->toContain('HUGEICONS_ICON_STYLE=free-stroke-rounded');

    if (is_string($npmrc)) {
        expect($npmrc)->not->toContain('_authToken');
    }
});
