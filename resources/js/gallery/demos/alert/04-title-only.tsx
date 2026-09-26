import { CheckmarkCircle02Icon, Clock01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Alert, AlertTitle } from '@/components/ui/alert';

export const meta = {
    name: 'Title only',
    description: 'Compact one-line alerts for short status updates.',
};

export default function AlertTitleOnlyDemo() {
    return (
        <div className="flex w-full max-w-md flex-col gap-3">
            <Alert>
                <HugeiconsIcon icon={CheckmarkCircle02Icon} />
                <AlertTitle>
                    Invoice #1042 was sent to billing@acme.co
                </AlertTitle>
            </Alert>
            <Alert>
                <HugeiconsIcon icon={Clock01Icon} />
                <AlertTitle>Your trial ends in 6 days</AlertTitle>
            </Alert>
        </div>
    );
}
