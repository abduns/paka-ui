import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from '@/components/ui/combobox';

export const meta = {
    name: 'Multiple',
    description: 'Select several members, shown as removable chips.',
};

const members = [
    'Priya Nair',
    'Marcus Kim',
    'Lena Schulz',
    'Diego Alvarez',
    'Aiko Tanaka',
    'Samuel Osei',
];

export default function ComboboxMultipleDemo() {
    const anchor = useComboboxAnchor();

    return (
        <Combobox
            multiple
            autoHighlight
            items={members}
            defaultValue={['Priya Nair', 'Marcus Kim']}
        >
            <ComboboxChips ref={anchor} className="w-full max-w-sm">
                <ComboboxValue>
                    {(values: string[]) => (
                        <>
                            {values.map((value) => (
                                <ComboboxChip key={value}>{value}</ComboboxChip>
                            ))}
                            <ComboboxChipsInput placeholder="Add members…" />
                        </>
                    )}
                </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
                <ComboboxEmpty>No members found.</ComboboxEmpty>
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
