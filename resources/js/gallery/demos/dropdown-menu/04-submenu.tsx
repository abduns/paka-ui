import {
    FolderOpenIcon,
    Link01Icon,
    Mail01Icon,
    Share01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const meta = {
    name: 'Submenu',
    description: 'Nested menus for moving and sharing.',
};

const workspaces = ['Acme Production', 'Acme Staging', 'Personal'];

export default function DropdownMenuSubmenuDemo() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
                Deployment options
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
                <DropdownMenuGroup>
                    <DropdownMenuItem>View logs</DropdownMenuItem>
                    <DropdownMenuItem>Redeploy</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <HugeiconsIcon icon={FolderOpenIcon} />
                            Move to workspace
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuGroup>
                                {workspaces.map((workspace) => (
                                    <DropdownMenuItem
                                        key={workspace}
                                        onClick={() =>
                                            toast.success(
                                                `Moved to ${workspace}`,
                                            )
                                        }
                                    >
                                        {workspace}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuGroup>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <HugeiconsIcon icon={Share01Icon} />
                            Share
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <HugeiconsIcon icon={Link01Icon} />
                                    Copy link
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <HugeiconsIcon icon={Mail01Icon} />
                                    Email to team
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
