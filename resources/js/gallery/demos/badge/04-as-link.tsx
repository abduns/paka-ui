import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Badge } from '@/components/ui/badge';

export const meta = {
    name: 'As link',
    description: 'Render a badge as an anchor with the render prop.',
};

export default function BadgeAsLinkDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="link" render={<a href="#changelog" />}>
                What's new
                <HugeiconsIcon icon={ArrowRight01Icon} data-icon="inline-end" />
            </Badge>
            <Badge variant="ghost" render={<a href="#docs" />}>
                Read the docs
            </Badge>
        </div>
    );
}
