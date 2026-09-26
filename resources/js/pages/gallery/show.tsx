import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Head, Link } from '@inertiajs/react';
import { DemoCard, demoAnchor } from '@/components/gallery/demo-card';
import { Badge } from '@/components/ui/badge';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from '@/components/ui/empty';
import { categories, demosFor } from '@/gallery/registry';
import type { Category } from '@/gallery/registry';
import { index, show } from '@/routes/components';

export default function GalleryShow({ category }: { category: Category }) {
    const demos = demosFor(category.slug);
    const position = categories.findIndex(
        (entry) => entry.slug === category.slug,
    );
    const previous = position > 0 ? categories[position - 1] : undefined;
    const next =
        position < categories.length - 1 ? categories[position + 1] : undefined;

    return (
        <div className="flex flex-col gap-8">
            <Head title={`${category.name} components`}>
                <meta name="description" content={category.description} />
            </Head>
            <div className="flex flex-col gap-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink render={<Link href={index()} />}>
                                Components
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{category.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex max-w-2xl flex-col gap-2">
                        <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance">
                            {category.name}
                        </h1>
                        <p className="text-base leading-relaxed text-muted-foreground">
                            {category.description}
                        </p>
                    </div>
                    <Badge variant="neutral">
                        {demos.length} {demos.length === 1 ? 'demo' : 'demos'}
                    </Badge>
                </div>
                {demos.length > 1 && (
                    <nav
                        aria-label="Demos on this page"
                        className="flex flex-wrap gap-1.5"
                    >
                        {demos.map((demo) => (
                            <a
                                key={demo.id}
                                href={`#${demoAnchor(demo)}`}
                                className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors outline-none hover:border-foreground/30 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
                            >
                                {demo.name}
                            </a>
                        ))}
                    </nav>
                )}
            </div>
            {demos.length === 0 ? (
                <Empty>
                    <EmptyHeader>
                        <EmptyTitle>No demos yet</EmptyTitle>
                        <EmptyDescription>
                            Add files under resources/js/gallery/demos/
                            {category.slug} and they show up here.
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            ) : (
                <div className="flex flex-col gap-6">
                    {demos.map((demo) => (
                        <DemoCard key={demo.id} demo={demo} />
                    ))}
                </div>
            )}
            <nav
                aria-label="Neighbouring categories"
                className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6"
            >
                {previous ? (
                    <Button
                        variant="ghost"
                        nativeButton={false}
                        render={<Link href={show(previous.slug)} />}
                    >
                        <HugeiconsIcon
                            icon={ArrowLeft01Icon}
                            data-icon="inline-start"
                            aria-hidden="true"
                        />
                        {previous.name}
                    </Button>
                ) : (
                    <span />
                )}
                {next && (
                    <Button
                        variant="ghost"
                        nativeButton={false}
                        render={<Link href={show(next.slug)} />}
                    >
                        {next.name}
                        <HugeiconsIcon
                            icon={ArrowRight01Icon}
                            data-icon="inline-end"
                            aria-hidden="true"
                        />
                    </Button>
                )}
            </nav>
        </div>
    );
}
