import { useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export const meta = {
    name: 'Controlled',
    description: 'Expand or collapse every section from outside the accordion.',
};

const sections = [
    {
        value: 'invoice',
        title: 'Invoice #1042',
        body: 'Issued 3 Sep · Due 17 Sep · $1,240.00',
    },
    {
        value: 'invoice-2',
        title: 'Invoice #1041',
        body: 'Issued 3 Aug · Paid 12 Aug · $1,240.00',
    },
    {
        value: 'invoice-3',
        title: 'Invoice #1040',
        body: 'Issued 3 Jul · Paid 9 Jul · $980.00',
    },
];

export default function AccordionControlledDemo() {
    const [open, setOpen] = useState<string[]>(['invoice']);

    return (
        <div className="flex w-full max-w-sm flex-col gap-3">
            <div className="flex justify-end gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setOpen(sections.map((s) => s.value))}
                >
                    Expand all
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setOpen([])}>
                    Collapse all
                </Button>
            </div>
            <Accordion multiple value={open} onValueChange={setOpen}>
                {sections.map((section) => (
                    <AccordionItem key={section.value} value={section.value}>
                        <AccordionTrigger>{section.title}</AccordionTrigger>
                        <AccordionContent>{section.body}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
