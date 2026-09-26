import { PlusSignIcon, Rocket01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';

export const meta = {
    name: 'With action',
    description:
        'Give the user a next step with primary and secondary actions.',
};

export default function EmptyWithActionDemo() {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <HugeiconsIcon icon={Rocket01Icon} />
                </EmptyMedia>
                <EmptyTitle>No deployments</EmptyTitle>
                <EmptyDescription>
                    Connect a repository or push a build to create your first
                    deployment.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <div className="flex flex-wrap justify-center gap-2">
                    <Button>
                        <HugeiconsIcon
                            icon={PlusSignIcon}
                            data-icon="inline-start"
                        />
                        New deployment
                    </Button>
                    <Button variant="outline">Read the docs</Button>
                </div>
            </EmptyContent>
        </Empty>
    );
}
