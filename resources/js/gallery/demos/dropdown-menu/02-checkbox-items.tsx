import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const meta = {
    name: 'Checkbox items',
    description: 'Toggle several options independently.',
};

export default function DropdownMenuCheckboxItemsDemo() {
    const [showStatus, setShowStatus] = useState(true);
    const [showAmount, setShowAmount] = useState(true);
    const [showDueDate, setShowDueDate] = useState(false);
    const [showCustomer, setShowCustomer] = useState(false);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
                Columns
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Show columns</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                        checked={showStatus}
                        onCheckedChange={setShowStatus}
                    >
                        Status
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={showAmount}
                        onCheckedChange={setShowAmount}
                    >
                        Amount
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={showDueDate}
                        onCheckedChange={setShowDueDate}
                    >
                        Due date
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={showCustomer}
                        onCheckedChange={setShowCustomer}
                    >
                        Customer
                    </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
