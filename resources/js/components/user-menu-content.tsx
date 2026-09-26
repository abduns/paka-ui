import {
    ComputerIcon,
    Logout02Icon,
    Moon02Icon,
    Settings01Icon,
    Sun01Icon,
    SunMoon as SunMoonIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { IconSvgElement } from '@hugeicons/react';
import { Link, router } from '@inertiajs/react';
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { WorkspaceSwitcher } from '@/components/workspace-switcher';
import type { Appearance } from '@/hooks/use-appearance';
import { useAppearance } from '@/hooks/use-appearance';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import type { User } from '@/types';

const THEME_OPTIONS: {
    value: Appearance;
    label: string;
    icon: IconSvgElement;
}[] = [
    { value: 'light', label: 'Light', icon: Sun01Icon },
    { value: 'dark', label: 'Dark', icon: Moon02Icon },
    { value: 'system', label: 'System', icon: ComputerIcon },
];

type Props = {
    user: User;
};

export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <>
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm text-muted-foreground">
                <UserInfo user={user} showEmail={true} />
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <WorkspaceSwitcher />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <ThemeMenu />
                <DropdownMenuItem
                    render={
                        <Link
                            className="block w-full cursor-pointer"
                            href={edit()}
                            prefetch
                            onClick={cleanup}
                        />
                    }
                >
                    <HugeiconsIcon icon={Settings01Icon} />
                    Settings
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                nativeButton
                render={
                    <Link
                        className="block w-full cursor-pointer"
                        href={logout()}
                        as="button"
                        onClick={handleLogout}
                        data-test="logout-button"
                    />
                }
            >
                <HugeiconsIcon icon={Logout02Icon} />
                Log out
            </DropdownMenuItem>
        </>
    );
}

function ThemeMenu() {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger data-test="theme-menu-trigger">
                <HugeiconsIcon icon={SunMoonIcon} />
                Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                    value={appearance}
                    onValueChange={(value) =>
                        updateAppearance(value as Appearance)
                    }
                >
                    {THEME_OPTIONS.map(({ value, label, icon }) => (
                        <DropdownMenuRadioItem
                            key={value}
                            value={value}
                            data-test={`theme-${value}-item`}
                        >
                            <HugeiconsIcon icon={icon} />
                            {label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
        </DropdownMenuSub>
    );
}
