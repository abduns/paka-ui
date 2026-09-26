import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { Calendar } from '@/components/ui/calendar';

export const meta = {
    name: 'Range',
    description: 'Select a start and end date for a billing period.',
    height: 'tall',
};

export default function CalendarRangeDemo() {
    const [range, setRange] = useState<DateRange | undefined>({
        from: new Date(2026, 8, 3),
        to: new Date(2026, 8, 17),
    });

    return (
        <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            defaultMonth={range?.from}
            numberOfMonths={2}
            className="rounded-lg border"
        />
    );
}
