import { TextBoldIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Toggle } from '@/components/ui/toggle';

export const meta = {
    name: 'Default',
    description: 'A two-state button, shown unpressed and pressed.',
    height: 'compact',
};

export default function ToggleDefaultDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <Toggle aria-label="Toggle bold">
                <HugeiconsIcon icon={TextBoldIcon} />
            </Toggle>
            <Toggle aria-label="Toggle bold" defaultPressed>
                <HugeiconsIcon icon={TextBoldIcon} />
            </Toggle>
        </div>
    );
}
