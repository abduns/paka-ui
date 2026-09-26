import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const marks = [0, 25, 50, 75, 100];

export const meta = {
    name: 'Steps with marks',
    description: 'A slider that snaps to fixed steps with labelled marks.',
    height: 'compact',
};

export default function SliderStepsDemo() {
    const [retention, setRetention] = useState([50]);

    return (
        <div className="flex w-full max-w-sm flex-col gap-3">
            <div className="flex items-center justify-between">
                <Label htmlFor="retention">Log retention</Label>
                <span className="text-sm text-muted-foreground tabular-nums">
                    {retention[0]} days
                </span>
            </div>
            <Slider
                id="retention"
                step={25}
                value={retention}
                onValueChange={(value) =>
                    setRetention(
                        typeof value === 'number' ? [value] : [...value],
                    )
                }
                aria-label="Log retention"
            />
            <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
                {marks.map((mark) => (
                    <span key={mark}>{mark}</span>
                ))}
            </div>
        </div>
    );
}
