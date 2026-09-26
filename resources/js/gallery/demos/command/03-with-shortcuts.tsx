import {
    Add01Icon,
    Notification03Icon,
    Search01Icon,
    UserAdd01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandShortcut,
} from '@/components/ui/command';

export const meta = {
    name: 'With shortcuts',
    description: 'Icons on the left and keyboard hints on the right.',
};

export default function CommandWithShortcutsDemo() {
    return (
        <Command className="w-full max-w-sm rounded-lg border">
            <CommandInput placeholder="What do you want to do?" />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Quick actions">
                    <CommandItem>
                        <HugeiconsIcon icon={Add01Icon} />
                        New invoice
                        <CommandShortcut>⌘N</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                        <HugeiconsIcon icon={UserAdd01Icon} />
                        Invite member
                        <CommandShortcut>⌘I</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                        <HugeiconsIcon icon={Search01Icon} />
                        Search deployments
                        <CommandShortcut>⌘F</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                        <HugeiconsIcon icon={Notification03Icon} />
                        Notification settings
                        <CommandShortcut>⌘,</CommandShortcut>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>
    );
}
