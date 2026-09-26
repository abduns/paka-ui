<?php

test('uses Starter Kit as the configured application name', function () {
    expect(config('app.name'))->toBe('Starter Kit');
});
