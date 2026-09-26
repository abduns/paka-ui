import { Input } from '@/components/ui/input';

export const meta = {
    name: 'Sizes',
    description: 'Adjust height with utility classes.',
};

export default function InputSizesDemo() {
    return (
        <div className="flex w-full max-w-sm flex-col gap-3">
            <Input className="h-8 text-sm" placeholder="Small" />
            <Input placeholder="Default" />
            <Input className="h-10" placeholder="Large" />
        </div>
    );
}
