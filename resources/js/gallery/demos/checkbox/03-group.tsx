import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field';

export const meta = {
    name: 'Group',
    description: 'Several related options inside a fieldset.',
};

const channels = [
    { id: 'email', label: 'Email' },
    { id: 'slack', label: 'Slack' },
    { id: 'in-app', label: 'In-app' },
    { id: 'sms', label: 'SMS' },
];

export default function CheckboxGroupDemo() {
    const [selected, setSelected] = useState<string[]>(['email', 'in-app']);

    function toggle(id: string, checked: boolean) {
        setSelected((current) =>
            checked ? [...current, id] : current.filter((item) => item !== id),
        );
    }

    return (
        <FieldSet className="w-full max-w-xs">
            <FieldLegend variant="label">Notify me via</FieldLegend>
            <FieldDescription>
                Choose where billing alerts are delivered.
            </FieldDescription>
            <FieldGroup data-slot="checkbox-group">
                {channels.map((channel) => (
                    <Field key={channel.id} orientation="horizontal">
                        <Checkbox
                            id={`channel-${channel.id}`}
                            checked={selected.includes(channel.id)}
                            onCheckedChange={(checked) =>
                                toggle(channel.id, checked)
                            }
                        />
                        <FieldLabel htmlFor={`channel-${channel.id}`}>
                            {channel.label}
                        </FieldLabel>
                    </Field>
                ))}
            </FieldGroup>
        </FieldSet>
    );
}
