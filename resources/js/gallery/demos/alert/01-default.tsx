import { InformationCircleIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const meta = {
    name: 'Default',
    description: 'An informational alert with an icon, title, and description.',
};

export default function AlertDefaultDemo() {
    return (
        <Alert className="max-w-md">
            <HugeiconsIcon icon={InformationCircleIcon} />
            <AlertTitle>Scheduled maintenance</AlertTitle>
            <AlertDescription>
                Paka will be read-only on Saturday from 02:00 to 02:30 UTC while
                we upgrade the database.
            </AlertDescription>
        </Alert>
    );
}
