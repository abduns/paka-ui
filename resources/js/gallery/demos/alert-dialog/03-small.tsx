import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export const meta = {
    name: 'Small',
    description: 'A compact, centered dialog with side-by-side actions.',
};

export default function AlertDialogSmallDemo() {
    return (
        <AlertDialog>
            <AlertDialogTrigger render={<Button variant="outline" />}>
                Cancel deployment
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogTitle>Cancel deployment?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Build 4f2a1c will stop and the previous version stays
                        live.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Keep running</AlertDialogCancel>
                    <AlertDialogAction>Cancel build</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
