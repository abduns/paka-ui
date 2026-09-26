import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from '@/components/ui/input-group';
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from '@/components/ui/popover';

export const meta = {
    name: 'Form',
    description: 'A small form that saves and closes.',
};

export default function PopoverFormDemo() {
    const [open, setOpen] = useState(false);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const limit = new FormData(event.currentTarget).get('limit');

        toast.success(`Spend limit set to $${limit}`);
        setOpen(false);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger render={<Button variant="outline" />}>
                Set spend limit
            </PopoverTrigger>
            <PopoverContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <PopoverHeader>
                        <PopoverTitle>Monthly spend limit</PopoverTitle>
                        <PopoverDescription>
                            Deployments pause when usage reaches this amount.
                        </PopoverDescription>
                    </PopoverHeader>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="spend-limit">Limit</FieldLabel>
                            <InputGroup>
                                <InputGroupAddon>
                                    <InputGroupText>$</InputGroupText>
                                </InputGroupAddon>
                                <InputGroupInput
                                    id="spend-limit"
                                    name="limit"
                                    placeholder="0"
                                    type="number"
                                    min={0}
                                    step={50}
                                    defaultValue={500}
                                />
                            </InputGroup>
                            <FieldDescription>
                                Current usage this month: $212.40
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}
