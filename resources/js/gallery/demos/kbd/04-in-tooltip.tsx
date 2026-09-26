import { Delete02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import { Kbd } from '@/components/ui/kbd';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

export const meta = {
    name: 'In a tooltip',
    description: 'Show the shortcut alongside the tooltip label.',
    height: 'compact',
};

export default function KbdInTooltipDemo() {
    return (
        <Tooltip>
            <TooltipTrigger
                render={<Button variant="outline" size="icon" />}
                aria-label="Delete invoice"
            >
                <HugeiconsIcon icon={Delete02Icon} />
            </TooltipTrigger>
            <TooltipContent>
                Delete invoice
                <Kbd>⌘⌫</Kbd>
            </TooltipContent>
        </Tooltip>
    );
}
