import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export const meta = {
    name: 'Default',
    description: 'A switch paired with a clickable label.',
    height: 'compact',
};

export default function SwitchDefaultDemo() {
    return (
        <div className="flex items-center gap-2">
            <Switch id="auto-deploy" defaultChecked />
            <Label htmlFor="auto-deploy">Auto-deploy on push</Label>
        </div>
    );
}
