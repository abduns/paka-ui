import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export const meta = {
    name: 'In a button',
    description: 'Buttons in a pending state across variants and sizes.',
    height: 'compact',
};

export default function SpinnerInButtonDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <Button disabled>
                <Spinner data-icon="inline-start" />
                Deploying
            </Button>
            <Button variant="outline" disabled>
                <Spinner data-icon="inline-start" />
                Saving changes
            </Button>
            <Button variant="secondary" size="sm" disabled>
                <Spinner data-icon="inline-start" />
                Syncing
            </Button>
            <Button variant="outline" size="icon" disabled aria-label="Loading">
                <Spinner />
            </Button>
        </div>
    );
}
