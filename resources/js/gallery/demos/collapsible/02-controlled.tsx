import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';

export const meta = {
    name: 'Controlled',
    description: 'Drive open state from React and change the trigger label.',
};

export default function CollapsibleControlledDemo() {
    const [open, setOpen] = useState(false);

    return (
        <Collapsible
            open={open}
            onOpenChange={setOpen}
            className="flex w-full max-w-sm flex-col gap-3 rounded-lg border p-4"
        >
            <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">Build log</span>
                    <span className="text-xs text-muted-foreground">
                        Deployment 4f2a1c · 42s
                    </span>
                </div>
                <CollapsibleTrigger
                    render={<Button variant="outline" size="sm" />}
                >
                    {open ? 'Hide log' : 'View log'}
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
                <pre className="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs text-muted-foreground">
                    {`$ bun install\n$ bun run build\n✓ 214 modules transformed\n✓ built in 38.2s`}
                </pre>
            </CollapsibleContent>
        </Collapsible>
    );
}
