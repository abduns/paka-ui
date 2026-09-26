import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export const meta = {
    name: 'With label',
    description: 'A select wrapped in a field with a label and helper text.',
};

export default function SelectWithLabelDemo() {
    return (
        <div className="w-full max-w-sm">
            <Field>
                <FieldLabel htmlFor="billing-cycle">Billing cycle</FieldLabel>
                <Select defaultValue="monthly">
                    <SelectTrigger id="billing-cycle" className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="yearly">
                                Yearly (save 20%)
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <FieldDescription>
                    Changes apply at the start of your next invoice.
                </FieldDescription>
            </Field>
        </div>
    );
}
