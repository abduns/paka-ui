import { Separator } from '@/components/ui/separator';

export const meta = {
    name: 'Horizontal',
    description: 'A divider between a heading and its content.',
};

export default function SeparatorHorizontalDemo() {
    return (
        <div className="flex w-full max-w-sm flex-col gap-4">
            <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Paka Workspaces</p>
                <p className="text-sm text-muted-foreground">
                    Shared environments for your team's deployments.
                </p>
            </div>
            <Separator />
            <div className="flex h-5 items-center gap-4 text-sm">
                <span>Overview</span>
                <Separator orientation="vertical" />
                <span>Members</span>
                <Separator orientation="vertical" />
                <span>Billing</span>
            </div>
        </div>
    );
}
