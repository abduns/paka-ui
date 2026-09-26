import { Search01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

export const meta = {
    name: 'With keyboard shortcut',
    description: 'A tooltip that shows the matching shortcut keys.',
    height: 'compact',
};

export default function TooltipWithKbdDemo() {
    return (
        <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
                <HugeiconsIcon icon={Search01Icon} data-icon="inline-start" />
                Search
            </TooltipTrigger>
            <TooltipContent>
                Search invoices
                <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                </KbdGroup>
            </TooltipContent>
        </Tooltip>
    );
}
