import { Search01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState } from 'react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';

export const meta = {
    name: 'Empty state',
    description: 'A richer empty state when the search has no matches.',
};

export default function CommandEmptyDemo() {
    const [query, setQuery] = useState('zzz');

    return (
        <Command className="w-full max-w-sm rounded-lg border">
            <CommandInput
                placeholder="Search projects…"
                value={query}
                onValueChange={setQuery}
            />
            <CommandList>
                <CommandEmpty className="p-0">
                    <Empty className="p-6">
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <HugeiconsIcon icon={Search01Icon} />
                            </EmptyMedia>
                            <EmptyTitle className="text-base">
                                No projects found
                            </EmptyTitle>
                            <EmptyDescription>
                                Try a different name or create a new project.
                            </EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                </CommandEmpty>
                <CommandGroup heading="Projects">
                    <CommandItem>Marketing site</CommandItem>
                    <CommandItem>Billing service</CommandItem>
                    <CommandItem>Docs</CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>
    );
}
