import { Slider } from '@/components/ui/slider';

export const meta = {
    name: 'Range',
    description: 'Two thumbs selecting a lower and upper bound.',
    height: 'compact',
};

export default function SliderRangeDemo() {
    return (
        <div className="w-full max-w-sm">
            <Slider
                defaultValue={[20, 80]}
                minStepsBetweenValues={5}
                aria-label="Price range"
            />
        </div>
    );
}
