import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

export const meta = {
    name: 'Auto-grow',
    description:
        'Grows with its content via field-sizing, capped by a max height.',
};

export default function TextareaAutoGrowDemo() {
    return (
        <div className="w-full max-w-sm">
            <Field>
                <FieldLabel htmlFor="changelog">Changelog</FieldLabel>
                <Textarea
                    id="changelog"
                    placeholder="What changed?"
                    className="field-sizing-content max-h-40"
                    defaultValue={
                        '- Fixed webhook retries for failed invoices\n- Added EU West region\n- Faster cold starts for preview deployments'
                    }
                />
                <FieldDescription>
                    Keep typing and the box expands with you.
                </FieldDescription>
            </Field>
        </div>
    );
}
