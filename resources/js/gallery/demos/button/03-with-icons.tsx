import {
    Add01Icon,
    ArrowRight01Icon,
    Download04Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';

export const meta = {
    name: 'With icons',
    description: 'Leading and trailing icons using the data-icon attribute.',
};

export default function ButtonWithIconsDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <Button>
                <HugeiconsIcon icon={Add01Icon} data-icon="inline-start" />
                New invoice
            </Button>
            <Button variant="outline">
                <HugeiconsIcon icon={Download04Icon} data-icon="inline-start" />
                Export
            </Button>
            <Button variant="ghost">
                Continue
                <HugeiconsIcon icon={ArrowRight01Icon} data-icon="inline-end" />
            </Button>
        </div>
    );
}
