import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandShortcut,
} from '@/components/ui/command';
import { Kbd, KbdGroup } from '@/components/ui/kbd';

export const meta = {
    name: 'Dialog',
    description: 'A command palette opened with a button or ⌘K.',
};

export default function CommandDialogDemo() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                setOpen((current) => !current);
            }
        }

        document.addEventListener('keydown', onKeyDown);

        return () => document.removeEventListener('keydown', onKeyDown);
    }, []);

    return (
        <>
            <Button variant="outline" onClick={() => setOpen(true)}>
                Open palette
                <KbdGroup className="ml-1">
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                </KbdGroup>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search…" />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Actions">
                        <CommandItem onSelect={() => setOpen(false)}>
                            New invoice
                            <CommandShortcut>⌘N</CommandShortcut>
                        </CommandItem>
                        <CommandItem onSelect={() => setOpen(false)}>
                            Invite member
                            <CommandShortcut>⌘I</CommandShortcut>
                        </CommandItem>
                        <CommandItem onSelect={() => setOpen(false)}>
                            Deploy to production
                            <CommandShortcut>⌘⇧D</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                    <CommandGroup heading="Workspaces">
                        <CommandItem onSelect={() => setOpen(false)}>
                            Acme Design
                        </CommandItem>
                        <CommandItem onSelect={() => setOpen(false)}>
                            Acme Marketing
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
