import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export const meta = {
    name: 'With action',
    description: 'A toast that offers an undo button.',
};

export default function SonnerWithActionDemo() {
    return (
        <Button
            variant="outline"
            onClick={() =>
                toast('Member removed', {
                    description: 'Mia Chen no longer has access to Acme Inc.',
                    action: {
                        label: 'Undo',
                        onClick: () => toast.success('Mia Chen was restored'),
                    },
                })
            }
        >
            Remove member
        </Button>
    );
}
