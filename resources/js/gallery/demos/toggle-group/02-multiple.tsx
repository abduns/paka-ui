import {
    TextBoldIcon,
    TextItalicIcon,
    TextUnderlineIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export const meta = {
    name: 'Multiple',
    description: 'Any combination of items can be pressed together.',
    height: 'compact',
};

export default function ToggleGroupMultipleDemo() {
    return (
        <ToggleGroup
            multiple
            defaultValue={['bold', 'italic']}
            aria-label="Text formatting"
        >
            <ToggleGroupItem value="bold" aria-label="Bold">
                <HugeiconsIcon icon={TextBoldIcon} />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
                <HugeiconsIcon icon={TextItalicIcon} />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
                <HugeiconsIcon icon={TextUnderlineIcon} />
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
