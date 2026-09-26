import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';

export const meta = {
    name: 'Bar',
    description: 'Deployments per day for the past week.',
};

const data = [
    { day: 'Mon', deployments: 18 },
    { day: 'Tue', deployments: 24 },
    { day: 'Wed', deployments: 31 },
    { day: 'Thu', deployments: 22 },
    { day: 'Fri', deployments: 27 },
    { day: 'Sat', deployments: 6 },
    { day: 'Sun', deployments: 4 },
];

const config = {
    deployments: { label: 'Deployments', color: 'var(--chart-2)' },
} satisfies ChartConfig;

export default function ChartBarDemo() {
    return (
        <ChartContainer
            config={config}
            className="aspect-auto h-56 w-full max-w-md"
        >
            <BarChart data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                    dataKey="deployments"
                    fill="var(--color-deployments)"
                    radius={6}
                />
            </BarChart>
        </ChartContainer>
    );
}
