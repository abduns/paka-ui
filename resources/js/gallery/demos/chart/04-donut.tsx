import { Label, Pie, PieChart } from 'recharts';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';

export const meta = {
    name: 'Donut',
    description: 'Seats by plan with a total in the centre.',
};

const data = [
    { plan: 'team', seats: 412, fill: 'var(--color-team)' },
    { plan: 'business', seats: 268, fill: 'var(--color-business)' },
    { plan: 'enterprise', seats: 156, fill: 'var(--color-enterprise)' },
    { plan: 'free', seats: 94, fill: 'var(--color-free)' },
];

const config = {
    seats: { label: 'Seats' },
    team: { label: 'Team', color: 'var(--chart-1)' },
    business: { label: 'Business', color: 'var(--chart-2)' },
    enterprise: { label: 'Enterprise', color: 'var(--chart-3)' },
    free: { label: 'Free', color: 'var(--chart-4)' },
} satisfies ChartConfig;

const total = data.reduce((sum, item) => sum + item.seats, 0);

export default function ChartDonutDemo() {
    return (
        <ChartContainer config={config} className="aspect-square h-60">
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                    data={data}
                    dataKey="seats"
                    nameKey="plan"
                    innerRadius={64}
                    strokeWidth={4}
                >
                    <Label
                        content={({ viewBox }) => {
                            if (
                                !viewBox ||
                                !('cx' in viewBox) ||
                                !('cy' in viewBox)
                            ) {
                                return null;
                            }

                            return (
                                <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                >
                                    <tspan
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        className="fill-foreground text-2xl font-medium"
                                    >
                                        {total.toLocaleString()}
                                    </tspan>
                                    <tspan
                                        x={viewBox.cx}
                                        y={(viewBox.cy ?? 0) + 22}
                                        className="fill-muted-foreground"
                                    >
                                        Seats
                                    </tspan>
                                </text>
                            );
                        }}
                    />
                </Pie>
            </PieChart>
        </ChartContainer>
    );
}
