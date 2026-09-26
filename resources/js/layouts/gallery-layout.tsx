import {
    Menu01Icon,
    Moon02Icon,
    PaintBoardIcon,
    Sun03Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { CategoryNav } from '@/components/gallery/category-nav';
import { Customizer } from '@/components/gallery/customizer';
import { SearchCommand } from '@/components/gallery/search-command';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Toaster } from '@/components/ui/sonner';
import { useAppearance } from '@/hooks/use-appearance';
import { useCustomizerRail } from '@/hooks/use-customizer-rail';
import { useMounted } from '@/hooks/use-mounted';
import { cn } from '@/lib/utils';
import { home } from '@/routes';
import { index as blocks } from '@/routes/blocks';
import { index as components } from '@/routes/components';
import { encodePreset } from '@/themes/preset';
import { usePreset } from '@/themes/store';
import { styleDefinition } from '@/themes/styles';

function Wordmark() {
    return (
        <Link
            href={home()}
            aria-label="Paka UI home"
            className="flex items-center gap-2 rounded-md text-base font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
            <span
                aria-hidden="true"
                className="flex size-6 items-center justify-center rounded-md bg-foreground text-[0.7rem] font-bold text-background"
            >
                P
            </span>
            Paka<span className="text-muted-foreground">/ui</span>
        </Link>
    );
}

function TopNavLink({
    href,
    active,
    children,
}: {
    href: string;
    active: boolean;
    children: ReactNode;
}) {
    return (
        <Link
            href={href}
            aria-current={active ? 'page' : undefined}
            className={cn(
                'rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50',
                active && 'text-foreground',
            )}
        >
            {children}
        </Link>
    );
}

/**
 * The resolved appearance depends on the browser, so the icon and label are
 * settled after mount to keep server and client markup identical.
 */
function ModeToggle() {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const mounted = useMounted();
    const isDark = mounted && resolvedAppearance === 'dark';

    return (
        <Button
            variant="ghost"
            size="icon-sm"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => updateAppearance(isDark ? 'light' : 'dark')}
        >
            <HugeiconsIcon
                icon={isDark ? Sun03Icon : Moon02Icon}
                aria-hidden="true"
            />
        </Button>
    );
}

/**
 * Persistent shell for the component gallery: top bar, a left rail that
 * swaps between the category list and the preset customizer, and the page.
 */
export default function GalleryLayout({ children }: { children: ReactNode }) {
    const { url } = usePage();
    const preset = usePreset();
    const [customizing, toggleCustomizing] = useCustomizerRail();
    const [navOpen, setNavOpen] = useState(false);
    const path = url.split('?')[0];
    const onComponents = path === '/' || path.startsWith('/components');
    const style = styleDefinition(preset.style);

    return (
        <div className="flex min-h-svh flex-col bg-background text-foreground">
            <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur supports-backdrop-filter:bg-background/70">
                <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center gap-3 px-4 sm:px-6">
                    <Sheet open={navOpen} onOpenChange={setNavOpen}>
                        <SheetTrigger
                            render={
                                <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    className="lg:hidden"
                                    aria-label="Browse categories"
                                />
                            }
                        >
                            <HugeiconsIcon
                                icon={Menu01Icon}
                                aria-hidden="true"
                            />
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="w-80 overflow-y-auto"
                        >
                            <SheetHeader>
                                <SheetTitle>Components</SheetTitle>
                                <SheetDescription>
                                    Browse by category.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="px-4 pb-6">
                                <CategoryNav
                                    onNavigate={() => setNavOpen(false)}
                                />
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Wordmark />
                    <nav
                        aria-label="Primary"
                        className="ml-2 hidden items-center gap-1 md:flex"
                    >
                        <TopNavLink
                            href={components.url()}
                            active={onComponents}
                        >
                            Components
                        </TopNavLink>
                        <TopNavLink
                            href={blocks.url()}
                            active={path.startsWith('/blocks')}
                        >
                            Blocks
                        </TopNavLink>
                    </nav>
                    <div className="ml-auto flex items-center gap-2">
                        <div className="hidden sm:block">
                            <SearchCommand />
                        </div>
                        <ModeToggle />
                        <Button
                            variant={customizing ? 'secondary' : 'outline'}
                            size="sm"
                            className="hidden lg:inline-flex"
                            aria-pressed={customizing}
                            onClick={() => toggleCustomizing(!customizing)}
                        >
                            <HugeiconsIcon
                                icon={PaintBoardIcon}
                                data-icon="inline-start"
                                aria-hidden="true"
                            />
                            Customize
                        </Button>
                        <Sheet>
                            <SheetTrigger
                                render={
                                    <Button
                                        variant="outline"
                                        size="icon-sm"
                                        className="lg:hidden"
                                        aria-label="Customize theme"
                                    />
                                }
                            >
                                <HugeiconsIcon
                                    icon={PaintBoardIcon}
                                    aria-hidden="true"
                                />
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="w-80 overflow-y-auto"
                            >
                                <SheetHeader>
                                    <SheetTitle>Customize</SheetTitle>
                                    <SheetDescription>
                                        Style, colors, fonts, and radius.
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="px-4 pb-6">
                                    <Customizer />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>
            <div className="mx-auto flex w-full max-w-[1440px] flex-1">
                <aside
                    aria-label={customizing ? 'Theme customizer' : 'Categories'}
                    className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-72 shrink-0 flex-col overflow-y-auto border-r border-border px-4 py-5 lg:flex"
                >
                    {customizing ? (
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between px-1">
                                <div>
                                    <p className="text-sm font-medium">
                                        Customize
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {style.label} · {encodePreset(preset)}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleCustomizing(false)}
                                >
                                    Done
                                </Button>
                            </div>
                            <Customizer />
                        </div>
                    ) : (
                        <CategoryNav />
                    )}
                </aside>
                <main
                    id="main"
                    className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10"
                >
                    {children}
                </main>
            </div>
            <Toaster />
        </div>
    );
}
