import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

export const meta = {
    name: 'Basic',
    description:
        'A confirmation dialog with a title, description, and actions.',
};

export default function DialogBasicDemo() {
    return (
        <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
                Archive workspace
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Archive this workspace?</DialogTitle>
                    <DialogDescription>
                        Members lose access until it is restored. Billing pauses
                        at the end of the current cycle.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline" />}>
                        Cancel
                    </DialogClose>
                    <DialogClose render={<Button variant="destructive" />}>
                        Archive
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
