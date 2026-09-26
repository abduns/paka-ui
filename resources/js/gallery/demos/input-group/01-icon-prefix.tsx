import { Search01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';

export const meta = {
    name: 'Icon prefix',
    description: 'A leading icon inside the input border.',
};

export default function InputGroupIconPrefixDemo() {
    return (
        <div className="w-full max-w-sm">
            <InputGroup>
                <InputGroupAddon>
                    <HugeiconsIcon icon={Search01Icon} />
                </InputGroupAddon>
                <InputGroupInput placeholder="Search invoices" />
            </InputGroup>
        </div>
    );
}
