import {
    Delete02Icon,
    Notification03Icon,
    Settings02Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

const actions = [
    { label: 'Notifications', icon: Notification03Icon },
    { label: 'Workspace settings', icon: Settings02Icon },
    { label: 'Delete workspace', icon: Delete02Icon },
];

export const meta = {
    name: 'On icon buttons',
    description: 'Tooltips that name otherwise unlabelled icon buttons.',
    height: 'compact',
};

export default function TooltipIconButtonsDemo() {
    return (
        <div className="flex items-center gap-1">
            {actions.map((action) => (
                <Tooltip key={action.label}>
                    <TooltipTrigger
                        render={
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label={action.label}
                            />
                        }
                    >
                        <HugeiconsIcon icon={action.icon} />
                    </TooltipTrigger>
                    <TooltipContent>{action.label}</TooltipContent>
                </Tooltip>
            ))}
        </div>
    );
}
