import { UserGroupIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';

export const meta = {
    name: 'Workspace',
    description: 'A link-styled trigger that previews a workspace.',
};

export default function HoverCardWorkspaceDemo() {
    return (
        <HoverCard>
            <HoverCardTrigger
                href="#"
                className={buttonVariants({ variant: 'link' })}
            >
                acme-production
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Acme Production</span>
                            <Badge variant="success">Pro</Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                            acme-production.paka.app
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Customer-facing services and billing. Deploys from main.
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <HugeiconsIcon
                            icon={UserGroupIcon}
                            className="size-4"
                        />
                        14 members
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
