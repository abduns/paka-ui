import { Checkbox } from '@/components/ui/checkbox';
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldTitle,
} from '@/components/ui/field';

export const meta = {
    name: 'Choice cards',
    description: 'Wrap a Field in its label to make the whole card clickable.',
};

const addons = [
    {
        id: 'previews',
        title: 'Preview deployments',
        description: 'A live URL for every pull request.',
    },
    {
        id: 'audit-log',
        title: 'Audit log',
        description: 'Track every change made in the workspace.',
    },
];

export default function CheckboxCardsDemo() {
    return (
        <FieldGroup className="w-full max-w-sm gap-3">
            {addons.map((addon) => (
                <FieldLabel key={addon.id} htmlFor={`addon-${addon.id}`}>
                    <Field orientation="horizontal">
                        <FieldContent>
                            <FieldTitle>{addon.title}</FieldTitle>
                            <FieldDescription>
                                {addon.description}
                            </FieldDescription>
                        </FieldContent>
                        <Checkbox id={`addon-${addon.id}`} />
                    </Field>
                </FieldLabel>
            ))}
        </FieldGroup>
    );
}
