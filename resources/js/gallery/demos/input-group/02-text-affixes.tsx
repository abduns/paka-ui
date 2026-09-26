import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from '@/components/ui/input-group';

export const meta = {
    name: 'Text affixes',
    description: 'Static text before or after the value.',
};

export default function InputGroupTextAffixesDemo() {
    return (
        <div className="flex w-full max-w-sm flex-col gap-3">
            <InputGroup>
                <InputGroupInput placeholder="acme" />
                <InputGroupAddon align="inline-end">
                    <InputGroupText>.paka.app</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>
                    <InputGroupText>$</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                    type="number"
                    placeholder="500"
                    min={0}
                    step={50}
                />
                <InputGroupAddon align="inline-end">
                    <InputGroupText>USD / month</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        </div>
    );
}
