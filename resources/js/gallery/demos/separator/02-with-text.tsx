import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const meta = {
    name: 'With text',
    description: 'A horizontal divider with a centered label.',
};

export default function SeparatorWithTextDemo() {
    return (
        <div className="flex w-full max-w-sm flex-col gap-4">
            <Button variant="outline" className="w-full">
                Invite by email
            </Button>
            <div className="flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground">or</span>
                <Separator className="flex-1" />
            </div>
            <Button variant="secondary" className="w-full">
                Copy invite link
            </Button>
        </div>
    );
}
