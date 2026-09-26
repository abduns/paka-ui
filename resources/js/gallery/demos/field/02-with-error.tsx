import { useState } from 'react';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export const meta = {
    name: 'With error',
    description: 'Validation state driven by data-invalid and aria-invalid.',
};

export default function FieldWithErrorDemo() {
    const [slug, setSlug] = useState('Acme Inc');
    const isValid = /^[a-z0-9-]+$/.test(slug);

    return (
        <div className="w-full max-w-sm">
            <Field data-invalid={!isValid}>
                <FieldLabel htmlFor="workspace-slug">Workspace URL</FieldLabel>
                <Input
                    id="workspace-slug"
                    placeholder="acme"
                    value={slug}
                    onChange={(event) => setSlug(event.target.value)}
                    aria-invalid={!isValid}
                />
                <FieldDescription>
                    Lowercase letters, numbers, and dashes only.
                </FieldDescription>
                {!isValid && (
                    <FieldError>
                        Use only lowercase letters, numbers, and dashes.
                    </FieldError>
                )}
            </Field>
        </div>
    );
}
