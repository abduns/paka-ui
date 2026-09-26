import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export const meta = {
    name: 'With value label',
    description: 'A controlled slider that reports its value in the label.',
    height: 'compact',
};

export default function SliderWithValueLabelDemo() {
    const [seats, setSeats] = useState([12]);

    return (
        <div className="flex w-full max-w-sm flex-col gap-3">
            <div className="flex items-center justify-between">
                <Label htmlFor="seats">Seats</Label>
                <span className="text-sm text-muted-foreground tabular-nums">
                    {seats[0]} of 50
                </span>
            </div>
            <Slider
                id="seats"
                min={1}
                max={50}
                value={seats}
                onValueChange={(value) =>
                    setSeats(typeof value === 'number' ? [value] : [...value])
                }
                aria-label="Seats"
            />
        </div>
    );
}
