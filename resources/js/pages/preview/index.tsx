import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Empty,
    EmptyHeader,
    EmptyTitle,
    EmptyDescription,
} from '@/components/ui/empty';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { examples } from '@/examples';
import { blockEntries } from '@/registry';
import { home } from '@/routes';
import { block, errors, page } from '@/routes/preview';

export default function PreviewIndex() {
    return (
        <div className="flex min-h-svh flex-col bg-background text-foreground">
            <Head title="Blocks" />
            <header>
                <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
                    <Link
                        href={home()}
                        className="rounded-sm text-lg font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label="Paka UI home"
                    >
                        Paka<span className="text-muted-foreground"> / UI</span>
                    </Link>
                    <Badge variant="neutral">Page blocks</Badge>
                </div>
                <Separator />
            </header>
            <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-10 sm:py-14">
                <div className="flex max-w-2xl flex-col gap-3">
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        Page blocks
                    </h1>
                    <p className="text-base leading-relaxed text-muted-foreground">
                        Reusable sections for building pages.
                    </p>
                </div>
                {blockEntries.length === 0 && (
                    <Empty>
                        <EmptyHeader>
                            <EmptyTitle>No blocks yet</EmptyTitle>
                            <EmptyDescription>
                                New blocks will appear here when they are added.
                            </EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                )}
                {blockEntries.length > 0 && (
                    <Tabs defaultValue="components" className="gap-6">
                        <TabsList
                            variant="line"
                            aria-label="Browse the library"
                        >
                            <TabsTrigger value="components">
                                Components
                                <Badge variant="neutral">
                                    {blockEntries.length}
                                </Badge>
                            </TabsTrigger>
                            <TabsTrigger value="examples">
                                Examples
                                <Badge variant="neutral">
                                    {Object.keys(examples).length}
                                </Badge>
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="components">
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {blockEntries.map(([type, definition]) => (
                                    <Card key={type}>
                                        <CardHeader>
                                            <CardTitle>
                                                <h2>{definition.name}</h2>
                                            </CardTitle>
                                            <CardDescription>
                                                <code className="text-xs">
                                                    {type}
                                                </code>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-1">
                                            <p className="leading-relaxed text-muted-foreground">
                                                {definition.description}
                                            </p>
                                        </CardContent>
                                        <CardFooter>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                render={
                                                    <Link href={block(type)} />
                                                }
                                                nativeButton={false}
                                                aria-label={`Preview ${definition.name}`}
                                            >
                                                Preview component
                                                <HugeiconsIcon
                                                    icon={ArrowRight01Icon}
                                                    data-icon="inline-end"
                                                    aria-hidden="true"
                                                />
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="examples">
                            <div className="grid gap-5 sm:grid-cols-2">
                                {Object.entries(examples).map(
                                    ([key, example]) => (
                                        <Card key={key}>
                                            <CardHeader>
                                                <CardTitle>
                                                    <h2>{example.name}</h2>
                                                </CardTitle>
                                                <CardDescription>
                                                    {example.category}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="flex-1">
                                                <p className="leading-relaxed text-muted-foreground">
                                                    {example.config.description}
                                                </p>
                                            </CardContent>
                                            <CardFooter className="flex-wrap justify-between gap-3">
                                                <Badge variant="neutral">
                                                    {
                                                        example.config.sections
                                                            .length
                                                    }{' '}
                                                    sections
                                                </Badge>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    render={
                                                        <Link
                                                            href={page(key)}
                                                        />
                                                    }
                                                    nativeButton={false}
                                                    aria-label={`Preview ${example.name}`}
                                                >
                                                    Preview page
                                                    <HugeiconsIcon
                                                        icon={ArrowRight01Icon}
                                                        data-icon="inline-end"
                                                        aria-hidden="true"
                                                    />
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ),
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                )}
            </main>
            <footer>
                <Separator />
                <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5">
                    <p className="text-xs text-muted-foreground">
                        Built with shadcn/ui.
                    </p>
                    <Button
                        variant="ghost"
                        size="sm"
                        render={<Link href={errors()} />}
                        nativeButton={false}
                    >
                        Validation example
                        <HugeiconsIcon
                            icon={ArrowRight01Icon}
                            data-icon="inline-end"
                            aria-hidden="true"
                        />
                    </Button>
                </div>
            </footer>
        </div>
    );
}
