<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('the project is licensed under MIT', function () {
    $root = dirname(__DIR__, 2);
    $license = file_get_contents($root.'/LICENSE');
    $composer = json_decode((string) file_get_contents($root.'/composer.json'), true);

    expect($composer['license'])->toBe('MIT');
    expect($license)->toBeString()
        ->toContain('MIT License')
        ->toContain('Copyright (c) 2026 Your Organization')
        ->not->toContain('GNU Affero')
        ->not->toContain('Powered by Starter Kit');
});

test('unauthenticated pages do not share an attribution notice', function () {
    $this->get(route('login'))
        ->assertInertia(fn (Assert $page) => $page
            ->missing('attribution')
        );
});

test('authenticated pages do not share an attribution notice', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->missing('attribution')
        );
});

test('the application shell does not render a powered-by badge', function () {
    $root = dirname(__DIR__, 2);

    expect(file_exists($root.'/resources/js/components/attribution-badge.tsx'))->toBeFalse();
    expect(file_exists($root.'/config/attribution.php'))->toBeFalse();
    expect(file_get_contents($root.'/resources/js/layouts/app/app-sidebar-layout.tsx'))
        ->toBeString()
        ->not->toContain('AttributionBadge')
        ->not->toContain('attribution-badge')
        ->not->toContain('Powered by');
});
