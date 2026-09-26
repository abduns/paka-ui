import {
    ArrowLeft01Icon,
    ArrowUpRight01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { examples, isExample } from '@/examples';
import {
    blockPreviewConfig,
    contentSamples,
    invalidExample,
} from '@/examples/content-samples';
import type { ContentSample } from '@/examples/content-samples';
import { blockRegistry, isBlockType } from '@/registry';
import { PageRenderer } from '@/renderer/page-renderer';
import { validatePage } from '@/renderer/validate-page';
import { home } from '@/routes';
import { block, errors, page } from '@/routes/preview';

type PreviewProps = {
    kind: 'page' | 'block' | 'errors';
    name: string;
    canvas: boolean;
    sample: ContentSample;
};
const viewportSizes = {
    Desktop: '100%',
    Tablet: '768px',
    Mobile: '390px',
} as const;

export default function PreviewShow({
    kind,
    name,
    canvas,
    sample,
}: PreviewProps) {
    const [viewport, setViewport] =
        useState<keyof typeof viewportSizes>('Desktop');
    const [showJson, setShowJson] = useState(false);
    const config =
        kind === 'page' && isExample(name)
            ? examples[name].config
            : kind === 'block' && isBlockType(name)
              ? blockPreviewConfig(name, sample)
              : kind === 'errors'
                ? invalidExample
                : {
                      schemaVersion: 1,
                      theme: 'default',
                      sections: [{ id: 'unknown', type: name, props: {} }],
                  };
    const validation = validatePage(config);
    const title =
        kind === 'block' && isBlockType(name)
            ? blockRegistry[name].name
            : validation.success
              ? (validation.data.title ?? name)
              : name;
    const description = validation.success
        ? validation.data.description
        : undefined;
    const canvasUrl =
        kind === 'page'
            ? page.url(name, { query: { canvas: true } })
            : kind === 'block'
              ? block.url(name, { query: { canvas: true, sample } })
              : errors.url({ query: { canvas: true } });

    if (canvas) {
        return (
            <>
                <Head title={title}>
                    {description && (
                        <meta name="description" content={description} />
                    )}
                </Head>
                <PageRenderer config={config} />
            </>
        );
    }

    return (
        <div className="flex min-h-svh flex-col bg-background text-foreground">
            <Head title={`${title} — Paka preview`} />
            <header className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        render={<Link href={home()} />}
                        nativeButton={false}
                        aria-label="Back to home"
                    >
                        <HugeiconsIcon
                            icon={ArrowLeft01Icon}
                            aria-hidden="true"
                        />
                    </Button>
                    <h1 className="text-sm font-semibold">{title}</h1>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <ToggleGroup
                        aria-label="Preview width"
                        variant="outline"
                        size="sm"
                        spacing={0}
                        value={[viewport]}
                        onValueChange={(values) => {
                            const nextViewport = values[0];

                            if (nextViewport && nextViewport in viewportSizes) {
                                setViewport(
                                    nextViewport as keyof typeof viewportSizes,
                                );
                            }
                        }}
                    >
                        {Object.keys(viewportSizes).map((size) => (
                            <ToggleGroupItem
                                key={size}
                                value={size}
                                aria-label={`${size} preview`}
                            >
                                {size}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                    <Button
                        variant="outline"
                        size="sm"
                        aria-expanded={showJson}
                        aria-controls="preview-json"
                        onClick={() => setShowJson(!showJson)}
                    >
                        {showJson ? 'Hide JSON' : 'View JSON'}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        nativeButton={false}
                        render={
                            <a
                                href={canvasUrl}
                                target="_blank"
                                rel="noreferrer"
                            />
                        }
                    >
                        Open page<span className="sr-only"> in a new tab</span>
                        <HugeiconsIcon
                            icon={ArrowUpRight01Icon}
                            data-icon="inline-end"
                            aria-hidden="true"
                        />
                    </Button>
                </div>
            </header>
            <Separator />
            {kind === 'block' && (
                <>
                    <div className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
                        <span
                            id="content-sample-label"
                            className="text-xs text-muted-foreground"
                        >
                            Content
                        </span>
                        <ToggleGroup
                            aria-labelledby="content-sample-label"
                            value={[sample]}
                            size="sm"
                            spacing={1}
                        >
                            {contentSamples.map((value) => (
                                <ToggleGroupItem
                                    key={value}
                                    value={value}
                                    nativeButton={false}
                                    render={
                                        <Link
                                            href={block(name, {
                                                query: { sample: value },
                                            })}
                                            preserveState
                                            preserveScroll
                                        />
                                    }
                                    aria-current={
                                        sample === value ? 'page' : undefined
                                    }
                                >
                                    {value === 'default'
                                        ? 'Default'
                                        : value === 'long'
                                          ? 'Long content'
                                          : 'Minimal'}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </div>
                    <Separator />
                </>
            )}
            <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-3 sm:p-6">
                <p className="text-center text-xs text-muted-foreground">
                    {viewport} preview
                    {viewport !== 'Desktop' &&
                        ` · ${viewportSizes[viewport]}`}{' '}
                    ·{' '}
                    {validation.success
                        ? `${validation.data.sections.length} ${validation.data.sections.length === 1 ? 'section' : 'sections'}`
                        : 'Configuration needs attention'}
                </p>
                {showJson && (
                    <section
                        id="preview-json"
                        aria-label="Page JSON"
                        className="mx-auto w-full max-w-6xl"
                    >
                        <pre
                            tabIndex={0}
                            className="max-h-96 overflow-auto rounded-lg border border-border bg-background p-5 text-xs leading-relaxed"
                        >
                            <code>{JSON.stringify(config, null, 2)}</code>
                        </pre>
                    </section>
                )}
                <iframe
                    key={canvasUrl}
                    title={`${title} live preview`}
                    src={canvasUrl}
                    className="mx-auto min-h-[70vh] flex-1 rounded-lg border bg-background"
                    style={{
                        width: viewportSizes[viewport],
                        maxWidth: '100%',
                        height: 'calc(100dvh - 180px)',
                    }}
                />
            </main>
        </div>
    );
}
