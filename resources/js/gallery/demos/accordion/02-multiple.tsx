import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export const meta = {
    name: 'Multiple open',
    description: 'Allow several sections to stay expanded together.',
};

export default function AccordionMultipleDemo() {
    return (
        <Accordion
            multiple
            defaultValue={['members', 'deployments']}
            className="w-full max-w-sm"
        >
            <AccordionItem value="members">
                <AccordionTrigger>Members</AccordionTrigger>
                <AccordionContent>
                    Invite teammates by email and assign them a role. Owners can
                    manage billing; admins can manage projects.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="deployments">
                <AccordionTrigger>Deployments</AccordionTrigger>
                <AccordionContent>
                    Every push to a connected branch creates a preview
                    deployment with its own URL.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="notifications">
                <AccordionTrigger>Notifications</AccordionTrigger>
                <AccordionContent>
                    Choose which events reach you by email, Slack, or in-app.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
