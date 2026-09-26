import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldLabel } from '@/components/ui/field';

export const meta = {
    name: 'Disabled',
    description: 'Disabled in both unchecked and checked states.',
};

export default function CheckboxDisabledDemo() {
    return (
        <div className="flex flex-col gap-3">
            <Field orientation="horizontal" data-disabled="true">
                <Checkbox id="sso-required" disabled />
                <FieldLabel htmlFor="sso-required">
                    Require single sign-on
                </FieldLabel>
            </Field>
            <Field orientation="horizontal" data-disabled="true">
                <Checkbox id="two-factor" disabled defaultChecked />
                <FieldLabel htmlFor="two-factor">
                    Two-factor authentication enforced
                </FieldLabel>
            </Field>
        </div>
    );
}
