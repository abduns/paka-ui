import { Button } from '@/components/ui/button';
import { Kbd } from '@/components/ui/kbd';

export const meta = {
    name: 'In a button',
    description: 'Hint the shortcut inside the action itself.',
    height: 'compact',
};

export default function KbdInButtonDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline">
                Save draft
                <Kbd>⌘S</Kbd>
            </Button>
            <Button>
                Send invoice
                <Kbd className="bg-primary-foreground/20 text-primary-foreground">
                    ⌘↵
                </Kbd>
            </Button>
        </div>
    );
}
