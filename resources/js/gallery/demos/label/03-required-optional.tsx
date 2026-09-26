import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const meta = {
    name: 'Required and optional',
    description: 'Mark which fields the form needs.',
};

export default function LabelRequiredOptionalDemo() {
    return (
        <div className="flex w-full max-w-sm flex-col gap-5">
            <div className="flex flex-col gap-2">
                <Label htmlFor="label-company">
                    Company name
                    <span aria-hidden className="text-destructive">
                        *
                    </span>
                </Label>
                <Input id="label-company" placeholder="Acme Inc" required />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="label-vat">
                    VAT number
                    <span className="font-normal text-muted-foreground">
                        (optional)
                    </span>
                </Label>
                <Input id="label-vat" placeholder="EU123456789" />
            </div>
        </div>
    );
}
