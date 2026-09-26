import {
    Copy01Icon,
    Delete02Icon,
    Edit03Icon,
    Share01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

export const meta = {
    name: 'Icon only',
    description: 'Square icon buttons with a Tooltip as the accessible label.',
};

export default function ButtonIconOnlyDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <Tooltip>
                <TooltipTrigger
                    render={
                        <Button
                            variant="outline"
                            size="icon"
                            aria-label="Edit"
                        />
                    }
                >
                    <HugeiconsIcon icon={Edit03Icon} />
                </TooltipTrigger>
                <TooltipContent>Edit</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger
                    render={
                        <Button
                            variant="outline"
                            size="icon"
                            aria-label="Copy link"
                        />
                    }
                >
                    <HugeiconsIcon icon={Copy01Icon} />
                </TooltipTrigger>
                <TooltipContent>Copy link</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger
                    render={
                        <Button
                            variant="outline"
                            size="icon"
                            aria-label="Share"
                        />
                    }
                >
                    <HugeiconsIcon icon={Share01Icon} />
                </TooltipTrigger>
                <TooltipContent>Share</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger
                    render={
                        <Button
                            variant="destructive"
                            size="icon"
                            aria-label="Delete"
                        />
                    }
                >
                    <HugeiconsIcon icon={Delete02Icon} />
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
            </Tooltip>
        </div>
    );
}
