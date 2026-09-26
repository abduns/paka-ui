import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export const meta = {
    name: 'Default',
    description: 'A plain toast with a title and description.',
};

export default function SonnerDefaultDemo() {
    return (
        <Button
            variant="outline"
            onClick={() =>
                toast('Deployment queued', {
                    description: 'acme-web will build in about a minute.',
                })
            }
        >
            Show toast
        </Button>
    );
}
