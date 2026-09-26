import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
} from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';

export const meta = {
    name: 'With label and description',
    description: 'A horizontal field with helper text beside the switch.',
};

export default function SwitchWithDescriptionDemo() {
    return (
        <div className="w-full max-w-sm">
            <Field orientation="horizontal">
                <FieldContent>
                    <FieldLabel htmlFor="weekly-digest">
                        Weekly digest
                    </FieldLabel>
                    <FieldDescription>
                        A summary of deployments and spend every Monday.
                    </FieldDescription>
                </FieldContent>
                <Switch id="weekly-digest" defaultChecked />
            </Field>
        </div>
    );
}
