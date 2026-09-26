<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests can browse the component gallery on home', function () {
    $response = $this->get(route('home'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('gallery/index')
        ->where('auth.user', null));
});

test('authenticated users can browse the component gallery on home', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('home'));

    $response->assertInertia(fn (Assert $page) => $page->component('gallery/index'));
});
