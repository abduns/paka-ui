import {
    CreditCardIcon,
    Invoice01Icon,
    Rocket01Icon,
    Settings01Icon,
    UserGroupIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';

export const meta = {
    name: 'Default',
    description: 'An inline palette with grouped, filterable commands.',
    height: 'tall',
};

export default function CommandDefaultDemo() {
    return (
        <Command className="w-full max-w-sm rounded-lg border">
            <CommandInput placeholder="Search commands…" />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Go to">
                    <CommandItem>
                        <HugeiconsIcon icon={Rocket01Icon} />
                        Deployments
                    </CommandItem>
                    <CommandItem>
                        <HugeiconsIcon icon={Invoice01Icon} />
                        Invoices
                    </CommandItem>
                    <CommandItem>
                        <HugeiconsIcon icon={UserGroupIcon} />
                        Members
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                    <CommandItem>
                        <HugeiconsIcon icon={CreditCardIcon} />
                        Billing
                    </CommandItem>
                    <CommandItem>
                        <HugeiconsIcon icon={Settings01Icon} />
                        Workspace settings
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>
    );
}
