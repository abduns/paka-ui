import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';

export const meta = {
    name: 'Stacked bar',
    description: 'Invoices by status, stacked per month.',
};

const data = [
    { month: 'Apr', paid: 42, pending: 9, overdue: 3 },
    { month: 'May', paid: 48, pending: 7, overdue: 2 },
    { month: 'Jun', paid: 51, pending: 11, overdue: 4 },
    { month: 'Jul', paid: 57, pending: 8, overdue: 1 },
    { month: 'Aug', paid: 61, pending: 12, overdue: 5 },
    { month: 'Sep', paid: 66, pending: 10, overdue: 2 },
];

const config = {
    paid: { label: 'Paid', color: 'var(--chart-1)' },
    pending: { label: 'Pending', color: 'var(--chart-3)' },
    overdue: { label: 'Overdue', color: 'var(--chart-5)' },
} satisfies ChartConfig;

export default function ChartStackedBarDemo() {
    return (
        <ChartContainer
            config={config}
            className="aspect-auto h-60 w-full max-w-md"
        >
            <BarChart data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                    dataKey="paid"
                    stackId="invoices"
                    fill="var(--color-paid)"
                    radius={[0, 0, 4, 4]}
                />
                <Bar
                    dataKey="pending"
                    stackId="invoices"
                    fill="var(--color-pending)"
                />
                <Bar
                    dataKey="overdue"
                    stackId="invoices"
                    fill="var(--color-overdue)"
                    radius={[4, 4, 0, 0]}
                />
            </BarChart>
        </ChartContainer>
    );
}
