import { BlockAction, SectionHeading } from '@/components/blocks/shared';
import type { CtaProps } from '@/registry/schemas';

export function Cta({
    eyebrow,
    heading,
    description,
    primaryAction,
    secondaryAction,
    note,
}: CtaProps) {
    return (
        <section className="paka-container pb-(--paka-section)">
            <div className="grid items-center gap-10 rounded-[calc(var(--radius)*1.5)] border border-border bg-accent p-7 sm:p-12 lg:grid-cols-[1fr_auto] lg:p-16">
                <SectionHeading
                    eyebrow={eyebrow}
                    heading={heading}
                    description={description}
                />
                <div className="flex max-w-sm min-w-0 flex-col items-start gap-4">
                    <BlockAction action={primaryAction} />
                    {secondaryAction && (
                        <BlockAction action={secondaryAction} secondary />
                    )}
                    {note && (
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            {note}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
