import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldLabel } from '@/components/ui/field';

export const meta = {
    name: 'Indeterminate',
    description: 'A parent checkbox that reflects a partially selected list.',
};

const members = ['Priya Nair', 'Marcus Kim', 'Lena Schulz'];

export default function CheckboxIndeterminateDemo() {
    const [checked, setChecked] = useState<string[]>([members[0]]);

    const allChecked = checked.length === members.length;
    const someChecked = checked.length > 0 && !allChecked;

    return (
        <div className="flex w-full max-w-xs flex-col gap-3">
            <Field orientation="horizontal">
                <Checkbox
                    id="select-all"
                    checked={allChecked}
                    indeterminate={someChecked}
                    onCheckedChange={(value) =>
                        setChecked(value ? [...members] : [])
                    }
                />
                <FieldLabel htmlFor="select-all">Select all members</FieldLabel>
            </Field>
            <div className="flex flex-col gap-3 border-l pl-6">
                {members.map((member) => (
                    <Field key={member} orientation="horizontal">
                        <Checkbox
                            id={member}
                            checked={checked.includes(member)}
                            onCheckedChange={(value) =>
                                setChecked((current) =>
                                    value
                                        ? [...current, member]
                                        : current.filter((m) => m !== member),
                                )
                            }
                        />
                        <FieldLabel htmlFor={member} className="font-normal">
                            {member}
                        </FieldLabel>
                    </Field>
                ))}
            </div>
        </div>
    );
}
