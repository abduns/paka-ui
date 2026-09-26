import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';

export const meta = {
    name: 'Rich items',
    description: 'Object values rendered with an avatar and secondary text.',
};

type Member = { value: string; label: string; email: string };

const members: Member[] = [
    { value: 'priya', label: 'Priya Nair', email: 'priya@acme.co' },
    { value: 'marcus', label: 'Marcus Kim', email: 'marcus@acme.co' },
    { value: 'lena', label: 'Lena Schulz', email: 'lena@acme.co' },
    { value: 'diego', label: 'Diego Alvarez', email: 'diego@acme.co' },
];

function initials(name: string) {
    return name
        .split(' ')
        .map((part) => part[0])
        .join('');
}

export default function ComboboxRichItemsDemo() {
    return (
        <Combobox items={members}>
            <ComboboxInput
                placeholder="Assign to…"
                className="w-full max-w-xs"
            />
            <ComboboxContent>
                <ComboboxEmpty>No members found.</ComboboxEmpty>
                <ComboboxList>
                    {(member: Member) => (
                        <ComboboxItem key={member.value} value={member}>
                            <Avatar size="sm">
                                <AvatarFallback>
                                    {initials(member.label)}
                                </AvatarFallback>
                            </Avatar>
                            <span className="flex flex-col">
                                <span>{member.label}</span>
                                <span className="text-xs text-muted-foreground">
                                    {member.email}
                                </span>
                            </span>
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}
