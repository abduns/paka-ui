import {
    CreditCardIcon,
    Notification03Icon,
    UserGroupIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export const meta = {
    name: 'With icons',
    description: 'Triggers with a leading icon and a short subtitle.',
};

export default function AccordionWithIconsDemo() {
    return (
        <Accordion className="w-full max-w-sm">
            <AccordionItem value="members">
                <AccordionTrigger className="items-center">
                    <span className="flex items-center gap-3">
                        <HugeiconsIcon
                            icon={UserGroupIcon}
                            className="size-4 text-muted-foreground"
                        />
                        <span className="flex flex-col gap-0.5">
                            Members
                            <span className="text-xs font-normal text-muted-foreground">
                                12 active · 2 invited
                            </span>
                        </span>
                    </span>
                </AccordionTrigger>
                <AccordionContent>
                    Manage who has access to this workspace and their roles.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="billing">
                <AccordionTrigger className="items-center">
                    <span className="flex items-center gap-3">
                        <HugeiconsIcon
                            icon={CreditCardIcon}
                            className="size-4 text-muted-foreground"
                        />
                        <span className="flex flex-col gap-0.5">
                            Billing
                            <span className="text-xs font-normal text-muted-foreground">
                                Team plan · Visa ending 4242
                            </span>
                        </span>
                    </span>
                </AccordionTrigger>
                <AccordionContent>
                    Update your payment method or download past invoices.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="notifications">
                <AccordionTrigger className="items-center">
                    <span className="flex items-center gap-3">
                        <HugeiconsIcon
                            icon={Notification03Icon}
                            className="size-4 text-muted-foreground"
                        />
                        <span className="flex flex-col gap-0.5">
                            Notifications
                            <span className="text-xs font-normal text-muted-foreground">
                                Email and Slack
                            </span>
                        </span>
                    </span>
                </AccordionTrigger>
                <AccordionContent>
                    Decide which deployment and billing events notify you.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
