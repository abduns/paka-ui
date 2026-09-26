import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export const meta = {
    name: 'Disabled',
    description: 'Locked switches in both the off and on positions.',
    height: 'compact',
};

export default function SwitchDisabledDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
                <Switch id="sso" disabled />
                <Label htmlFor="sso">Enforce SSO</Label>
            </div>
            <div className="flex items-center gap-2">
                <Switch id="two-factor" disabled defaultChecked />
                <Label htmlFor="two-factor">Require 2FA</Label>
            </div>
        </div>
    );
}
