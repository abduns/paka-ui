import { Head, Link } from '@inertiajs/react';
import { CategoryCard } from '@/components/gallery/category-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { categories, demos } from '@/gallery/registry';
import { index as blocks } from '@/routes/blocks';
import { usePreset } from '@/themes/store';
import { styleDefinition } from '@/themes/styles';

export default function GalleryIndex() {
    const preset = usePreset();
    const style = styleDefinition(preset.style);

    return (
        <div className="flex flex-col gap-8">
            <Head title="Components" />
            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="neutral">{demos.length} demos</Badge>
                    <Badge variant="neutral">
                        {categories.length} categories
                    </Badge>
                    <Badge variant="blue">{style.label} style</Badge>
                </div>
                <div className="flex max-w-2xl flex-col gap-3">
                    <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                        Paka UI components
                    </h1>
                    <p className="text-base leading-relaxed text-muted-foreground">
                        Copy-paste React components built on shadcn/ui and Base
                        UI. Every demo follows the shadcn/create styles, so
                        switch between {style.label} and the other seven styles,
                        pick a palette, and the whole gallery updates.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button
                        nativeButton={false}
                        render={<Link href={blocks()} />}
                        variant="outline"
                    >
                        Browse page blocks
                    </Button>
                </div>
            </div>
            <section
                aria-label="Categories"
                className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3"
            >
                {categories.map((category) => (
                    <CategoryCard key={category.slug} category={category} />
                ))}
            </section>
        </div>
    );
}
