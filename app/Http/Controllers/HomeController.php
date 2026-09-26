<?php

namespace App\Http\Controllers;

use App\Http\Responses\Concerns\RedirectsToCurrentWorkspace;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    use RedirectsToCurrentWorkspace;

    /**
     * Send the root URL straight to the current workspace's dashboard.
     */
    public function __invoke(Request $request): RedirectResponse
    {
        return redirect()->to(
            $this->redirectPathForCurrentWorkspace($request, config('fortify.home'))
        );
    }
}
