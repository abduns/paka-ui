import {
    TextAlignCenterIcon,
    TextAlignJustifyIcon,
    TextAlignLeftIcon,
    TextAlignRightIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export const meta = {
    name: 'Single',
    description: 'One item pressed at a time, like a text alignment picker.',
    height: 'compact',
};

export default function ToggleGroupSingleDemo() {
    return (
        <ToggleGroup defaultValue={['left']} aria-label="Text alignment">
            <ToggleGroupItem value="left" aria-label="Align left">
                <HugeiconsIcon icon={TextAlignLeftIcon} />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
                <HugeiconsIcon icon={TextAlignCenterIcon} />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
                <HugeiconsIcon icon={TextAlignRightIcon} />
            </ToggleGroupItem>
            <ToggleGroupItem value="justify" aria-label="Justify">
                <HugeiconsIcon icon={TextAlignJustifyIcon} />
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
