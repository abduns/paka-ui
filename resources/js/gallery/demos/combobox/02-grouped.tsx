import {
    Combobox,
    ComboboxCollection,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxLabel,
    ComboboxList,
} from '@/components/ui/combobox';

export const meta = {
    name: 'Grouped',
    description: 'Items organised under labelled groups.',
};

type Environment = { value: string; label: string };
type Group = { value: string; items: Environment[] };

const groups: Group[] = [
    {
        value: 'Production',
        items: [
            { value: 'prod-eu', label: 'eu-west-1' },
            { value: 'prod-us', label: 'us-east-1' },
        ],
    },
    {
        value: 'Staging',
        items: [
            { value: 'staging', label: 'staging' },
            { value: 'qa', label: 'qa' },
        ],
    },
    {
        value: 'Preview',
        items: [{ value: 'pr-412', label: 'pr-412' }],
    },
];

export default function ComboboxGroupedDemo() {
    return (
        <Combobox items={groups}>
            <ComboboxInput
                placeholder="Select an environment"
                className="w-full max-w-xs"
            />
            <ComboboxContent>
                <ComboboxEmpty>No environments found.</ComboboxEmpty>
                <ComboboxList>
                    {(group: Group) => (
                        <ComboboxGroup key={group.value} items={group.items}>
                            <ComboboxLabel>{group.value}</ComboboxLabel>
                            <ComboboxCollection>
                                {(item: Environment) => (
                                    <ComboboxItem key={item.value} value={item}>
                                        {item.label}
                                    </ComboboxItem>
                                )}
                            </ComboboxCollection>
                        </ComboboxGroup>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}
