<?php

namespace App\Http\Controllers;

use App\Support\ComponentGallery;
use Inertia\Inertia;
use Inertia\Response;

class ComponentGalleryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('gallery/index');
    }

    public function show(string $category): Response
    {
        $definition = ComponentGallery::find($category);

        abort_if($definition === null, 404);

        return Inertia::render('gallery/show', [
            'category' => $definition,
        ]);
    }
}
