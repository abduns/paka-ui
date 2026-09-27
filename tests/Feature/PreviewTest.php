<?php

use Inertia\Testing\AssertableInertia as Assert;

test('guests can browse the block playground', function () {
    $this->get(route('preview.index'))
        ->assertInertia(fn (Assert $page) => $page->component('preview/index'));
});

test('both examples use the same preview page and support a standalone canvas', function (string $example) {
    $this->get(route('preview.page', ['example' => $example, 'canvas' => true]))
        ->assertInertia(fn (Assert $page) => $page
            ->component('preview/show')
            ->where('kind', 'page')
            ->where('name', $example)
            ->where('canvas', true));
})->with(['gather', 'fieldwork']);

test('each block is available without signing in', function (string $block) {
    $this->get(route('preview.block', ['block' => $block]))
        ->assertInertia(fn (Assert $page) => $page
            ->component('preview/show')
            ->where('kind', 'block')
            ->where('name', $block)
            ->where('canvas', false)
            ->where('sample', 'default'));
})->with(['hero.centered', 'hero.split', 'hero.preview', 'pricing.cards', 'pricing.billing', 'pricing.offer', 'footer.compact', 'footer.columns', 'footer.cta']);

test('block previews accept content stress samples', function (string $sample) {
    $this->get(route('preview.block', ['block' => 'hero.split', 'sample' => $sample]))
        ->assertInertia(fn (Assert $page) => $page->component('preview/show')->where('sample', $sample));
})->with(['long', 'minimal']);

test('unknown blocks reach the renderer for a useful diagnostic', function () {
    $this->get(route('preview.block', ['block' => 'hero.unknown']))
        ->assertInertia(fn (Assert $page) => $page->component('preview/show')->where('name', 'hero.unknown'));
});

test('the error example is available in the preview shell', function () {
    $this->get(route('preview.errors'))
        ->assertInertia(fn (Assert $page) => $page->component('preview/show')->where('kind', 'errors'));
});

test('unknown pages and content samples return not found', function () {
    $this->get(route('preview.page', ['example' => 'missing']))->assertNotFound();
    $this->get(route('preview.block', ['block' => 'hero.split', 'sample' => 'missing']))->assertNotFound();
});
