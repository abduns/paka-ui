<?php

use Inertia\Testing\AssertableInertia as Assert;

test('unknown routes render the custom 404 error page', function () {
    $response = $this->get('/this-route-does-not-exist');

    $response->assertNotFound();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('error')
        ->where('status', 404)
    );
});
