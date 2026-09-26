import type { ComponentType } from 'react';
import categoriesJson from '@/gallery/categories.json';

export type Category = {
    slug: string;
    name: string;
    description: string;
};

export type DemoMeta = {
    /** Short title shown under the preview, e.g. "Variants". */
    name: string;
    /** One sentence on what the demo shows. */
    description: string;
    /**
     * Preview height hint. "tall" is for overlays and calendars that need
     * room; "compact" for one-line controls. Defaults to "default".
     */
    height?: 'compact' | 'default' | 'tall';
};

export type Demo = {
    /** `${category}/${file-stem}` without the numeric ordering prefix. */
    id: string;
    category: string;
    name: string;
    description: string;
    height: NonNullable<DemoMeta['height']>;
    component: ComponentType;
    /** The demo's TypeScript source with the `meta` export removed. */
    source: string;
};

type DemoModule = {
    default: ComponentType;
    meta: DemoMeta;
};

export const categories: Category[] = categoriesJson;

const modules = import.meta.glob<DemoModule>('./demos/*/*.tsx', {
    eager: true,
});
const sources = import.meta.glob<string>('./demos/*/*.tsx', {
    eager: true,
    query: '?raw',
    import: 'default',
});

const META_BLOCK = /export const meta[^=]*=\s*\{[\s\S]*?\n\};?\n\n?/;
const DEMO_PATH = /^\.\/demos\/([^/]+)\/(?:\d+-)?([^/]+)\.tsx$/;

function stripMeta(source: string): string {
    return source.replace(META_BLOCK, '').trimStart();
}

export const demos: Demo[] = Object.keys(modules)
    .sort()
    .flatMap((path) => {
        const match = DEMO_PATH.exec(path);
        const module = modules[path];

        if (!match || !module?.meta || !module.default) {
            return [];
        }

        const [, category, stem] = match;

        return [
            {
                id: `${category}/${stem}`,
                category,
                name: module.meta.name,
                description: module.meta.description,
                height: module.meta.height ?? 'default',
                component: module.default,
                source: stripMeta(sources[path] ?? ''),
            },
        ];
    });

const demosByCategory = new Map<string, Demo[]>();

for (const demo of demos) {
    demosByCategory.set(demo.category, [
        ...(demosByCategory.get(demo.category) ?? []),
        demo,
    ]);
}

export function isCategory(slug: string): slug is Category['slug'] {
    return categories.some((category) => category.slug === slug);
}

export function findCategory(slug: string): Category | undefined {
    return categories.find((category) => category.slug === slug);
}

export function demosFor(slug: string): Demo[] {
    return demosByCategory.get(slug) ?? [];
}

export function demoCount(slug: string): number {
    return demosFor(slug).length;
}
