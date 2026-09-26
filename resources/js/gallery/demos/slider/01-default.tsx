import { Slider } from '@/components/ui/slider';

export const meta = {
    name: 'Default',
    description: 'A single-thumb slider with a starting value.',
    height: 'compact',
};

export default function SliderDefaultDemo() {
    return (
        <div className="w-full max-w-sm">
            <Slider defaultValue={[40]} aria-label="Volume" />
        </div>
    );
}
