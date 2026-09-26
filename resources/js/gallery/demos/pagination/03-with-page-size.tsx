import { useState } from 'react';
import { Label } from '@/components/ui/label';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export const meta = {
    name: 'With page size',
    description: 'Let the user choose how many rows to show.',
};

const totalInvoices = 84;

export default function PaginationWithPageSizeDemo() {
    const [pageSize, setPageSize] = useState<number | null>(10);
    const [page, setPage] = useState(1);
    const size = pageSize ?? 10;
    const totalPages = Math.ceil(totalInvoices / size);
    const first = (page - 1) * size + 1;
    const last = Math.min(page * size, totalInvoices);

    function changePageSize(next: number | null) {
        setPageSize(next);
        setPage(1);
    }

    return (
        <div className="flex w-full max-w-lg flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
                <Label htmlFor="page-size" className="text-muted-foreground">
                    Rows per page
                </Label>
                <Select value={pageSize} onValueChange={changePageSize}>
                    <SelectTrigger id="page-size" size="sm">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {[10, 25, 50].map((option) => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground tabular-nums">
                    {first}–{last} of {totalInvoices}
                </span>
                <Pagination className="mx-0 w-auto">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                text="Prev"
                                disabled={page === 1}
                                onClick={(event) => {
                                    event.preventDefault();
                                    setPage(page - 1);
                                }}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                disabled={page === totalPages}
                                onClick={(event) => {
                                    event.preventDefault();
                                    setPage(page + 1);
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
