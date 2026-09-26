import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

export const meta = {
    name: 'Disabled item',
    description: 'A section that cannot be opened until a plan is upgraded.',
};

export default function AccordionDisabledDemo() {
    return (
        <Accordion className="w-full max-w-sm">
            <AccordionItem value="general">
                <AccordionTrigger>General</AccordionTrigger>
                <AccordionContent>
                    Workspace name, URL slug, and default time zone.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="security">
                <AccordionTrigger>Security</AccordionTrigger>
                <AccordionContent>
                    Two-factor enforcement and session length for all members.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sso" disabled>
                <AccordionTrigger>
                    <span className="flex items-center gap-2">
                        Single sign-on
                        <Badge variant="secondary">Enterprise</Badge>
                    </span>
                </AccordionTrigger>
                <AccordionContent>
                    Connect your identity provider with SAML or OIDC.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
