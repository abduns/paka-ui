import { Invoice01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';

export const meta = {
    name: 'Default',
    description: 'An icon, a title, and a short explanation.',
};

export default function EmptyDefaultDemo() {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <HugeiconsIcon icon={Invoice01Icon} />
                </EmptyMedia>
                <EmptyTitle>No invoices yet</EmptyTitle>
                <EmptyDescription>
                    Invoices you send will show up here, along with their
                    payment status.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    );
}
