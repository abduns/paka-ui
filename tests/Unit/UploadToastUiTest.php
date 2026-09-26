<?php

test('upload notifications render a per file progress panel that updates in place', function () {
    $root = dirname(__DIR__, 2).'/resources/js';
    $toaster = file_get_contents($root.'/components/ui/toast.tsx');
    $uploadToast = file_get_contents($root.'/hooks/use-upload-toast.ts');

    expect($toaster)->toBeString()
        ->toContain('kind: "upload"')
        ->toContain('aria-label="Upload progress"')
        ->toContain('{progress}%')
        ->toContain('{uploadFiles.length} total • {uploadSummary.complete}')
        ->toContain('${complete} / ${files.length} ${word}')
        // In-flight rows say "Sent", never "Done": the whole transfer is one
        // request, so nothing is stored until the response settles it.
        ->toContain('sent: { label: "Sent"')
        ->toContain('uploadStatusBadges[file.status]')
        ->toContain('visibleUploadFiles(files, UPLOAD_FILE_ROWS)');

    expect($uploadToast)->toBeString()
        ->toContain("type: 'loading'")
        ->toContain('timeout: 0')
        ->toContain('toast.update(toastId.current')
        ->toContain('timeout: 5000');
});

test('every file upload entry point reports progress to the upload toast', function () {
    $root = dirname(__DIR__, 2).'/resources/js';
    $paths = [
        'pages/settings/profile.tsx',
        'pages/workspaces/create.tsx',
        'pages/workspaces/edit.tsx',
    ];

    foreach ($paths as $path) {
        $source = file_get_contents($root.'/'.$path);

        expect("{$path}\n{$source}")->toBeString()
            ->toContain('useUploadToast')
            ->toContain('onProgress')
            ->toMatch('/uploadToast\.setProgress\((event|progress)\)/');
    }
});
