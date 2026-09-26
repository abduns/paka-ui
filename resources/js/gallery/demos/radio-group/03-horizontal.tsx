import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const meta = {
    name: 'Horizontal',
    description: 'Options laid out in a row that wraps when narrow.',
    height: 'compact',
};

const cycles = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
];

export default function RadioGroupHorizontalDemo() {
    const [cycle, setCycle] = useState('monthly');

    return (
        <div className="flex flex-col items-center gap-3">
            <RadioGroup
                value={cycle}
                onValueChange={setCycle}
                aria-label="Billing cycle"
                className="flex w-auto flex-wrap justify-center gap-6"
            >
                {cycles.map((option) => (
                    <Label key={option.value}>
                        <RadioGroupItem value={option.value} />
                        {option.label}
                    </Label>
                ))}
            </RadioGroup>
            <p className="text-xs text-muted-foreground">
                Invoices are sent {cycle}.
            </p>
        </div>
    );
}
