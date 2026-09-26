import { Skeleton } from '@/components/ui/skeleton';

export const meta = {
    name: 'Card',
    description: 'A placeholder for a card with a cover, title, and meta.',
};

export default function SkeletonCardDemo() {
    return (
        <div className="flex w-full max-w-xs flex-col gap-4 rounded-xl border border-border p-4">
            <Skeleton className="aspect-video w-full" />
            <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex items-center gap-2">
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="h-3 w-24" />
            </div>
        </div>
    );
}
