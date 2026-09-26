import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

export const meta = {
    name: 'Scrollable',
    description: 'Long content scrolls inside the dialog body.',
};

const releases = [
    {
        version: '3.4.0',
        date: 'Sep 18, 2026',
        notes: 'Recurring invoices, bulk member import, and faster search.',
    },
    {
        version: '3.3.2',
        date: 'Sep 4, 2026',
        notes: 'Fixed deployment logs truncating after 10,000 lines.',
    },
    {
        version: '3.3.1',
        date: 'Aug 27, 2026',
        notes: 'Notification digests now respect workspace time zones.',
    },
    {
        version: '3.3.0',
        date: 'Aug 14, 2026',
        notes: 'Introduced usage-based billing and spend alerts.',
    },
    {
        version: '3.2.0',
        date: 'Jul 30, 2026',
        notes: 'Preview deployments for every pull request.',
    },
    {
        version: '3.1.4',
        date: 'Jul 16, 2026',
        notes: 'Improved keyboard navigation across all menus.',
    },
    {
        version: '3.1.0',
        date: 'Jul 2, 2026',
        notes: 'Workspace roles: admin, member, and viewer.',
    },
    {
        version: '3.0.0',
        date: 'Jun 18, 2026',
        notes: 'New dashboard, redesigned invoices, and a public API.',
    },
];

export default function DialogScrollableDemo() {
    return (
        <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
                View changelog
            </DialogTrigger>
            <DialogContent className="max-h-[calc(100%-2rem)] grid-rows-[auto_minmax(0,1fr)_auto]">
                <DialogHeader>
                    <DialogTitle>What's new in Paka</DialogTitle>
                    <DialogDescription>
                        Release notes from the last three months.
                    </DialogDescription>
                </DialogHeader>
                <div className="-mx-6 overflow-y-auto border-y border-border px-6 py-4">
                    <ul className="flex flex-col gap-4">
                        {releases.map((release) => (
                            <li
                                key={release.version}
                                className="flex flex-col gap-1"
                            >
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary">
                                        v{release.version}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                        {release.date}
                                    </span>
                                </div>
                                <p className="text-sm">{release.notes}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <DialogFooter showCloseButton />
            </DialogContent>
        </Dialog>
    );
}
