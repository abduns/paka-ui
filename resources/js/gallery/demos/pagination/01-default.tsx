import { useState } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

export const meta = {
    name: 'Default',
    description: 'Numbered pages with previous and next.',
    height: 'compact',
};

const totalPages = 9;

export default function PaginationDefaultDemo() {
    const [page, setPage] = useState(2);

    function goTo(event: React.MouseEvent, next: number) {
        event.preventDefault();
        setPage(Math.min(Math.max(next, 1), totalPages));
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        disabled={page === 1}
                        onClick={(event) => goTo(event, page - 1)}
                    />
                </PaginationItem>
                {[1, 2, 3].map((number) => (
                    <PaginationItem key={number}>
                        <PaginationLink
                            href="#"
                            isActive={page === number}
                            onClick={(event) => goTo(event, number)}
                        >
                            {number}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                        href="#"
                        isActive={page === totalPages}
                        onClick={(event) => goTo(event, totalPages)}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        disabled={page === totalPages}
                        onClick={(event) => goTo(event, page + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
