import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export const meta = {
    name: 'Status',
    description: 'Success, error, warning, and info toasts with icons.',
};

export default function SonnerStatusDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
                variant="outline"
                onClick={() =>
                    toast.success('Invoice #1042 paid', {
                        description:
                            'A receipt was emailed to billing@acme.com.',
                    })
                }
            >
                Success
            </Button>
            <Button
                variant="outline"
                onClick={() =>
                    toast.error('Deployment failed', {
                        description: 'Build step exited with code 1.',
                    })
                }
            >
                Error
            </Button>
            <Button
                variant="outline"
                onClick={() =>
                    toast.warning('Approaching seat limit', {
                        description: '48 of 50 seats are in use.',
                    })
                }
            >
                Warning
            </Button>
            <Button
                variant="outline"
                onClick={() =>
                    toast.info('Maintenance window', {
                        description: 'EU West will be read-only on Sunday.',
                    })
                }
            >
                Info
            </Button>
        </div>
    );
}
