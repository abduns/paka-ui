import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';

export const meta = {
    name: 'Horizontal bar',
    description: 'Ranked workspaces by deployment count.',
};

const data = [
    { workspace: 'Acme Design', deployments: 214 },
    { workspace: 'Globex', deployments: 176 },
    { workspace: 'Initech', deployments: 131 },
    { workspace: 'Umbrella', deployments: 98 },
    { workspace: 'Hooli', deployments: 64 },
];

const config = {
    deployments: { label: 'Deployments', color: 'var(--chart-2)' },
} satisfies ChartConfig;

export default function ChartHorizontalBarDemo() {
    return (
        <ChartContainer
            config={config}
            className="aspect-auto h-56 w-full max-w-md"
        >
            <BarChart
                data={data}
                layout="vertical"
                margin={{ left: 8, right: 8 }}
            >
                <XAxis type="number" hide />
                <YAxis
                    dataKey="workspace"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    width={88}
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
