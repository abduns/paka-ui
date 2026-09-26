import { Checkbox } from '@/components/ui/checkbox';
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field';

export const meta = {
    name: 'Fieldset',
    description: 'A legend grouping several checkbox fields.',
};

const channels = [
    {
        id: 'deploy-failed',
        label: 'Failed deployments',
        description: 'Get notified the moment a deployment fails.',
        defaultChecked: true,
    },
    {
        id: 'invoice-paid',
        label: 'Invoice paid',
        description: 'When a customer settles an invoice.',
        defaultChecked: true,
    },
    {
        id: 'weekly-digest',
        label: 'Weekly digest',
        description: 'A summary of workspace activity every Monday.',
        defaultChecked: false,
    },
];

export default function FieldFieldsetDemo() {
    return (
        <div className="w-full max-w-sm">
            <FieldSet>
                <FieldLegend>Email notifications</FieldLegend>
                <FieldDescription>
                    Choose what lands in your inbox.
                </FieldDescription>
                <FieldGroup data-slot="checkbox-group">
                    {channels.map((channel) => (
                        <Field key={channel.id} orientation="horizontal">
                            <Checkbox
                                id={channel.id}
                                defaultChecked={channel.defaultChecked}
                            />
                            <FieldContent>
                                <FieldLabel htmlFor={channel.id}>
                                    {channel.label}
                                </FieldLabel>
                                <FieldDescription>
                                    {channel.description}
                                </FieldDescription>
                            </FieldContent>
                        </Field>
                    ))}
                </FieldGroup>
            </FieldSet>
        </div>
    );
}
