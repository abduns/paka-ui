import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const meta = {
    name: 'Disabled',
    description: 'Disable a single option or the whole group.',
};

export default function RadioGroupDisabledDemo() {
    return (
        <div className="flex flex-wrap justify-center gap-12">
            <RadioGroup defaultValue="eu-west" className="w-fit">
                <Label>
                    <RadioGroupItem value="eu-west" />
                    EU West
                </Label>
                <Label>
                    <RadioGroupItem value="us-east" />
                    US East
                </Label>
                <Label className="text-muted-foreground">
                    <RadioGroupItem value="ap-south" disabled />
                    AP South
                    <Badge variant="secondary">Soon</Badge>
                </Label>
            </RadioGroup>
            <RadioGroup defaultValue="eu-west" disabled className="w-fit">
                <Label>
                    <RadioGroupItem value="eu-west" />
                    EU West
                </Label>
                <Label>
                    <RadioGroupItem value="us-east" />
                    US East
                </Label>
                <Label>
                    <RadioGroupItem value="ap-south" />
                    AP South
                </Label>
            </RadioGroup>
        </div>
    );
}
