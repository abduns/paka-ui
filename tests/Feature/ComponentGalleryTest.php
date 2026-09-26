<?php

use App\Support\ComponentGallery;
use Inertia\Testing\AssertableInertia as Assert;

test('the home page is the component gallery', function () {
    $this->get(route('home'))
        ->assertInertia(fn (Assert $page) => $page->component('gallery/index'));
});

test('the components index renders the gallery', function () {
    $this->get(route('components.index'))
        ->assertInertia(fn (Assert $page) => $page->component('gallery/index'));
});

test('every category has a page', function (string $slug) {
    $this->get(route('components.show', ['category' => $slug]))
        ->assertInertia(fn (Assert $page) => $page
            ->component('gallery/show')
            ->where('category.slug', $slug)
            ->has('category.name')
            ->has('category.description'));
})->with(fn () => ComponentGallery::slugs());

test('unknown categories return not found', function () {
    $this->get(route('components.show', ['category' => 'missing']))->assertNotFound();
    $this->get('/components/Not-Valid')->assertNotFound();
});

test('the block playground moved to blocks', function () {
    $this->get(route('blocks.index'))
        ->assertInertia(fn (Assert $page) => $page->component('preview/index'));
});

test('categories are unique and well formed', function () {
    $slugs = ComponentGallery::slugs();

    expect($slugs)->toBe(array_values(array_unique($slugs)))
        ->and($slugs)->not->toBeEmpty();

    foreach (ComponentGallery::categories() as $category) {
        expect($category['slug'])->toMatch('/^[a-z][a-z0-9-]*$/')
            ->and($category['name'])->not->toBeEmpty()
            ->and($category['description'])->not->toBeEmpty();
    }
});
