import {
    CreditCardIcon,
    Logout01Icon,
    Settings01Icon,
    UserGroupIcon,
    UserIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
    name: 'Account',
    description: 'An avatar trigger with an account header.',
};

export default function DropdownMenuAccountDemo() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={<Button variant="ghost" size="icon" />}
                aria-label="Account menu"
            >
                <Avatar>
                    <AvatarFallback>MK</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="flex items-center gap-3 font-normal">
                        <Avatar>
                            <AvatarFallback>MK</AvatarFallback>
                        </Avatar>
                        <div className="flex min-w-0 flex-col">
                            <span className="truncate text-sm font-medium text-foreground">
                                Maria Kim
                            </span>
                            <span className="truncate text-xs">
                                maria@acme.com
                            </span>
                        </div>
                    </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <HugeiconsIcon icon={UserIcon} />
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <HugeiconsIcon icon={CreditCardIcon} />
                        Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <HugeiconsIcon icon={UserGroupIcon} />
                        Members
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <HugeiconsIcon icon={Settings01Icon} />
                        Settings
                        <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <HugeiconsIcon icon={Logout01Icon} />
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
