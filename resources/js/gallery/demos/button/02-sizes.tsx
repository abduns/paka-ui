import { Button } from '@/components/ui/button';

export const meta = {
    name: 'Sizes',
    description: 'Extra small through large.',
};

export default function ButtonSizesDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="xs" variant="outline">
                Extra small
            </Button>
            <Button size="sm" variant="outline">
                Small
            </Button>
            <Button variant="outline">Default</Button>
            <Button size="lg" variant="outline">
                Large
            </Button>
        </div>
    );
}
