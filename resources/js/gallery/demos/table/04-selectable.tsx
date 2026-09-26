import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const members = [
    { id: 'mia', name: 'Mia Chen', email: 'mia@acme.com', role: 'Admin' },
    { id: 'omar', name: 'Omar Haddad', email: 'omar@acme.com', role: 'Member' },
    {
        id: 'lena',
        name: 'Lena Fischer',
        email: 'lena@acme.com',
        role: 'Member',
    },
    { id: 'raj', name: 'Raj Patel', email: 'raj@acme.com', role: 'Viewer' },
];

export const meta = {
    name: 'Selectable rows',
    description:
        'Row checkboxes with a select-all header that goes indeterminate.',
    height: 'tall',
};

export default function TableSelectableDemo() {
    const [selected, setSelected] = useState<string[]>(['omar']);
    const allSelected = selected.length === members.length;
    const someSelected = selected.length > 0 && !allSelected;

    const toggleRow = (id: string, checked: boolean) =>
        setSelected((current) =>
            checked
                ? [...current, id]
                : current.filter((memberId) => memberId !== id),
        );

    return (
        <div className="flex w-full flex-col gap-2">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-10">
                            <Checkbox
                                aria-label="Select all members"
                                checked={allSelected}
                                indeterminate={someSelected}
                                onCheckedChange={(checked) =>
                                    setSelected(
                                        checked
                                            ? members.map((member) => member.id)
                                            : [],
                                    )
                                }
                            />
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {members.map((member) => {
                        const isSelected = selected.includes(member.id);

                        return (
                            <TableRow
                                key={member.id}
                                data-state={isSelected ? 'selected' : undefined}
                            >
                                <TableCell>
                                    <Checkbox
                                        aria-label={`Select ${member.name}`}
                                        checked={isSelected}
                                        onCheckedChange={(checked) =>
                                            toggleRow(member.id, checked)
                                        }
                                    />
                                </TableCell>
                                <TableCell className="font-medium">
                                    {member.name}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {member.email}
                                </TableCell>
                                <TableCell>{member.role}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <p className="text-sm text-muted-foreground">
                {selected.length} of {members.length} selected
            </p>
        </div>
    );
}
