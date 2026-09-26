import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

function deployWorkspace() {
    return new Promise<{ url: string }>((resolve) => {
        setTimeout(() => resolve({ url: 'acme-web.paka.app' }), 2000);
    });
}

export const meta = {
    name: 'Promise',
    description: 'A loading toast that resolves into success or error.',
};

export default function SonnerPromiseDemo() {
    return (
        <Button
            variant="outline"
            onClick={() =>
                toast.promise(deployWorkspace(), {
                    loading: 'Deploying acme-web…',
                    success: (result) => `Live at ${result.url}`,
                    error: 'Deployment failed',
                })
            }
        >
            Deploy
        </Button>
    );
}
