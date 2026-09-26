import { ArrowDown01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export const meta = {
    name: 'Advanced settings',
    description: 'A card section that expands to show less common fields.',
};

export default function CollapsibleCardSectionDemo() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Custom domain</CardTitle>
                <CardDescription>
                    Serve this project from your own domain.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Collapsible className="flex flex-col gap-4">
                    <Field>
                        <FieldLabel htmlFor="domain">Domain</FieldLabel>
                        <Input id="domain" placeholder="app.acme.co" />
                    </Field>
                    <CollapsibleTrigger
                        render={
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-fit"
                            />
                        }
                        className="group/trigger"
                    >
                        Advanced
                        <HugeiconsIcon
                            icon={ArrowDown01Icon}
                            data-icon="inline-end"
                            className="transition-transform group-aria-expanded/trigger:rotate-180"
                        />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="flex flex-col gap-4">
                        <Field>
                            <FieldLabel htmlFor="redirect">
                                Redirect from
                            </FieldLabel>
                            <Input id="redirect" placeholder="www.acme.co" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="ttl">
                                DNS TTL (seconds)
                            </FieldLabel>
                            <Input
                                id="ttl"
                                type="number"
                                placeholder="300"
                                defaultValue={300}
                            />
                        </Field>
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>
    );
}
