import { TextItalicIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Toggle } from '@/components/ui/toggle';

export const meta = {
    name: 'Outline',
    description: 'The bordered variant, unpressed and pressed.',
    height: 'compact',
};

export default function ToggleOutlineDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <Toggle variant="outline" aria-label="Toggle italic">
                <HugeiconsIcon icon={TextItalicIcon} />
            </Toggle>
            <Toggle variant="outline" aria-label="Toggle italic" defaultPressed>
                <HugeiconsIcon icon={TextItalicIcon} />
            </Toggle>
        </div>
    );
}
