<?php

use App\Http\Controllers\AvatarController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InstallationController;
use App\Http\Controllers\Workspaces\WorkspaceInvitationController;
use App\Http\Middleware\EnsureInstallationIsPending;
use App\Http\Middleware\EnsureWorkspaceMembership;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\SetWorkspaceUrlDefaults;
use App\Services\DiceBearAvatarGenerator;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\Facades\Route;
use Illuminate\View\Middleware\ShareErrorsFromSession;

Route::get('install', [InstallationController::class, 'show'])
    ->middleware([EnsureInstallationIsPending::class, 'signed:relative', 'throttle:30,1'])
    ->name('install.show');
Route::post('install', [InstallationController::class, 'store'])
    ->middleware([EnsureInstallationIsPending::class, 'signed:relative', 'throttle:5,1'])
    ->name('install.store');
Route::get('install/system', [InstallationController::class, 'system'])
    ->middleware([EnsureInstallationIsPending::class, 'signed:relative', 'throttle:30,1'])
    ->name('install.system.show');
Route::post('install/system', [InstallationController::class, 'testSystem'])
    ->middleware([EnsureInstallationIsPending::class, 'signed:relative', 'throttle:5,1'])
    ->name('install.system.run');

Route::get('/', HomeController::class)->middleware('auth')->name('home');

Route::get('avatars/{style}/{seed}.svg', AvatarController::class)
    ->whereIn('style', DiceBearAvatarGenerator::STYLES)
    ->where('seed', '[A-Za-z0-9-]{1,36}')
    ->middleware(['signed:relative', 'throttle:300,1'])
    ->withoutMiddleware([
        AddLinkHeadersForPreloadedAssets::class,
        AddQueuedCookiesToResponse::class,
        EncryptCookies::class,
        HandleAppearance::class,
        HandleInertiaRequests::class,
        PreventRequestForgery::class,
        SetWorkspaceUrlDefaults::class,
        ShareErrorsFromSession::class,
        StartSession::class,
    ])
    ->name('avatars.show');

Route::prefix('{current_workspace}')
    ->middleware(['auth', 'verified', EnsureWorkspaceMembership::class])
    ->group(function (): void {
        Route::get('dashboard', DashboardController::class)->name('dashboard');
    });

Route::middleware('auth')->group(function (): void {
    Route::post('invitations/{invitation}/accept', [WorkspaceInvitationController::class, 'accept'])->name('invitations.accept');
    Route::delete('invitations/{invitation}', [WorkspaceInvitationController::class, 'decline'])->name('invitations.decline');
});

require __DIR__.'/settings.php';
