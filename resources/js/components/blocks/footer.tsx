import { Brand } from '@/components/blocks/shared';
import type { FooterProps } from '@/registry/schemas';

export function Footer({
    brand,
    homeHref,
    description,
    links,
    copyright,
}: FooterProps) {
    return (
        <footer className="border-t border-border">
            <div className="paka-container flex flex-col gap-12 py-12">
                <div className="flex flex-col justify-between gap-9 md:flex-row">
                    <div className="flex max-w-sm min-w-0 flex-col items-start gap-4">
                        <Brand name={brand} href={homeHref} />
                        {description && (
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </div>
                    {links.length > 0 && (
                        <nav
                            aria-label="Footer navigation"
                            className="flex flex-wrap items-start gap-x-8 gap-y-4"
                        >
                            {links.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    )}
                </div>
                <p className="text-xs text-muted-foreground">{copyright}</p>
            </div>
        </footer>
    );
}
