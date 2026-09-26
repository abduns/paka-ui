import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export const meta = {
    name: 'Compact',
    description: 'A page counter with icon-only controls for tight spaces.',
    height: 'compact',
};

const totalPages = 12;

export default function PaginationCompactDemo() {
    const [page, setPage] = useState(1);

    return (
        <div className="flex items-center gap-3">
            <Button
                variant="outline"
                size="icon-sm"
                aria-label="Previous page"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
                <HugeiconsIcon icon={ArrowLeft01Icon} />
            </Button>
            <span className="text-sm text-muted-foreground tabular-nums">
                Page {page} of {totalPages}
            </span>
            <Button
                variant="outline"
                size="icon-sm"
                aria-label="Next page"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
            >
                <HugeiconsIcon icon={ArrowRight01Icon} />
            </Button>
        </div>
    );
}
