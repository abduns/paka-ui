import { Notification01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';

export const meta = {
    name: 'Settings',
    description: 'Quick toggles anchored to an icon button.',
};

const settings = [
    {
        id: 'notify-deploys',
        label: 'Deployments',
        description: 'Success and failure alerts.',
        defaultChecked: true,
    },
    {
        id: 'notify-invoices',
        label: 'Invoices',
        description: 'Payments and overdue reminders.',
        defaultChecked: true,
    },
    {
        id: 'notify-mentions',
        label: 'Mentions',
        description: 'When a teammate mentions you.',
        defaultChecked: false,
    },
];

export default function PopoverSettingsDemo() {
    return (
        <Popover>
            <PopoverTrigger
                render={<Button variant="outline" size="icon" />}
                aria-label="Notification settings"
            >
                <HugeiconsIcon icon={Notification01Icon} />
            </PopoverTrigger>
            <PopoverContent align="end">
                <PopoverHeader>
                    <PopoverTitle>Notifications</PopoverTitle>
                    <PopoverDescription>
                        Choose what Paka pings you about.
                    </PopoverDescription>
                </PopoverHeader>
                <FieldGroup className="gap-4">
                    {settings.map((setting) => (
                        <Field key={setting.id} orientation="horizontal">
                            <FieldContent>
                                <FieldLabel htmlFor={setting.id}>
                                    {setting.label}
                                </FieldLabel>
                                <FieldDescription>
                                    {setting.description}
                                </FieldDescription>
                            </FieldContent>
                            <Switch
                                id={setting.id}
                                size="sm"
                                defaultChecked={setting.defaultChecked}
                            />
                        </Field>
                    ))}
                </FieldGroup>
            </PopoverContent>
        </Popover>
    );
}
