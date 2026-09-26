import { UserAdd01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';

export const meta = {
    name: 'In a card',
    description: 'An empty state inside a card with a dashed border.',
};

export default function EmptyInCardDemo() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Members</CardTitle>
                <CardDescription>People with access to Acme.</CardDescription>
            </CardHeader>
            <CardContent>
                <Empty className="rounded-lg border border-dashed border-border p-8">
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <HugeiconsIcon icon={UserAdd01Icon} />
                        </EmptyMedia>
                        <EmptyTitle className="text-base">
                            Just you so far
                        </EmptyTitle>
                        <EmptyDescription>
                            Invite teammates to collaborate on invoices and
                            deployments.
                        </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                        <Button size="sm">Invite member</Button>
                    </EmptyContent>
                </Empty>
            </CardContent>
        </Card>
    );
}
