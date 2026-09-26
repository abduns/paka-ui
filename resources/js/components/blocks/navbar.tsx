import { Menu01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useRef, useState } from 'react';
import { Brand, BlockAction } from '@/components/blocks/shared';
import { Button } from '@/components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { NavbarProps } from '@/registry/schemas';

export function Navbar({ brand, homeHref, links, action }: NavbarProps) {
    const [open, setOpen] = useState(false);
    const trigger = useRef<HTMLButtonElement>(null);

    return (
        <header className="border-b border-border">
            <Collapsible
                open={open}
                onOpenChange={setOpen}
                className="paka-container"
                onKeyDown={(event) => {
                    if (event.key === 'Escape' && open) {
                        setOpen(false);
                        trigger.current?.focus();
                    }
                }}
            >
                <div className="flex min-h-24 items-center justify-between gap-5 py-5">
                    <Brand name={brand} href={homeHref} />
                    <nav
                        aria-label="Main navigation"
                        className="hidden min-w-0 items-center gap-8 lg:flex"
                    >
                        {links.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                    {action && (
                        <div className="hidden max-w-64 lg:block">
                            <BlockAction action={action} />
                        </div>
                    )}
                    <CollapsibleTrigger
                        ref={trigger}
                        render={<Button variant="outline" size="icon-lg" />}
                        className="shrink-0 lg:hidden"
                        aria-label={
                            open ? 'Close navigation' : 'Open navigation'
                        }
                    >
                        <HugeiconsIcon icon={Menu01Icon} aria-hidden="true" />
                    </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="lg:hidden">
                    <nav
                        aria-label="Mobile navigation"
                        className="flex flex-col items-start gap-2 border-t border-border py-5"
                    >
                        {links.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className="w-full py-3 font-medium"
                                onClick={() => setOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        {action && (
                            <div onClick={() => setOpen(false)}>
                                <BlockAction action={action} />
                            </div>
                        )}
                    </nav>
                </CollapsibleContent>
            </Collapsible>
        </header>
    );
}
