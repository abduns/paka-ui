import { useState } from 'react';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export const meta = {
    name: 'Controlled',
    description: 'Open state held in React, with a toast after confirming.',
};

export default function AlertDialogControlledDemo() {
    const [open, setOpen] = useState(false);

    function handleConfirm() {
        setOpen(false);
        toast.success('Invoice #1042 was voided');
    }

    return (
        <>
            <Button variant="outline" onClick={() => setOpen(true)}>
                Void invoice
            </Button>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Void invoice #1042?</AlertDialogTitle>
                        <AlertDialogDescription>
                            The customer will be notified and the $1,240.00
                            balance will no longer be collectable.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirm}>
                            Void invoice
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
