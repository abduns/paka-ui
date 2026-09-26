import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export const meta = {
    name: 'Stats',
    description: 'A metric with trend badge in the header action slot.',
};

export default function CardStatsDemo() {
    return (
        <Card className="w-full max-w-xs">
            <CardHeader>
                <CardDescription>Monthly recurring revenue</CardDescription>
                <CardTitle className="text-2xl tabular-nums">$48,290</CardTitle>
                <CardAction>
                    <Badge variant="success">
                        <HugeiconsIcon
                            icon={ArrowUpRight01Icon}
                            data-icon="inline-start"
                        />
                        12.4%
                    </Badge>
                </CardAction>
            </CardHeader>
            <CardContent className="text-muted-foreground">
                Up $5,320 from last month. 38 new paid workspaces.
            </CardContent>
        </Card>
    );
}
