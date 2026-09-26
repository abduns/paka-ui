import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';

export const meta = {
    name: 'Multiple',
    description: 'Toggle several dates, like maintenance windows.',
    height: 'tall',
};

export default function CalendarMultipleDemo() {
    const [dates, setDates] = useState<Date[] | undefined>([
        new Date(2026, 8, 5),
        new Date(2026, 8, 12),
        new Date(2026, 8, 19),
    ]);

    return (
        <Calendar
            mode="multiple"
            selected={dates}
            onSelect={setDates}
            defaultMonth={new Date(2026, 8, 1)}
            className="rounded-lg border"
        />
    );
}
