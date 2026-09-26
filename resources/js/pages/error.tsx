import { ArrowLeft02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'motion/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { home } from '@/routes';

type Props = {
    status: number;
};

const CONTENT: Record<number, { title: string; description: string }> = {
    403: {
        title: 'Access denied',
        description: "You don't have permission to view this page.",
    },
    404: {
        title: 'Page not found',
        description: "The page you're looking for doesn't exist or was moved.",
    },
    419: {
        title: 'Session expired',
        description:
            'Your session has expired. Please refresh the page and try again.',
    },
    500: {
        title: 'Something went wrong',
        description:
            'An unexpected error occurred on our end. Please try again shortly.',
    },
    503: {
        title: 'Down for maintenance',
        description: "We're making some improvements. Please check back soon.",
    },
};

export default function ErrorPage({ status }: Props) {
    const { title, description } = CONTENT[status] ?? CONTENT[500];

    return (
        <>
            <Head title={title} />

            <main className="grainy relative flex min-h-svh flex-col items-center justify-center bg-muted/50 p-6 md:p-10">
                <motion.div
                    className="flex w-full max-w-sm flex-col items-center gap-8 text-center"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                >
                    <Link
                        href={home()}
                        aria-label="Home"
                        className="text-foreground"
                    >
                        <AppLogoIcon className="size-7" />
                    </Link>

                    <div className="space-y-3">
                        <p className="text-sm font-medium text-muted-foreground">
                            {status}
                        </p>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {title}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>

                    <Button render={<Link href={home()} />}>
                        <HugeiconsIcon
                            icon={ArrowLeft02Icon}
                            data-icon="inline-start"
                        />
                        Go back home
                    </Button>
                </motion.div>
            </main>
        </>
    );
}
