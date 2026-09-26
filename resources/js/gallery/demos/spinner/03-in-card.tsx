import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

export const meta = {
    name: 'In a card',
    description: 'A card body that waits on data with a centered spinner.',
};

export default function SpinnerInCardDemo() {
    return (
        <Card className="w-full max-w-xs">
            <CardHeader>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
                    <Spinner className="size-6" />
                    Syncing with Stripe…
                </div>
            </CardContent>
        </Card>
    );
}
