import { useState } from 'react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';

export const meta = {
    name: 'With selection',
    description: 'Mark the active item with a check using data-checked.',
};

const timezones = [
    'UTC',
    'Europe/London',
    'Europe/Berlin',
    'America/New_York',
    'America/Los_Angeles',
    'Asia/Tokyo',
];

export default function CommandWithSelectionDemo() {
    const [selected, setSelected] = useState('Europe/Berlin');

    return (
        <div className="flex w-full max-w-sm flex-col gap-3">
            <Command className="rounded-lg border">
                <CommandInput placeholder="Search time zones…" />
                <CommandList>
                    <CommandEmpty>No time zone found.</CommandEmpty>
                    <CommandGroup heading="Time zone">
                        {timezones.map((timezone) => (
                            <CommandItem
                                key={timezone}
                                value={timezone}
                                data-checked={timezone === selected}
                                onSelect={setSelected}
                            >
                                {timezone}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
            <p className="text-center text-xs text-muted-foreground">
                Workspace time zone: {selected}
            </p>
        </div>
    );
}
