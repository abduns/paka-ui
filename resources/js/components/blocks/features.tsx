import { SectionHeading } from '@/components/blocks/shared';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import type { FeaturesProps } from '@/registry/schemas';

export function Features({
    eyebrow,
    heading,
    description,
    items,
}: FeaturesProps) {
    return (
        <section className="paka-section border-y border-border bg-muted">
            <div className="paka-container flex flex-col gap-12">
                <SectionHeading
                    eyebrow={eyebrow}
                    heading={heading}
                    description={description}
                />
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item, index) => (
                        <Card key={index} className="min-w-0 gap-8 p-7">
                            <div
                                aria-hidden="true"
                                className="flex size-11 items-center justify-center rounded-lg bg-accent text-sm font-semibold text-accent-foreground"
                            >
                                {String(index + 1).padStart(2, '0')}
                            </div>
                            <CardHeader className="gap-3 p-0">
                                <CardTitle>
                                    <h3>{item.title}</h3>
                                </CardTitle>
                                <CardDescription>
                                    <p className="text-base leading-relaxed">
                                        {item.description}
                                    </p>
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
