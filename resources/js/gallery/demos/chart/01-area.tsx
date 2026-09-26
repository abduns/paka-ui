import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';

export const meta = {
    name: 'Area',
    description: 'Monthly recurring revenue as a filled area.',
};

const data = [
    { month: 'Apr', mrr: 31200 },
    { month: 'May', mrr: 33800 },
    { month: 'Jun', mrr: 36100 },
    { month: 'Jul', mrr: 39400 },
    { month: 'Aug', mrr: 42970 },
    { month: 'Sep', mrr: 48290 },
];

const config = {
    mrr: { label: 'MRR', color: 'var(--chart-1)' },
} satisfies ChartConfig;

export default function ChartAreaDemo() {
    return (
        <ChartContainer
            config={config}
            className="aspect-auto h-56 w-full max-w-md"
        >
            <AreaChart data={data} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                    dataKey="mrr"
                    type="natural"
                    fill="var(--color-mrr)"
                    fillOpacity={0.3}
                    stroke="var(--color-mrr)"
                />
            </AreaChart>
        </ChartContainer>
    );
}
