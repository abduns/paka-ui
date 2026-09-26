import { FilterIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import { categories, demoCount, demos } from '@/gallery/registry';
import { cn } from '@/lib/utils';
import { index, show } from '@/routes/components';

function NavRow({
    href,
    active,
    label,
    count,
    onNavigate,
}: {
    href: string;
    active: boolean;
    label: string;
    count: number;
    onNavigate?: () => void;
}) {
    return (
        <li>
            <Link
                href={href}
                onClick={onNavigate}
                aria-current={active ? 'page' : undefined}
                className={cn(
                    'flex h-8 items-center justify-between gap-3 rounded-md px-2.5 text-sm text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50',
                    active && 'bg-muted font-medium text-foreground',
                )}
            >
                <span className="truncate">{label}</span>
                <span className="text-xs text-muted-foreground/70 tabular-nums">
                    {count}
                </span>
            </Link>
        </li>
    );
}

/**
 * The left-hand category list. It filters locally, so it works the same in
 * the desktop sidebar and inside the mobile sheet.
 */
export function CategoryNav({ onNavigate }: { onNavigate?: () => void }) {
    const { url } = usePage();
    const [query, setQuery] = useState('');
    const path = url.split('?')[0];
    const normalized = query.trim().toLowerCase();
    const visible = categories.filter((category) =>
        category.name.toLowerCase().includes(normalized),
    );

    return (
        <nav aria-label="Component categories" className="flex flex-col gap-4">
            <InputGroup>
                <InputGroupAddon>
                    <HugeiconsIcon icon={FilterIcon} aria-hidden="true" />
                </InputGroupAddon>
                <InputGroupInput
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Filter categories…"
                    aria-label="Filter categories"
                />
            </InputGroup>
            <ul className="flex flex-col gap-0.5">
                <NavRow
                    href={index.url()}
                    active={path === '/' || path === index.url()}
                    label="All components"
                    count={demos.length}
                    onNavigate={onNavigate}
                />
            </ul>
            <div className="flex flex-col gap-2">
                <p className="px-2.5 text-xs font-medium text-muted-foreground">
                    Categories
                </p>
                <ul className="flex flex-col gap-0.5">
                    {visible.map((category) => (
                        <NavRow
                            key={category.slug}
                            href={show.url(category.slug)}
                            active={path === show.url(category.slug)}
                            label={category.name}
                            count={demoCount(category.slug)}
                            onNavigate={onNavigate}
                        />
                    ))}
                    {visible.length === 0 && (
                        <li className="px-2.5 py-2 text-sm text-muted-foreground">
                            No categories match “{query}”.
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
