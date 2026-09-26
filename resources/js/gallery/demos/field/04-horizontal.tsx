import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';

export const meta = {
    name: 'Horizontal',
    description: 'Label and description beside the control.',
};

export default function FieldHorizontalDemo() {
    return (
        <div className="w-full max-w-sm">
            <FieldGroup>
                <Field orientation="horizontal">
                    <FieldContent>
                        <FieldLabel htmlFor="auto-deploy">
                            Auto-deploy on push
                        </FieldLabel>
                        <FieldDescription>
                            Deploy every commit to the main branch.
                        </FieldDescription>
                    </FieldContent>
                    <Switch id="auto-deploy" defaultChecked />
                </Field>
                <Field orientation="horizontal">
                    <FieldContent>
                        <FieldLabel htmlFor="preview-deploys">
                            Preview deployments
                        </FieldLabel>
                        <FieldDescription>
                            Create a preview URL for each pull request.
                        </FieldDescription>
                    </FieldContent>
                    <Switch id="preview-deploys" />
                </Field>
            </FieldGroup>
        </div>
    );
}
