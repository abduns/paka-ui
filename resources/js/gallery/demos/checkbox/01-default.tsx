import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldLabel } from '@/components/ui/field';

export const meta = {
    name: 'Default',
    description: 'A checkbox with a clickable label.',
};

export default function CheckboxDefaultDemo() {
    return (
        <Field orientation="horizontal" className="w-fit">
            <Checkbox id="remember-device" defaultChecked />
            <FieldLabel htmlFor="remember-device">
                Remember this device for 30 days
            </FieldLabel>
        </Field>
    );
}
