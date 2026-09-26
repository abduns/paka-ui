import {
    ArrowLeft01Icon,
    LockPasswordIcon,
    NewOfficeIcon,
    Search01Icon,
    SunMoon as SunMoonIcon,
    UserAdd01Icon,
    UserIcon,
} from '@hugeicons/core-free-icons';
import {
    LockPasswordIcon as LockPasswordSolidIcon,
    NewOfficeIcon as NewOfficeSolidIcon,
    SunMoonIcon as SunMoonSolidIcon,
    UserAdd01Icon as UserAdd01SolidIcon,
    UserIcon as UserSolidIcon,
} from '@hugeicons/core-solid-rounded';
import { HugeiconsIcon } from '@hugeicons/react';
import { Link, usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { useMemo, useState } from 'react';
import { NavIcon } from '@/components/nav-icon';
import { NavUser } from '@/components/nav-user';
import { Button } from '@/components/ui/button';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { toUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import { edit as editAppearance } from '@/routes/appearance';
import { edit as editProfile } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import {
    edit as editWorkspace,
    index as workspaces,
} from '@/routes/workspaces';
import { index as workspaceMembers } from '@/routes/workspaces/members';
import type { NavItem } from '@/types';

type NavGroup = {
    label: string;
    items: NavItem[];
};

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();
    const { currentWorkspace } = usePage().props;
    const [query, setQuery] = useState('');

    const filteredGroups = useMemo(() => {
        const navGroups: NavGroup[] = [
            {
                label: 'Account',
                items: [
                    {
                        title: 'Profile',
                        href: editProfile(),
                        icon: UserIcon,
                        solidIcon: UserSolidIcon,
                    },
                    {
                        title: 'Password & security',
                        href: editSecurity(),
                        icon: LockPasswordIcon,
                        solidIcon: LockPasswordSolidIcon,
                    },
                    {
                        title: 'Appearance',
                        href: editAppearance(),
                        icon: SunMoonIcon,
                        solidIcon: SunMoonSolidIcon,
                    },
                ],
            },
            {
                label: 'Workspace',
                items: [
                    {
                        title: 'General',
                        href: currentWorkspace
                            ? editWorkspace(currentWorkspace.slug)
                            : workspaces(),
                        icon: NewOfficeIcon,
                        solidIcon: NewOfficeSolidIcon,
                    },
                    ...(currentWorkspace
                        ? [
                              {
                                  title: 'Members',
                                  href: workspaceMembers(currentWorkspace.slug),
                                  icon: UserAdd01Icon,
                                  solidIcon: UserAdd01SolidIcon,
                              },
                          ]
                        : []),
                ],
            },
        ];
        const term = query.trim().toLowerCase();

        if (!term) {
            return navGroups;
        }

        return navGroups
            .map((group) => ({
                ...group,
                items: group.label.toLowerCase().includes(term)
                    ? group.items
                    : group.items.filter((item) =>
                          item.title.toLowerCase().includes(term),
                      ),
            }))
            .filter((group) => group.items.length > 0);
    }, [currentWorkspace, query]);

    const activeHref = filteredGroups
        .flatMap((group) => group.items)
        .map((item) => toUrl(item.href))
        .filter((href) => isCurrentOrParentUrl(href))
        .sort((a, b) => b.length - a.length)
        .at(0);
    const dashboardUrl = currentWorkspace
        ? dashboard(currentWorkspace.slug)
        : '/';

    return (
        <SidebarProvider defaultOpen>
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start gap-1.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
                        nativeButton={false}
                        render={<Link href={dashboardUrl} />}
                    >
                        <HugeiconsIcon
                            icon={ArrowLeft01Icon}
                            data-icon="inline-start"
                        />
                        <span className="group-data-[collapsible=icon]:hidden">
                            Back to app
                        </span>
                    </Button>

                    <div className="relative group-data-[collapsible=icon]:hidden">
                        <HugeiconsIcon
                            icon={Search01Icon}
                            className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-foreground"
                        />
                        <SidebarInput
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search settings..."
                            className="pl-7"
                        />
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    {filteredGroups.map((group) => (
                        <SidebarGroup key={group.label}>
                            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {group.items.map((item) => {
                                        const isActive =
                                            toUrl(item.href) === activeHref;

                                        return (
                                            <SidebarMenuItem
                                                key={toUrl(item.href)}
                                            >
                                                <SidebarMenuButton
                                                    isActive={isActive}
                                                    tooltip={item.title}
                                                    className="text-sidebar-foreground/70"
                                                    render={
                                                        <Link
                                                            href={item.href}
                                                            prefetch
                                                        />
                                                    }
                                                >
                                                    {item.icon ? (
                                                        <NavIcon
                                                            icon={item.icon}
                                                            solidIcon={
                                                                item.solidIcon
                                                            }
                                                            isActive={isActive}
                                                        />
                                                    ) : null}
                                                    <span>{item.title}</span>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        );
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    ))}

                    {filteredGroups.length === 0 ? (
                        <p className="px-4 text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
                            No settings match “{query}”.
                        </p>
                    ) : null}
                </SidebarContent>

                <SidebarFooter>
                    <NavUser />
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>

            <SidebarInset>
                <div className="mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col">
                    <div className="flex h-16 shrink-0 items-center px-10 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:hidden">
                        <SidebarTrigger className="-ml-1" />
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col p-10">
                        {children}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
