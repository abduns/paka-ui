import { ArrowDown01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import {
    ButtonGroup,
    ButtonGroupSeparator,
} from '@/components/ui/button-group';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const meta = {
    name: 'Split button',
    description: 'A primary action with a dropdown of alternatives.',
};

export default function ButtonGroupSplitDemo() {
    return (
        <ButtonGroup>
            <Button>Deploy to production</Button>
            <ButtonGroupSeparator />
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <Button size="icon" aria-label="More deploy options" />
                    }
                >
                    <HugeiconsIcon icon={ArrowDown01Icon} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Deploy to staging</DropdownMenuItem>
                    <DropdownMenuItem>Create preview</DropdownMenuItem>
                    <DropdownMenuItem>Schedule deploy</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </ButtonGroup>
    );
}
