import {
    Alert02Icon,
    CheckmarkCircle02Icon,
    Clock01Icon,
    Rocket01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Badge } from '@/components/ui/badge';

export const meta = {
    name: 'With icons',
    description: 'Leading and trailing icons inside badges.',
};

export default function BadgeWithIconsDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="success">
                <HugeiconsIcon
                    icon={CheckmarkCircle02Icon}
                    data-icon="inline-start"
                />
                Paid
            </Badge>
            <Badge variant="secondary">
                <HugeiconsIcon icon={Clock01Icon} data-icon="inline-start" />
                Pending
            </Badge>
            <Badge variant="destructive">
                <HugeiconsIcon icon={Alert02Icon} data-icon="inline-start" />
                Overdue
            </Badge>
            <Badge variant="info">
                Deploying
                <HugeiconsIcon icon={Rocket01Icon} data-icon="inline-end" />
            </Badge>
        </div>
    );
}
