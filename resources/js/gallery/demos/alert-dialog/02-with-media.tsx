import { Delete02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export const meta = {
    name: 'With media',
    description: 'An icon tile beside the title using AlertDialogMedia.',
};

export default function AlertDialogWithMediaDemo() {
    return (
        <AlertDialog>
            <AlertDialogTrigger render={<Button variant="outline" />}>
                Remove member
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogMedia>
                        <HugeiconsIcon icon={Delete02Icon} />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Remove Priya Nair?</AlertDialogTitle>
                    <AlertDialogDescription>
                        She will lose access to all projects in this workspace
                        immediately. Her comments and commits are kept.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Keep member</AlertDialogCancel>
                    <AlertDialogAction variant="destructive">
                        Remove
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
