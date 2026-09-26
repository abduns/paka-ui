import { Tick02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export const meta = {
    name: 'Pricing',
    description: 'A plan card with price, feature list, and call to action.',
};

const features = [
    'Unlimited projects',
    'Preview deployments',
    'Up to 10 members',
    'Email and Slack notifications',
];

export default function CardPricingDemo() {
    return (
        <Card className="w-full max-w-xs">
            <CardHeader>
                <CardTitle>Team</CardTitle>
                <CardDescription>For growing product teams.</CardDescription>
                <CardAction>
                    <Badge variant="info">Popular</Badge>
                </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <p className="flex items-baseline gap-1">
                    <span className="font-heading text-3xl font-medium">
                        $24
                    </span>
                    <span className="text-muted-foreground">
                        / seat / month
                    </span>
                </p>
                <ul className="flex flex-col gap-2">
                    {features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                            <HugeiconsIcon
                                icon={Tick02Icon}
                                strokeWidth={2}
                                className="size-4 text-success"
                            />
                            {feature}
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Start free trial</Button>
            </CardFooter>
        </Card>
    );
}
