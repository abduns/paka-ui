import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';

export const meta = {
    name: 'As link',
    description: 'Render an anchor with button styling via the render prop.',
};

export default function ButtonAsLinkDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <Button render={<a href="#docs" />} nativeButton={false}>
                Open docs
            </Button>
            <Button
                variant="outline"
                render={<a href="#deploy" />}
                nativeButton={false}
            >
                View deployment
                <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    data-icon="inline-end"
                />
            </Button>
        </div>
    );
}
