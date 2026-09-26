import {
    Archive01Icon,
    Copy01Icon,
    Delete02Icon,
    Download01Icon,
    PlusSignIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const meta = {
    name: 'Basic',
    description: 'Grouped items with icons and keyboard shortcuts.',
};

export default function DropdownMenuBasicDemo() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
                Invoice actions
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Invoice #1042</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <HugeiconsIcon icon={PlusSignIcon} />
                        New invoice
                        <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <HugeiconsIcon icon={Copy01Icon} />
                        Duplicate
                        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <HugeiconsIcon icon={Download01Icon} />
                        Export PDF
                        <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <HugeiconsIcon icon={Archive01Icon} />
                        Archive
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                        <HugeiconsIcon icon={Delete02Icon} />
                        Delete
                        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
