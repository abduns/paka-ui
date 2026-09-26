import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { cn } from '@/lib/utils';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
    fullscreen = false,
}: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <div
                className={fullscreen ? 'hidden' : 'contents'}
                aria-hidden={fullscreen}
            >
                <AppSidebar />
            </div>
            <AppContent
                variant="sidebar"
                className={cn(
                    'min-h-0 min-w-0 overflow-x-hidden',
                    fullscreen &&
                        'fixed inset-0 z-50 h-dvh overflow-hidden bg-background',
                )}
            >
                <div
                    className={cn(
                        'mx-auto flex min-h-0 w-full max-w-7xl min-w-0 flex-1 flex-col',
                        fullscreen && 'h-dvh max-w-none',
                    )}
                >
                    <div className={fullscreen ? 'hidden' : 'contents'}>
                        <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    </div>
                    <div
                        className={cn(
                            'flex min-h-0 min-w-0 flex-1 flex-col p-10',
                            fullscreen && 'p-0',
                        )}
                    >
                        {children}
                    </div>
                </div>
            </AppContent>
        </AppShell>
    );
}
