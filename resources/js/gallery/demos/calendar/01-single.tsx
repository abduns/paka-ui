import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';

export const meta = {
    name: 'Single',
    description: 'Pick one date, such as an invoice due date.',
    height: 'tall',
};

export default function CalendarSingleDemo() {
    const [date, setDate] = useState<Date | undefined>(new Date(2026, 8, 17));

    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
            className="rounded-lg border"
        />
    );
}
