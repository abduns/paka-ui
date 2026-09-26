import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export const meta = {
    name: 'Text field',
    description: 'A label, an input, and a helpful description.',
};

export default function FieldTextFieldDemo() {
    return (
        <div className="w-full max-w-sm">
            <Field>
                <FieldLabel htmlFor="workspace-name">Workspace name</FieldLabel>
                <Input
                    id="workspace-name"
                    placeholder="Acme"
                    defaultValue="Acme"
                />
                <FieldDescription>
                    Shown in the sidebar and on invoices you send.
                </FieldDescription>
            </Field>
        </div>
    );
}
