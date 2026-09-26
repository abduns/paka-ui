import {
    Add01Icon,
    Tick02Icon,
    UserGroupIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Link, router, usePage } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { useInitials } from '@/hooks/use-initials';
import { create, switchMethod } from '@/routes/workspaces';
import type { Workspace } from '@/types';

export function WorkspaceSwitcher() {
    const page = usePage();
    const currentWorkspace = page.props.currentWorkspace;
    const workspaces = page.props.workspaces ?? [];

    const switchWorkspace = (workspace: Workspace) => {
        const previousWorkspaceSlug = currentWorkspace?.slug;

        router.visit(switchMethod(workspace.slug), {
            onFinish: () => {
                if (!previousWorkspaceSlug || typeof window === 'undefined') {
                    router.reload();

                    return;
                }

                const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
                const segment = `/${previousWorkspaceSlug}`;

                if (currentUrl.includes(segment)) {
                    router.visit(
                        currentUrl.replace(segment, `/${workspace.slug}`),
                        {
                            replace: true,
                        },
                    );

                    return;
                }

                router.reload();
            },
        });
    };

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger data-test="workspace-switcher-trigger">
                <WorkspaceLogo workspace={currentWorkspace} />
                <span className="truncate">
                    {currentWorkspace?.name ?? 'Switch workspace'}
                </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="min-w-56">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                    {workspaces.map((workspace) => (
                        <DropdownMenuItem
                            key={workspace.id}
                            data-test="workspace-switcher-item"
                            className="cursor-pointer gap-2"
                            onClick={() => switchWorkspace(workspace)}
                        >
                            <WorkspaceLogo workspace={workspace} />
                            <span className="truncate">{workspace.name}</span>
                            {currentWorkspace?.id === workspace.id ? (
                                <HugeiconsIcon
                                    icon={Tick02Icon}
                                    className="ml-auto"
                                />
                            ) : null}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        data-test="workspace-switcher-new-workspace"
                        className="cursor-pointer gap-2"
                        render={<Link href={create()} prefetch />}
                    >
                        <HugeiconsIcon icon={Add01Icon} />
                        <span className="text-muted-foreground">
                            New workspace
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuSubContent>
        </DropdownMenuSub>
    );
}

function WorkspaceLogo({ workspace }: { workspace?: Workspace | null }) {
    const getInitials = useInitials();

    return (
        <Avatar size="sm" className="rounded-md after:rounded-md">
            {workspace ? (
                <AvatarImage
                    src={workspace.logo}
                    alt={workspace.name}
                    className="rounded-md"
                />
            ) : null}
            <AvatarFallback className="rounded-md">
                {workspace ? (
                    getInitials(workspace.name)
                ) : (
                    <HugeiconsIcon icon={UserGroupIcon} />
                )}
            </AvatarFallback>
        </Avatar>
    );
}
