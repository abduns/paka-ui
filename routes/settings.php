<?php

use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SecurityController;
use App\Http\Controllers\Workspaces\WorkspaceController;
use App\Http\Controllers\Workspaces\WorkspaceInvitationController;
use App\Http\Controllers\Workspaces\WorkspaceMemberController;
use App\Http\Middleware\EnsureWorkspaceMembership;
use Illuminate\Auth\Middleware\RequirePassword;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function (): void {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
});

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/security', [SecurityController::class, 'edit'])
        ->middleware(RequirePassword::class)
        ->name('security.edit');
    Route::put('settings/password', [SecurityController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');
    Route::inertia('settings/appearance', 'settings/appearance')->name('appearance.edit');

    Route::get('settings/workspace', [WorkspaceController::class, 'index'])->name('workspaces.index');
    Route::get('settings/workspace/create', [WorkspaceController::class, 'create'])->name('workspaces.create');
    Route::post('settings/workspace', [WorkspaceController::class, 'store'])->name('workspaces.store');

    Route::middleware(EnsureWorkspaceMembership::class)->group(function (): void {
        Route::get('settings/workspace/{workspace}', [WorkspaceController::class, 'edit'])->name('workspaces.edit');
        Route::patch('settings/workspace/{workspace}', [WorkspaceController::class, 'update'])->name('workspaces.update');
        Route::delete('settings/workspace/{workspace}', [WorkspaceController::class, 'destroy'])->name('workspaces.destroy');
        Route::post('settings/workspace/{workspace}/switch', [WorkspaceController::class, 'switch'])->name('workspaces.switch');
        Route::delete('settings/workspace/{workspace}/leave', [WorkspaceController::class, 'leave'])->name('workspaces.leave');

        Route::get('settings/workspace/{workspace}/members', [WorkspaceMemberController::class, 'index'])->name('workspaces.members.index');
        Route::patch('settings/workspace/{workspace}/members/{user}', [WorkspaceMemberController::class, 'update'])->name('workspaces.members.update');
        Route::delete('settings/workspace/{workspace}/members/{user}', [WorkspaceMemberController::class, 'destroy'])->name('workspaces.members.destroy');
        Route::middleware([RequirePassword::class, 'throttle:6,1'])->group(function (): void {
            Route::post('settings/workspace/{workspace}/members/{user}/generate-password', [WorkspaceMemberController::class, 'generatePassword'])
                ->name('workspaces.members.generate-password');
            Route::post('settings/workspace/{workspace}/members/{user}/send-password-reset-link', [WorkspaceMemberController::class, 'sendPasswordResetLink'])
                ->name('workspaces.members.send-password-reset-link');
        });

        Route::post('settings/workspace/{workspace}/invitations', [WorkspaceInvitationController::class, 'store'])->name('workspaces.invitations.store');
        Route::delete('settings/workspace/{workspace}/invitations/{invitation}', [WorkspaceInvitationController::class, 'destroy'])->name('workspaces.invitations.destroy');
    });
});

Route::get('.well-known/passkey-endpoints', function () {
    return response()->json([
        'enroll' => route('security.edit'),
        'manage' => route('security.edit'),
    ]);
})->name('well-known.passkeys');
