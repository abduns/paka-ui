import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const meta = {
    name: 'Radio items',
    description: 'Pick exactly one option from a group.',
};

const sortOptions = [
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'amount', label: 'Highest amount' },
    { value: 'customer', label: 'Customer name' },
];

export default function DropdownMenuRadioItemsDemo() {
    const [sort, setSort] = useState('newest');

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
                Sort:{' '}
                {sortOptions.find((option) => option.value === sort)?.label}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Sort invoices by</DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                        value={sort}
                        onValueChange={setSort}
                    >
                        {sortOptions.map((option) => (
                            <DropdownMenuRadioItem
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
