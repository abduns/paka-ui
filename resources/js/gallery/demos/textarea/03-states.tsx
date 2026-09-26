import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

export const meta = {
    name: 'Disabled and invalid',
    description: 'A read-only textarea next to one with a validation error.',
};

export default function TextareaStatesDemo() {
    return (
        <div className="flex w-full max-w-sm flex-col gap-6">
            <Field>
                <FieldLabel htmlFor="locked-note">Release notes</FieldLabel>
                <Textarea
                    id="locked-note"
                    placeholder="Release notes"
                    disabled
                    defaultValue="Locked while the deployment is in progress."
                />
            </Field>
            <Field data-invalid>
                <FieldLabel htmlFor="cancel-reason">
                    Reason for cancelling
                </FieldLabel>
                <Textarea
                    id="cancel-reason"
                    aria-invalid
                    placeholder="Tell us why you're leaving"
                />
                <FieldError>
                    A reason is required to cancel the plan.
                </FieldError>
            </Field>
        </div>
    );
}
