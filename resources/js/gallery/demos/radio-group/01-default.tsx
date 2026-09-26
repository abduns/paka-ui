import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const meta = {
    name: 'Default',
    description: 'A vertical list of labeled options.',
};

const plans = [
    { value: 'starter', label: 'Starter' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise' },
];

export default function RadioGroupDefaultDemo() {
    return (
        <RadioGroup defaultValue="pro" className="w-fit">
            {plans.map((plan) => (
                <Label key={plan.value}>
                    <RadioGroupItem value={plan.value} />
                    {plan.label}
                </Label>
            ))}
        </RadioGroup>
    );
}
