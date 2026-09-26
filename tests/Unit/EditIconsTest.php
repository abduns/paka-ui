<?php

test('edit actions use Edit03Icon instead of older pencil icons', function () {
    $root = dirname(__DIR__, 2).'/resources/js';
    $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($root));
    $checked = 0;

    foreach ($iterator as $file) {
        if (! $file->isFile() || $file->getExtension() !== 'tsx') {
            continue;
        }

        $source = file_get_contents($file->getPathname());
        $checked++;

        /** Word-boundary matching so unrelated icons such as MailEdit02Icon are not flagged. */
        expect($source)->toBeString()
            ->not->toMatch('/\bEdit02Icon\b/')
            ->not->toMatch('/\bPencilEdit01Icon\b/')
            ->not->toMatch('/\bPencilEdit02Icon\b/');
    }

    expect($checked)->toBeGreaterThan(0);
});
