import { Button } from '@/components/ui/button';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxTrigger,
    ComboboxValue,
} from '@/components/ui/combobox';

export const meta = {
    name: 'Button trigger',
    description: 'A select-style button that opens a searchable list.',
};

const branches = [
    'main',
    'develop',
    'release/2.4',
    'feat/billing',
    'fix/invoice-pdf',
];

export default function ComboboxButtonTriggerDemo() {
    return (
        <Combobox items={branches} defaultValue="main">
            <ComboboxTrigger
                render={
                    <Button
                        variant="outline"
                        className="w-56 justify-between font-mono font-normal"
                    />
                }
            >
                <ComboboxValue placeholder="Select a branch" />
            </ComboboxTrigger>
            <ComboboxContent>
                <ComboboxInput
                    showTrigger={false}
                    placeholder="Search branches…"
                />
                <ComboboxEmpty>No branches found.</ComboboxEmpty>
                <ComboboxList>
                    {(item: string) => (
                        <ComboboxItem
                            key={item}
                            value={item}
                            className="font-mono"
                        >
                            {item}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}
