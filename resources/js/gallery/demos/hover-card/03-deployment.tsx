import { Badge } from '@/components/ui/badge';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';

export const meta = {
    name: 'Deployment',
    description: 'A details table with a longer open delay on the trigger.',
};

const details = [
    ['Branch', 'main'],
    ['Commit', 'a41f9c2'],
    ['Duration', '1m 42s'],
    ['Region', 'eu-west-1'],
];

export default function HoverCardDeploymentDemo() {
    return (
        <HoverCard>
            <HoverCardTrigger
                delay={400}
                href="#"
                className="text-sm font-medium underline underline-offset-4"
            >
                Deployment #4821
            </HoverCardTrigger>
            <HoverCardContent side="top">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                        <span className="font-medium">#4821</span>
                        <Badge variant="success">Ready</Badge>
                    </div>
                    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs">
                        {details.map(([label, value]) => (
                            <div key={label} className="contents">
                                <dt className="text-muted-foreground">
                                    {label}
                                </dt>
                                <dd className="text-right font-mono">
                                    {value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
