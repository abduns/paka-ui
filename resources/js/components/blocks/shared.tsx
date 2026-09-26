import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import type { ActionProps } from '@/registry/schemas';

export function BlockAction({
    action,
    secondary = false,
}: {
    action: ActionProps;
    secondary?: boolean;
}) {
    return (
        <Button
            render={<a href={action.href} />}
            nativeButton={false}
            variant={secondary ? 'outline' : 'default'}
            size="lg"
            className="h-auto min-h-12 max-w-full px-5 py-3 whitespace-normal"
        >
            <span>{action.label}</span>
            {!secondary && (
                <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    data-icon="inline-end"
                    aria-hidden="true"
                />
            )}
        </Button>
    );
}

export function SectionHeading({
    eyebrow,
    heading,
    description,
}: {
    eyebrow?: string;
    heading: string;
    description?: string;
}) {
    return (
        <div className="flex max-w-2xl flex-col gap-5">
            {eyebrow && <p className="paka-eyebrow">{eyebrow}</p>}
            <h2 className="paka-heading">{heading}</h2>
            {description && (
                <p className="text-lg leading-relaxed text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    );
}

export function Brand({ name, href }: { name: string; href: string }) {
    return (
        <a
            href={href}
            className="inline-flex min-w-0 items-center gap-2.5 text-xl font-semibold tracking-tight"
        >
            <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"
            >
                ✳
            </span>
            <span>{name}</span>
        </a>
    );
}
