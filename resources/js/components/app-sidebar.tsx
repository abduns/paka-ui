import { DashboardSquare01Icon } from '@hugeicons/core-free-icons';
import { DashboardSquare01Icon as DashboardSquare01SolidIcon } from '@hugeicons/core-solid-rounded';
import { Link, usePage } from '@inertiajs/react';
import type { ComponentProps } from 'react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavSearch } from '@/components/nav-search';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger,
    useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const page = usePage();
    const dashboardUrl = page.props.currentWorkspace
        ? dashboard(page.props.currentWorkspace.slug)
        : '/';
    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboardUrl,
            icon: DashboardSquare01Icon,
            solidIcon: DashboardSquare01SolidIcon,
        },
    ];

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarHeaderBrand href={dashboardUrl} />
            </SidebarHeader>

            <SidebarContent className="gap-4">
                <NavSearch items={mainNavItems} />
                <NavMain items={mainNavItems} label="Workspace" />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}

function SidebarHeaderBrand({
    href,
}: {
    href: ComponentProps<typeof Link>['href'];
}) {
    const { state } = useSidebar();
    const collapsed = state === 'collapsed';

    return (
        <div className="group/logo relative flex w-full items-center">
            <SidebarMenu className="min-w-0 flex-1">
                <SidebarMenuItem className="after:hidden">
                    <SidebarMenuButton
                        size="lg"
                        className={cn(
                            'w-auto min-w-0 hover:bg-transparent',
                            collapsed &&
                                'transition-opacity group-focus-within/logo:opacity-0 group-hover/logo:opacity-0',
                        )}
                        render={<Link href={href} prefetch />}
                    >
                        <AppLogo showName={false} />
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            <SidebarTrigger
                className={cn(
                    'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    collapsed
                        ? 'absolute inset-0 bg-sidebar opacity-0 transition-opacity group-focus-within/logo:opacity-100 group-hover/logo:opacity-100'
                        : 'ml-auto',
                )}
            />
        </div>
    );
}
