import { Badge } from '@/components/ui/badge';

export const meta = {
    name: 'Status list',
    description: 'Badges used as invoice statuses in a list.',
};

const invoices = [
    { id: '#1042', customer: 'Acme Inc.', status: 'paid' },
    { id: '#1041', customer: 'Globex', status: 'pending' },
    { id: '#1040', customer: 'Initech', status: 'overdue' },
    { id: '#1039', customer: 'Umbrella', status: 'draft' },
] as const;

const statusVariant = {
    paid: 'success',
    pending: 'amber',
    overdue: 'destructive',
    draft: 'gray',
} as const;

export default function BadgeStatusListDemo() {
    return (
        <ul className="flex w-full max-w-sm flex-col divide-y rounded-lg border text-sm">
            {invoices.map((invoice) => (
                <li
                    key={invoice.id}
                    className="flex items-center justify-between gap-3 px-3 py-2"
                >
                    <span className="flex flex-col gap-0.5">
                        <span className="font-medium">{invoice.id}</span>
                        <span className="text-xs text-muted-foreground">
                            {invoice.customer}
                        </span>
                    </span>
                    <Badge variant={statusVariant[invoice.status]}>
                        {invoice.status}
                    </Badge>
                </li>
            ))}
        </ul>
    );
}
