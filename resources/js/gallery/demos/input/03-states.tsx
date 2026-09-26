import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export const meta = {
    name: 'States',
    description: 'Disabled, read-only, and invalid inputs.',
};

export default function InputStatesDemo() {
    return (
        <div className="flex w-full max-w-sm flex-col gap-5">
            <Field>
                <FieldLabel htmlFor="input-disabled">Disabled</FieldLabel>
                <Input
                    id="input-disabled"
                    placeholder="Environment"
                    disabled
                    defaultValue="acme-production"
                />
            </Field>
            <Field>
                <FieldLabel htmlFor="input-readonly">Read only</FieldLabel>
                <Input
                    id="input-readonly"
                    placeholder="Workspace ID"
                    readOnly
                    defaultValue="ws_9f2a41c8"
                />
            </Field>
            <Field data-invalid>
                <FieldLabel htmlFor="input-invalid">Invalid</FieldLabel>
                <Input
                    id="input-invalid"
                    placeholder="name@company.com"
                    aria-invalid
                    defaultValue="maria@acme"
                />
                <FieldError>Enter a valid email address.</FieldError>
            </Field>
        </div>
    );
}
