import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export const meta = {
    name: 'With label',
    description: 'Pair the input with a label via Field.',
};

export default function InputWithLabelDemo() {
    return (
        <div className="w-full max-w-sm">
            <Field>
                <FieldLabel htmlFor="billing-email">Billing email</FieldLabel>
                <Input
                    id="billing-email"
                    type="email"
                    placeholder="billing@acme.com"
                />
            </Field>
        </div>
    );
}
