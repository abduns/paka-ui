import { Badge } from '@/components/ui/badge';

export const meta = {
    name: 'Variants',
    description: 'The semantic badge variants.',
};

export default function BadgeVariantsDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="destructive">Destructive</Badge>
        </div>
    );
}
