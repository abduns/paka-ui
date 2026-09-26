<?php

/**
 * @return list<string>
 */
function dialogSpacingTsxFiles(): array
{
    $root = dirname(__DIR__, 2).'/resources/js';

    $files = [];

    /** @var SplFileInfo $file */
    foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($root)) as $file) {
        if ($file->isFile() && $file->getExtension() === 'tsx') {
            $files[] = $file->getPathname();
        }
    }

    return $files;
}

test('an Inertia Form wrapping the dialog sections owns its own spacing', function () {
    foreach (dialogSpacingTsxFiles() as $path) {
        $contents = file_get_contents($path);

        preg_match_all('/<DialogContent\b[^>]*>\s*<Form\b([^<]*)/s', $contents, $matches);

        foreach ($matches[1] as $props) {
            expect(str_contains($props, 'space-y-6') || str_contains($props, 'gap-6'))->toBeTrue(
                "The <Form> in {$path} is the only direct child of its <DialogContent>, so the dialog's "
                .'grid gap-6 never separates the header, fields, and footer. Give the Form className="space-y-6".'
            );
        }
    }
});
