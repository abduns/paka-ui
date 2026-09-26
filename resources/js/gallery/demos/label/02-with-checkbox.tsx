import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export const meta = {
    name: 'With checkbox',
    description: 'Clicking the label toggles the control.',
    height: 'compact',
};

export default function LabelWithCheckboxDemo() {
    return (
        <Label>
            <Checkbox defaultChecked />
            Remember this device for 30 days
        </Label>
    );
}
