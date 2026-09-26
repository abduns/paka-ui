import { Checkbox } from '@/components/ui/checkbox';
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
} from '@/components/ui/field';

export const meta = {
    name: 'With description',
    description: 'Add helper text under the label with FieldContent.',
};

export default function CheckboxWithDescriptionDemo() {
    return (
        <Field orientation="horizontal" className="max-w-sm">
            <Checkbox id="deploy-notifications" />
            <FieldContent>
                <FieldLabel htmlFor="deploy-notifications">
                    Deployment notifications
                </FieldLabel>
                <FieldDescription>
                    Get an email when a production deployment succeeds or fails.
                </FieldDescription>
            </FieldContent>
        </Field>
    );
}
