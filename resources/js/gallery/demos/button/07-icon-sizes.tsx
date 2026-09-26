import { Settings01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';

export const meta = {
    name: 'Icon sizes',
    description: 'Icon-only buttons in every square size.',
};

export default function ButtonIconSizesDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline" size="icon-xs" aria-label="Settings">
                <HugeiconsIcon icon={Settings01Icon} />
            </Button>
            <Button variant="outline" size="icon-sm" aria-label="Settings">
                <HugeiconsIcon icon={Settings01Icon} />
            </Button>
            <Button variant="outline" size="icon" aria-label="Settings">
                <HugeiconsIcon icon={Settings01Icon} />
            </Button>
            <Button variant="outline" size="icon-lg" aria-label="Settings">
                <HugeiconsIcon icon={Settings01Icon} />
            </Button>
        </div>
    );
}
