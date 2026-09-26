import { Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import type { Category } from '@/gallery/registry';
import { demosFor } from '@/gallery/registry';
import { show } from '@/routes/components';

/**
 * A category tile for the index grid. The thumbnail is the category's first
 * demo rendered live but inert, so the tile reflects the active preset. The
 * title link is stretched over the whole tile, which keeps the demo's own
 * anchors out of the link's DOM subtree.
 */
export function CategoryCard({ category }: { category: Category }) {
    const demos = demosFor(category.slug);
    const Thumbnail = demos[0]?.component;

    return (
        <article className="group/tile relative flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground transition-colors hover:border-foreground/25 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring/50">
            <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[16px_16px] p-6">
                {Thumbnail ? (
                    <div
                        inert
                        aria-hidden="true"
                        className="flex w-full max-w-sm origin-center scale-90 justify-center select-none"
                    >
                        <Thumbnail />
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        Demos coming soon
                    </p>
                )}
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
                <div className="min-w-0">
                    <h2 className="truncate text-sm font-medium">
                        <Link
                            href={show.url(category.slug)}
                            className="outline-none after:absolute after:inset-0 after:content-['']"
                        >
                            {category.name}
                        </Link>
                    </h2>
                    <p className="truncate text-xs text-muted-foreground">
                        {category.description}
                    </p>
                </div>
                <Badge variant="neutral" aria-label={`${demos.length} demos`}>
                    {demos.length}
                </Badge>
            </div>
        </article>
    );
}
