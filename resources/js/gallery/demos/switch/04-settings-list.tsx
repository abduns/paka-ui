import { useState } from 'react';
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
} from '@/components/ui/field';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

const settings = [
    {
        id: 'deploy-alerts',
        label: 'Deployment alerts',
        description: 'Notify me when a build fails or is rolled back.',
    },
    {
        id: 'billing-alerts',
        label: 'Billing alerts',
        description: 'Warn me before usage exceeds the plan limit.',
    },
    {
        id: 'member-activity',
        label: 'Member activity',
        description: 'Email me when someone joins or leaves the workspace.',
    },
];

export const meta = {
    name: 'Settings list',
    description: 'A notification settings list with controlled switches.',
};

export default function SwitchSettingsListDemo() {
    const [enabled, setEnabled] = useState<Record<string, boolean>>({
        'deploy-alerts': true,
        'billing-alerts': true,
        'member-activity': false,
    });

    return (
        <div className="flex w-full max-w-sm flex-col gap-4">
            {settings.map((setting, index) => (
                <div key={setting.id} className="flex flex-col gap-4">
                    {index > 0 && <Separator />}
                    <Field orientation="horizontal">
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
                            checked={enabled[setting.id] ?? false}
                            onCheckedChange={(checked) =>
                                setEnabled((current) => ({
                                    ...current,
                                    [setting.id]: checked,
                                }))
                            }
                        />
                    </Field>
                </div>
            ))}
        </div>
    );
}
