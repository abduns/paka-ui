<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PreviewController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('preview/index');
    }

    public function page(Request $request, string $example): Response
    {
        return Inertia::render('preview/show', [
            'kind' => 'page',
            'name' => $example,
            'canvas' => $request->boolean('canvas'),
            'sample' => 'default',
        ]);
    }

    public function block(Request $request, string $block): Response
    {
        $sample = $request->query('sample', 'default');

        abort_unless(in_array($sample, ['default', 'long', 'minimal'], true), 404);

        return Inertia::render('preview/show', [
            'kind' => 'block',
            'name' => $block,
            'canvas' => $request->boolean('canvas'),
            'sample' => $sample,
        ]);
    }

    public function errors(Request $request): Response
    {
        return Inertia::render('preview/show', [
            'kind' => 'errors',
            'name' => 'Validation errors',
            'canvas' => $request->boolean('canvas'),
            'sample' => 'default',
        ]);
    }
}
