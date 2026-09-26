import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';

export const meta = {
    name: 'Line',
    description: 'Two series compared over six months with a legend.',
};

const data = [
    { month: 'Apr', invited: 42, joined: 31 },
    { month: 'May', invited: 58, joined: 44 },
    { month: 'Jun', invited: 51, joined: 47 },
    { month: 'Jul', invited: 73, joined: 59 },
    { month: 'Aug', invited: 69, joined: 61 },
    { month: 'Sep', invited: 88, joined: 74 },
];

const config = {
    invited: { label: 'Invited', color: 'var(--chart-1)' },
    joined: { label: 'Joined', color: 'var(--chart-2)' },
} satisfies ChartConfig;

export default function ChartLineDemo() {
    return (
        <ChartContainer
            config={config}
            className="aspect-auto h-60 w-full max-w-md"
        >
            <LineChart data={data} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                    dataKey="invited"
                    type="monotone"
                    stroke="var(--color-invited)"
                    strokeWidth={2}
                    dot={false}
                />
                <Line
                    dataKey="joined"
                    type="monotone"
                    stroke="var(--color-joined)"
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ChartContainer>
    );
}
