import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const meta = {
    name: 'Default',
    description: 'A label linked to an input with htmlFor.',
};

export default function LabelDefaultDemo() {
    return (
        <div className="flex w-full max-w-sm flex-col gap-2">
            <Label htmlFor="label-email">Email</Label>
            <Input id="label-email" type="email" placeholder="you@acme.com" />
        </div>
    );
}
