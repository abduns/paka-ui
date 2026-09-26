import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';

export const meta = {
    name: 'Month and year dropdowns',
    description:
        'Jump across years with dropdown captions, ideal for birthdays.',
    height: 'tall',
};

export default function CalendarDropdownDemo() {
    const [date, setDate] = useState<Date | undefined>(new Date(1994, 4, 21));

    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
            captionLayout="dropdown"
            startMonth={new Date(1950, 0)}
            endMonth={new Date(2026, 11)}
            className="rounded-lg border"
        />
    );
}
