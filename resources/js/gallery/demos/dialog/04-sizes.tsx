import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

export const meta = {
    name: 'Sizes',
    description: 'Override the width of the dialog for the content it holds.',
};

const sizes = [
    { label: 'Small', className: 'w-80' },
    { label: 'Default', className: '' },
    { label: 'Large', className: 'w-full sm:max-w-2xl' },
];

export default function DialogSizesDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            {sizes.map((size) => (
                <Dialog key={size.label}>
                    <DialogTrigger render={<Button variant="outline" />}>
                        {size.label}
                    </DialogTrigger>
                    <DialogContent className={size.className}>
                        <DialogHeader>
                            <DialogTitle>{size.label} dialog</DialogTitle>
                            <DialogDescription>
                                Pass a width class to DialogContent to fit the
                                content inside.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter showCloseButton />
                    </DialogContent>
                </Dialog>
            ))}
        </div>
    );
}
