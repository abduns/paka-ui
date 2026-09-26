import { SectionHeading } from '@/components/blocks/shared';
import type { TestimonialsProps } from '@/registry/schemas';

export function Testimonials({
    eyebrow,
    heading,
    description,
    items,
}: TestimonialsProps) {
    return (
        <section className="paka-section">
            <div className="paka-container flex flex-col gap-12">
                <SectionHeading
                    eyebrow={eyebrow}
                    heading={heading}
                    description={description}
                />
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item, index) => (
                        <figure
                            key={index}
                            className="flex min-w-0 flex-col items-start gap-7 border-t border-border pt-7"
                        >
                            <span
                                className="text-5xl leading-none text-primary"
                                aria-hidden="true"
                            >
                                “
                            </span>
                            <blockquote className="flex-1 text-lg leading-relaxed">
                                {item.quote}
                            </blockquote>
                            <figcaption className="flex items-center gap-3">
                                <span
                                    aria-hidden="true"
                                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold"
                                >
                                    {item.name
                                        .split(/\s+/)
                                        .slice(0, 2)
                                        .map((part) => Array.from(part)[0])
                                        .join('')}
                                </span>
                                <span className="flex flex-col gap-1 text-sm">
                                    <span className="font-semibold">
                                        {item.name}
                                    </span>
                                    {item.role && (
                                        <span className="text-muted-foreground">
                                            {item.role}
                                        </span>
                                    )}
                                </span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
