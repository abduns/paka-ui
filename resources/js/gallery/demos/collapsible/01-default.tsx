import { ArrowDown01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';

export const meta = {
    name: 'Default',
    description: 'Reveal the rest of a list behind a trigger.',
};

const rows = ['acme-design', 'acme-marketing', 'acme-docs'];
const hidden = ['acme-internal', 'acme-sandbox', 'acme-legacy'];

export default function CollapsibleDefaultDemo() {
    return (
        <Collapsible className="flex w-full max-w-xs flex-col gap-2">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Workspaces</span>
                <CollapsibleTrigger
                    render={<Button variant="ghost" size="sm" />}
                    className="group/trigger"
                >
                    Show all
                    <HugeiconsIcon
                        icon={ArrowDown01Icon}
                        data-icon="inline-end"
                        className="transition-transform group-aria-expanded/trigger:rotate-180"
                    />
                </CollapsibleTrigger>
            </div>
            {rows.map((row) => (
                <div
                    key={row}
                    className="rounded-md border px-3 py-2 font-mono text-sm"
                >
                    {row}
                </div>
            ))}
            <CollapsibleContent className="flex flex-col gap-2">
                {hidden.map((row) => (
                    <div
                        key={row}
                        className="rounded-md border px-3 py-2 font-mono text-sm"
                    >
                        {row}
                    </div>
                ))}
            </CollapsibleContent>
        </Collapsible>
    );
}
