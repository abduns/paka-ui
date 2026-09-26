import { Search01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import { Kbd } from '@/components/ui/kbd';

export const meta = {
    name: 'Search with shortcut',
    description: 'A search box that advertises its keyboard shortcut.',
};

export default function InputGroupSearchKbdDemo() {
    return (
        <div className="w-full max-w-sm">
            <InputGroup>
                <InputGroupAddon>
                    <HugeiconsIcon icon={Search01Icon} />
                </InputGroupAddon>
                <InputGroupInput placeholder="Search deployments, members..." />
                <InputGroupAddon align="inline-end">
                    <Kbd>⌘K</Kbd>
                </InputGroupAddon>
            </InputGroup>
        </div>
    );
}
