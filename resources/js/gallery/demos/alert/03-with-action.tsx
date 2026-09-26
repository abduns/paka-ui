import { Rocket01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Alert,
    AlertAction,
    AlertDescription,
    AlertTitle,
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export const meta = {
    name: 'With action',
    description: 'Place a button in the top-right corner with AlertAction.',
};

export default function AlertWithActionDemo() {
    return (
        <Alert className="max-w-md">
            <HugeiconsIcon icon={Rocket01Icon} />
            <AlertTitle>Deployment ready</AlertTitle>
            <AlertDescription>
                Build 4f2a1c passed all checks and is waiting for promotion.
            </AlertDescription>
            <AlertAction>
                <Button size="xs" variant="outline">
                    Promote
                </Button>
            </AlertAction>
        </Alert>
    );
}
