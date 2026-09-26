import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

export const meta = {
    name: 'Default',
    description: 'A short hint shown on hover and focus.',
    height: 'compact',
};

export default function TooltipDefaultDemo() {
    return (
        <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
                Redeploy
            </TooltipTrigger>
            <TooltipContent>
                Rebuild from the latest commit on main
            </TooltipContent>
        </Tooltip>
    );
}
