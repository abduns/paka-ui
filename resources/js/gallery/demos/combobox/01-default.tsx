import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';

export const meta = {
    name: 'Default',
    description: 'Type to filter a list of workspaces and pick one.',
};

const workspaces = [
    'Acme Design',
    'Acme Marketing',
    'Globex',
    'Initech',
    'Umbrella',
    'Hooli',
];

export default function ComboboxDefaultDemo() {
    return (
        <Combobox items={workspaces}>
            <ComboboxInput
                placeholder="Select a workspace"
                className="w-full max-w-xs"
            />
            <ComboboxContent>
                <ComboboxEmpty>No workspaces found.</ComboboxEmpty>
                <ComboboxList>
                    {(item: string) => (
                        <ComboboxItem key={item} value={item}>
                            {item}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}
