import {
    Add01Icon,
    Link01Icon,
    Mail01Icon,
    Rocket01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

export const meta = {
    name: 'Bottom',
    description: 'A quick-actions tray that rises from the bottom edge.',
};

export default function SheetBottomDemo() {
    return (
        <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>
                <HugeiconsIcon icon={Add01Icon} data-icon="inline-start" />
                Quick actions
            </SheetTrigger>
            <SheetContent side="bottom">
                <SheetHeader>
                    <SheetTitle>Quick actions</SheetTitle>
                    <SheetDescription>
                        Common tasks for the Acme workspace.
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-wrap gap-2 px-4 pb-4">
                    <SheetClose render={<Button variant="secondary" />}>
                        <HugeiconsIcon
                            icon={Rocket01Icon}
                            data-icon="inline-start"
                        />
                        New deployment
                    </SheetClose>
                    <SheetClose render={<Button variant="secondary" />}>
                        <HugeiconsIcon
                            icon={Mail01Icon}
                            data-icon="inline-start"
                        />
                        Invite member
                    </SheetClose>
                    <SheetClose render={<Button variant="secondary" />}>
                        <HugeiconsIcon
                            icon={Link01Icon}
                            data-icon="inline-start"
                        />
                        Copy workspace link
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    );
}
