import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const lineItems = [
    { item: 'Team plan', quantity: 12, unit: 24, total: 288 },
    { item: 'Extra bandwidth', quantity: 3, unit: 40, total: 120 },
    { item: 'Priority support', quantity: 1, unit: 150, total: 150 },
];

const formatCurrency = (value: number) =>
    value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export const meta = {
    name: 'With footer totals',
    description: 'Line items summed in a footer row.',
    height: 'tall',
};

export default function TableWithFooterDemo() {
    const total = lineItems.reduce((sum, line) => sum + line.total, 0);

    return (
        <div className="w-full">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Unit</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {lineItems.map((line) => (
                        <TableRow key={line.item}>
                            <TableCell className="font-medium">
                                {line.item}
                            </TableCell>
                            <TableCell className="text-right tabular-nums">
                                {line.quantity}
                            </TableCell>
                            <TableCell className="text-right tabular-nums">
                                {formatCurrency(line.unit)}
                            </TableCell>
                            <TableCell className="text-right tabular-nums">
                                {formatCurrency(line.total)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Due Oct 1</TableCell>
                        <TableCell className="text-right tabular-nums">
                            {formatCurrency(total)}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
