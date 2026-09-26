<?php

namespace App\Support;

/**
 * The component categories shown in the gallery. The list lives in
 * resources/js/gallery/categories.json so the client registry and the
 * server-side route validation share one source of truth.
 */
class ComponentGallery
{
    private const MANIFEST = __DIR__.'/../../resources/js/gallery/categories.json';

    /** @var list<array{slug: string, name: string, description: string}>|null */
    private static ?array $categories = null;

    /**
     * @return list<array{slug: string, name: string, description: string}>
     */
    public static function categories(): array
    {
        return self::$categories ??= json_decode(
            (string) file_get_contents(self::MANIFEST),
            true,
            512,
            JSON_THROW_ON_ERROR
        );
    }

    /**
     * @return list<string>
     */
    public static function slugs(): array
    {
        return array_column(self::categories(), 'slug');
    }

    /**
     * @return array{slug: string, name: string, description: string}|null
     */
    public static function find(string $slug): ?array
    {
        foreach (self::categories() as $category) {
            if ($category['slug'] === $slug) {
                return $category;
            }
        }

        return null;
    }
}
