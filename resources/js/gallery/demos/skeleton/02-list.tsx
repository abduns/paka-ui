import { Skeleton } from '@/components/ui/skeleton';

export const meta = {
    name: 'List',
    description: 'Placeholder rows for a members list while it loads.',
};

export default function SkeletonListDemo() {
    return (
        <div className="flex w-full max-w-sm flex-col gap-4">
            {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="flex items-center gap-3">
                    <Skeleton className="size-10 shrink-0 rounded-full" />
                    <div className="flex flex-1 flex-col gap-2">
                        <Skeleton className="h-4 w-2/5" />
                        <Skeleton className="h-3 w-3/5" />
                    </div>
                    <Skeleton className="h-6 w-14" />
                </div>
            ))}
        </div>
    );
}
