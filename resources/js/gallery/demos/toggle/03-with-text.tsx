import { Bookmark01Icon, PinIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState } from 'react';
import { Toggle } from '@/components/ui/toggle';

export const meta = {
    name: 'With icon and text',
    description: 'Controlled toggles whose label reflects the pressed state.',
    height: 'compact',
};

export default function ToggleWithTextDemo() {
    const [pinned, setPinned] = useState(true);
    const [saved, setSaved] = useState(false);

    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <Toggle
                variant="outline"
                pressed={pinned}
                onPressedChange={setPinned}
                aria-label="Pin workspace"
            >
                <HugeiconsIcon icon={PinIcon} data-icon="inline-start" />
                {pinned ? 'Pinned' : 'Pin to sidebar'}
            </Toggle>
            <Toggle
                variant="outline"
                pressed={saved}
                onPressedChange={setSaved}
                aria-label="Save deployment"
            >
                <HugeiconsIcon icon={Bookmark01Icon} data-icon="inline-start" />
                {saved ? 'Saved' : 'Save'}
            </Toggle>
        </div>
    );
}
