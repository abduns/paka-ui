import { Badge } from '@/components/ui/badge';

export const meta = {
    name: 'Colors',
    description: 'Named colour variants for labels and categories.',
};

const colors = [
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
    'slate',
    'zinc',
    'stone',
] as const;

export default function BadgeColorsDemo() {
    return (
        <div className="flex max-w-md flex-wrap items-center justify-center gap-2">
            {colors.map((color) => (
                <Badge key={color} variant={color}>
                    {color}
                </Badge>
            ))}
        </div>
    );
}
