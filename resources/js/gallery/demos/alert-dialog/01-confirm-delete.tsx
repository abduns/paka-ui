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
    name: 'Confirm delete',
    description: 'A destructive confirmation with cancel and confirm actions.',
};

export default function AlertDialogConfirmDeleteDemo() {
    return (
        <AlertDialog>
            <AlertDialogTrigger render={<Button variant="destructive" />}>
                Delete workspace
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete "Acme Design"?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This permanently removes the workspace, its 14 projects,
                        and all deployments. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive">
                        Delete workspace
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
