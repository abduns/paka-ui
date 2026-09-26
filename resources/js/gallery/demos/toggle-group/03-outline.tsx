import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const ranges = [
    { value: '24h', label: '24h' },
    { value: '7d', label: '7d' },
    { value: '30d', label: '30d' },
    { value: '90d', label: '90d' },
];

export const meta = {
    name: 'Outline',
    description: 'A joined, bordered group used as a date range picker.',
    height: 'compact',
};

export default function ToggleGroupOutlineDemo() {
    const [range, setRange] = useState(['7d']);

    return (
        <div className="flex flex-col items-center gap-3">
            <ToggleGroup
                variant="outline"
                spacing={0}
                value={range}
                onValueChange={(value) => {
                    if (value.length > 0) {
                        setRange(value);
                    }
                }}
                aria-label="Date range"
            >
                {ranges.map((option) => (
                    <ToggleGroupItem key={option.value} value={option.value}>
                        {option.label}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
            <p className="text-sm text-muted-foreground">
                Showing deployments from the last {range[0]}.
            </p>
        </div>
    );
}
