import { MoreHorizontalIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type DeploymentStatus = 'ready' | 'building' | 'failed';

const statusBadges: Record<
    DeploymentStatus,
    { label: string; variant: 'success' | 'blue' | 'destructive' }
> = {
    ready: { label: 'Ready', variant: 'success' },
    building: { label: 'Building', variant: 'blue' },
    failed: { label: 'Failed', variant: 'destructive' },
};

const deployments: Array<{
    id: string;
    branch: string;
    status: DeploymentStatus;
    age: string;
}> = [
    { id: '#4821', branch: 'main', status: 'ready', age: '12m' },
    { id: '#4820', branch: 'feat/billing-v2', status: 'building', age: '25m' },
    { id: '#4819', branch: 'fix/webhook-retry', status: 'failed', age: '1h' },
    { id: '#4818', branch: 'main', status: 'ready', age: '3h' },
];

export const meta = {
    name: 'With badges and actions',
    description: 'Status badges and a per-row actions button.',
    height: 'tall',
};

export default function TableWithBadgesActionsDemo() {
    return (
        <div className="w-full">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Deployment</TableHead>
                        <TableHead>Branch</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead className="w-10">
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {deployments.map((deployment) => {
                        const status = statusBadges[deployment.status];

                        return (
                            <TableRow key={deployment.id}>
                                <TableCell className="font-medium">
                                    {deployment.id}
                                </TableCell>
                                <TableCell className="font-mono text-xs">
                                    {deployment.branch}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={status.variant}>
                                        {status.label}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {deployment.age}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        aria-label={`Actions for ${deployment.id}`}
                                    >
                                        <HugeiconsIcon
                                            icon={MoreHorizontalIcon}
                                        />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
