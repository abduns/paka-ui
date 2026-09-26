import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const meta = {
    name: 'Cards',
    description: 'Selectable cards with a title and description.',
};

const plans = [
    {
        value: 'starter',
        title: 'Starter',
        description: '1 workspace, 3 members, 10 deployments a month.',
        price: 'Free',
    },
    {
        value: 'pro',
        title: 'Pro',
        description: 'Unlimited deployments, previews, and invoices.',
        price: '$29/mo',
    },
    {
        value: 'enterprise',
        title: 'Enterprise',
        description: 'SSO, audit logs, and a dedicated region.',
        price: 'Custom',
    },
];

export default function RadioGroupCardsDemo() {
    return (
        <RadioGroup defaultValue="pro" className="w-full max-w-sm">
            {plans.map((plan) => (
                <FieldLabel key={plan.value} htmlFor={`plan-${plan.value}`}>
                    <Field orientation="horizontal">
                        <FieldContent>
                            <FieldTitle>
                                {plan.title}
                                <span className="ml-auto font-normal text-muted-foreground">
                                    {plan.price}
                                </span>
                            </FieldTitle>
                            <FieldDescription>
                                {plan.description}
                            </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem
                            value={plan.value}
                            id={`plan-${plan.value}`}
                        />
                    </Field>
                </FieldLabel>
            ))}
        </RadioGroup>
    );
}
