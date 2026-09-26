import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export const meta = {
    name: 'Disabled and invalid',
    description: 'A locked select next to one with a validation error.',
};

export default function SelectStatesDemo() {
    return (
        <div className="flex w-full max-w-sm flex-col gap-6">
            <Field>
                <FieldLabel htmlFor="plan">Plan</FieldLabel>
                <Select defaultValue="team" disabled>
                    <SelectTrigger id="plan" className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="free">Free</SelectItem>
                            <SelectItem value="team">Team</SelectItem>
                            <SelectItem value="enterprise">
                                Enterprise
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>
            <Field data-invalid>
                <FieldLabel htmlFor="region">Region</FieldLabel>
                <Select>
                    <SelectTrigger id="region" className="w-full" aria-invalid>
                        <SelectValue placeholder="Select a region" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="us-east">US East</SelectItem>
                            <SelectItem value="eu-west">EU West</SelectItem>
                            <SelectItem value="ap-south">
                                Asia Pacific South
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <FieldError>Pick a region before deploying.</FieldError>
            </Field>
        </div>
    );
}
