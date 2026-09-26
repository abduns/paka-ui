import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

const sides = ['top', 'right', 'bottom', 'left'] as const;

export const meta = {
    name: 'Sides',
    description: 'Position the tooltip on any side of its trigger.',
};

export default function TooltipSidesDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            {sides.map((side) => (
                <Tooltip key={side}>
                    <TooltipTrigger
                        render={
                            <Button variant="outline" className="capitalize" />
                        }
                    >
                        {side}
                    </TooltipTrigger>
                    <TooltipContent side={side}>
                        Opens on the {side}
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
    );
}
