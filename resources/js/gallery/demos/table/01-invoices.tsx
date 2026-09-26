import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const invoices = [
    {
        id: 'INV-1042',
        customer: 'Acme Inc.',
        date: 'Sep 12',
        amount: '$1,240.00',
    },
    {
        id: 'INV-1041',
        customer: 'Northwind',
        date: 'Sep 10',
        amount: '$860.00',
    },
    { id: 'INV-1040', customer: 'Globex', date: 'Sep 04', amount: '$2,410.00' },
    { id: 'INV-1039', customer: 'Initech', date: 'Sep 01', amount: '$320.00' },
];

export const meta = {
    name: 'Invoices',
    description: 'A basic table with a caption and right-aligned amounts.',
    height: 'tall',
};

export default function TableInvoicesDemo() {
    return (
        <div className="w-full">
            <Table>
                <TableCaption>Invoices issued this month.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                            <TableCell className="font-medium">
                                {invoice.id}
                            </TableCell>
                            <TableCell>{invoice.customer}</TableCell>
                            <TableCell>{invoice.date}</TableCell>
                            <TableCell className="text-right tabular-nums">
                                {invoice.amount}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
