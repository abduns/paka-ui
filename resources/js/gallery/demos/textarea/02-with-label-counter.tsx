import { useState } from 'react';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

const maxLength = 160;

export const meta = {
    name: 'With label and counter',
    description: 'A field whose helper text counts remaining characters.',
};

export default function TextareaWithLabelCounterDemo() {
    const [note, setNote] = useState('Rotate the API key before Friday.');

    return (
        <div className="w-full max-w-sm">
            <Field>
                <FieldLabel htmlFor="deploy-note">Deployment note</FieldLabel>
                <Textarea
                    id="deploy-note"
                    placeholder="What changed in this release?"
                    value={note}
                    maxLength={maxLength}
                    onChange={(event) => setNote(event.target.value)}
                />
                <FieldDescription className="flex justify-between">
                    <span>Shown to members in the activity feed.</span>
                    <span className="tabular-nums">
                        {note.length}/{maxLength}
                    </span>
                </FieldDescription>
            </Field>
        </div>
    );
}
