import { Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'motion/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { component } = usePage();
    const { name } = usePage().props;

    return (
        <main className="grainy relative flex min-h-svh flex-col items-center justify-center bg-muted/50 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="mx-auto flex w-80 max-w-full flex-col gap-8">
                        <Link
                            href={home()}
                            aria-label={name}
                            className="flex items-center gap-2 self-start font-medium"
                        >
                            <AppLogoIcon className="size-7" />
                        </Link>

                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={component}
                                className="flex flex-col gap-8"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{
                                    duration: 0.28,
                                    ease: 'easeOut',
                                }}
                            >
                                <div className="space-y-2 text-left">
                                    <h1 className="text-lg font-medium">
                                        {title}
                                    </h1>
                                    <p className="text-sm text-muted-foreground">
                                        {description}
                                    </p>
                                </div>

                                {children}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </main>
    );
}
