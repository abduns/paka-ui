import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const meta = {
    name: 'Disabled',
    description: 'The label dims with its disabled peer.',
};

export default function LabelDisabledDemo() {
    return (
        <div className="flex w-full max-w-sm flex-col-reverse gap-2">
            <Input
                id="label-plan"
                className="peer"
                placeholder="Plan"
                disabled
                defaultValue="Enterprise"
            />
            <Label htmlFor="label-plan">Plan (managed by billing)</Label>
        </div>
    );
}
