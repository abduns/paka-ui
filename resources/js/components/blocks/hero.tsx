import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { BlockAction } from '@/components/blocks/shared';
import { cn } from '@/lib/utils';
import type { HeroProps } from '@/registry/schemas';

export function Hero({
    eyebrow,
    heading,
    description,
    primaryAction,
    secondaryAction,
    note,
    visual,
}: HeroProps) {
    return (
        <section className="paka-section">
            <div
                className={cn(
                    'paka-container grid items-center gap-14 lg:gap-20',
                    visual && 'lg:grid-cols-2',
                )}
            >
                <div className="flex max-w-3xl min-w-0 flex-col items-start gap-7">
                    {eyebrow && (
                        <p className="paka-eyebrow flex items-center gap-2.5">
                            <span
                                className="size-2 shrink-0 rounded-full bg-primary"
                                aria-hidden="true"
                            />
                            {eyebrow}
                        </p>
                    )}
                    <h1 className="paka-hero-heading">{heading}</h1>
                    {description && (
                        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                            {description}
                        </p>
                    )}
                    <div className="flex max-w-full flex-wrap gap-3">
                        <BlockAction action={primaryAction} />
                        {secondaryAction && (
                            <BlockAction action={secondaryAction} secondary />
                        )}
                    </div>
                    {note && (
                        <p className="text-sm text-muted-foreground">{note}</p>
                    )}
                </div>
                {visual && (
                    <figure className="paka-hero-visual relative min-w-0 rounded-[calc(var(--radius)*1.6)] bg-muted p-5 sm:p-8">
                        <div className="relative flex flex-col gap-7 rounded-xl border border-border bg-card p-5 shadow-xl shadow-foreground/5 sm:p-7">
                            <div className="flex flex-col gap-3 border-b border-border pb-6">
                                <p className="paka-eyebrow text-muted-foreground">
                                    {visual.label}
                                </p>
                                <p className="text-2xl font-medium tracking-tight">
                                    {visual.title}
                                </p>
                            </div>
                            <ol className="flex flex-col gap-3">
                                {visual.items.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3 rounded-lg border border-border p-4"
                                    >
                                        <HugeiconsIcon
                                            icon={CheckmarkCircle02Icon}
                                            className="mt-0.5 size-5 shrink-0 text-primary"
                                            aria-hidden="true"
                                        />
                                        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                                            <p className="font-medium">
                                                {item.title}
                                            </p>
                                            {item.description && (
                                                <p className="text-sm leading-relaxed text-muted-foreground">
                                                    {item.description}
                                                </p>
                                            )}
                                            {item.tag && (
                                                <p className="text-xs font-medium text-primary">
                                                    {item.tag}
                                                </p>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                            {visual.metric && (
                                <div className="flex flex-wrap items-center gap-4 rounded-lg bg-accent p-5 text-accent-foreground">
                                    <p className="text-4xl font-medium tracking-tight">
                                        {visual.metric.value}
                                    </p>
                                    <p className="max-w-44 text-sm leading-relaxed">
                                        {visual.metric.label}
                                    </p>
                                </div>
                            )}
                        </div>
                        {visual.caption && (
                            <figcaption className="relative pt-5 text-center text-xs leading-relaxed text-muted-foreground">
                                {visual.caption}
                            </figcaption>
                        )}
                    </figure>
                )}
            </div>
        </section>
    );
}
