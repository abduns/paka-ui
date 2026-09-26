<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * The component gallery is the public front door of Paka UI.
     */
    public function __invoke(): Response
    {
        return Inertia::render('gallery/index');
    }
}
