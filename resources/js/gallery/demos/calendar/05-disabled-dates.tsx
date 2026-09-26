import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';

export const meta = {
    name: 'Disabled dates',
    description: 'Block weekends and past days when scheduling a deployment.',
    height: 'tall',
};

const today = new Date(2026, 8, 14);

export default function CalendarDisabledDatesDemo() {
    const [date, setDate] = useState<Date | undefined>(new Date(2026, 8, 16));

    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={today}
            disabled={[{ before: today }, { dayOfWeek: [0, 6] }]}
            className="rounded-lg border"
        />
    );
}
