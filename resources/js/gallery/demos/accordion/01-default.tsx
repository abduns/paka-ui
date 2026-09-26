import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export const meta = {
    name: 'Default',
    description: 'One section open at a time, with the first expanded.',
};

export default function AccordionDefaultDemo() {
    return (
        <Accordion defaultValue={['billing']} className="w-full max-w-sm">
            <AccordionItem value="billing">
                <AccordionTrigger>How does billing work?</AccordionTrigger>
                <AccordionContent>
                    Paka bills each workspace monthly for the seats in use.
                    Invoices are emailed to the billing contact on the 1st.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="seats">
                <AccordionTrigger>Can I add seats mid-cycle?</AccordionTrigger>
                <AccordionContent>
                    Yes. New members are prorated for the remainder of the cycle
                    and appear on your next invoice.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="cancel">
                <AccordionTrigger>What happens when I cancel?</AccordionTrigger>
                <AccordionContent>
                    Your workspace stays active until the end of the paid
                    period. Data is kept for 30 days before deletion.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
