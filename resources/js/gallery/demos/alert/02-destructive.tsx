import { Alert02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const meta = {
    name: 'Destructive',
    description:
        'Use the destructive variant for failures that need attention.',
};

export default function AlertDestructiveDemo() {
    return (
        <Alert variant="destructive" className="max-w-md">
            <HugeiconsIcon icon={Alert02Icon} />
            <AlertTitle>Payment failed</AlertTitle>
            <AlertDescription>
                We couldn't charge the Visa ending 4242. Update your card to
                keep the workspace active.
            </AlertDescription>
        </Alert>
    );
}
