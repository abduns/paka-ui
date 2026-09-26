import {
    Copy01Icon,
    Delete02Icon,
    Download01Icon,
    Edit03Icon,
    Share01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const meta = {
    name: 'Vertical in a toolbar',
    description: 'Vertical dividers separating groups of toolbar actions.',
};

export default function SeparatorVerticalToolbarDemo() {
    return (
        <div className="flex items-center gap-1 rounded-md border border-border p-1">
            <Button variant="ghost" size="sm">
                <HugeiconsIcon icon={Edit03Icon} data-icon="inline-start" />
                Edit
            </Button>
            <Button variant="ghost" size="sm">
                <HugeiconsIcon icon={Copy01Icon} data-icon="inline-start" />
                Duplicate
            </Button>
            <Separator
                orientation="vertical"
                className="mx-1 h-5 self-center"
            />
            <Button variant="ghost" size="icon-sm" aria-label="Download">
                <HugeiconsIcon icon={Download01Icon} />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Share">
                <HugeiconsIcon icon={Share01Icon} />
            </Button>
            <Separator
                orientation="vertical"
                className="mx-1 h-5 self-center"
            />
            <Button variant="ghost" size="icon-sm" aria-label="Delete">
                <HugeiconsIcon icon={Delete02Icon} />
            </Button>
        </div>
    );
}
