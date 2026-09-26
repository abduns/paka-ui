import { TextUnderlineIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Toggle } from '@/components/ui/toggle';

export const meta = {
    name: 'Sizes',
    description: 'Small, default, and large toggles side by side.',
    height: 'compact',
};

export default function ToggleSizesDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <Toggle size="sm" variant="outline" aria-label="Toggle underline">
                <HugeiconsIcon icon={TextUnderlineIcon} />
            </Toggle>
            <Toggle variant="outline" aria-label="Toggle underline">
                <HugeiconsIcon icon={TextUnderlineIcon} />
            </Toggle>
            <Toggle size="lg" variant="outline" aria-label="Toggle underline">
                <HugeiconsIcon icon={TextUnderlineIcon} />
            </Toggle>
        </div>
    );
}
