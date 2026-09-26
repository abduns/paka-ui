import { Copy01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '@/components/ui/input-group';
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from '@/components/ui/popover';

export const meta = {
    name: 'Default',
    description: 'A header with a title, description, and content.',
};

export default function PopoverDefaultDemo() {
    return (
        <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
                Share invoice
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader>
                    <PopoverTitle>Share link</PopoverTitle>
                    <PopoverDescription>
                        Anyone with the link can view and pay this invoice.
                    </PopoverDescription>
                </PopoverHeader>
                <InputGroup>
                    <InputGroupInput
                        readOnly
                        placeholder="Share link"
                        defaultValue="https://pay.paka.app/i/1042"
                        aria-label="Share link"
                    />
                    <InputGroupAddon align="inline-end">
                        <InputGroupButton
                            size="icon-xs"
                            aria-label="Copy link"
                            onClick={() => toast.success('Link copied')}
                        >
                            <HugeiconsIcon icon={Copy01Icon} />
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </PopoverContent>
        </Popover>
    );
}
