import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

export const meta = {
    name: 'Right',
    description: 'A detail panel that slides in from the right edge.',
};

export default function SheetRightDemo() {
    return (
        <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>
                View deployment
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Deployment #4821</SheetTitle>
                    <SheetDescription>
                        Triggered by a push to main 12 minutes ago.
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-3 px-4">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <Badge variant="success">Ready</Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                            Environment
                        </span>
                        <span>Production</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Region</span>
                        <span>EU West</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span>1m 42s</span>
                    </div>
                </div>
                <SheetFooter>
                    <Button>Redeploy</Button>
                    <SheetClose render={<Button variant="outline" />}>
                        Close
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
