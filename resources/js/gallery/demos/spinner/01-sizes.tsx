import { Spinner } from '@/components/ui/spinner';

export const meta = {
    name: 'Sizes',
    description: 'The spinner scales with a size utility.',
    height: 'compact',
};

export default function SpinnerSizesDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-6">
            <Spinner className="size-3" />
            <Spinner />
            <Spinner className="size-6" />
            <Spinner className="size-8" />
        </div>
    );
}
