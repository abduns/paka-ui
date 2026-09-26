import { Copy01Icon, SentIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { toast } from 'sonner';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '@/components/ui/input-group';

export const meta = {
    name: 'Button addon',
    description: 'An inline action such as copy or send.',
};

export default function InputGroupButtonAddonDemo() {
    return (
        <div className="flex w-full max-w-sm flex-col gap-3">
            <InputGroup>
                <InputGroupInput
                    readOnly
                    placeholder="API key"
                    defaultValue="pk_live_9f2a41c8e7b3"
                    aria-label="API key"
                />
                <InputGroupAddon align="inline-end">
                    <InputGroupButton
                        size="icon-xs"
                        aria-label="Copy API key"
                        onClick={() => toast.success('API key copied')}
                    >
                        <HugeiconsIcon icon={Copy01Icon} />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupInput placeholder="Invite by email" type="email" />
                <InputGroupAddon align="inline-end">
                    <InputGroupButton
                        variant="secondary"
                        onClick={() => toast.success('Invitation sent')}
                    >
                        <HugeiconsIcon icon={SentIcon} />
                        Send
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </div>
    );
}
