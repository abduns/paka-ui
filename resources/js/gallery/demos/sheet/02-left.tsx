import {
    Analytics01Icon,
    CreditCardIcon,
    Home01Icon,
    Menu01Icon,
    Rocket01Icon,
    Settings02Icon,
    UserMultipleIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

const links = [
    { label: 'Overview', icon: Home01Icon },
    { label: 'Deployments', icon: Rocket01Icon },
    { label: 'Analytics', icon: Analytics01Icon },
    { label: 'Members', icon: UserMultipleIcon },
    { label: 'Billing', icon: CreditCardIcon },
    { label: 'Settings', icon: Settings02Icon },
];

export const meta = {
    name: 'Left',
    description: 'A navigation drawer that slides in from the left edge.',
};

export default function SheetLeftDemo() {
    return (
        <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>
                <HugeiconsIcon icon={Menu01Icon} data-icon="inline-start" />
                Menu
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Acme Inc.</SheetTitle>
                    <SheetDescription>Production workspace</SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-2">
                    {links.map((link) => (
                        <Button
                            key={link.label}
                            variant="ghost"
                            className="justify-start"
                        >
                            <HugeiconsIcon
                                icon={link.icon}
                                data-icon="inline-start"
                            />
                            {link.label}
                        </Button>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
