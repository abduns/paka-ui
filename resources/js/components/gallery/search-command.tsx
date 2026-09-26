import { Search01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import { categories, demoCount, demos } from '@/gallery/registry';
import { show } from '@/routes/components';

/**
 * ⌘K palette that jumps to a category or straight to a demo.
 */
export function SearchCommand() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                setOpen((current) => !current);
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => document.removeEventListener('keydown', onKeyDown);
    }, []);

    const visit = (url: string) => {
        setOpen(false);
        router.visit(url);
    };

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-muted-foreground sm:w-56 md:w-64"
                onClick={() => setOpen(true)}
            >
                <HugeiconsIcon
                    icon={Search01Icon}
                    data-icon="inline-start"
                    aria-hidden="true"
                />
                <span className="flex-1 text-left">Search components…</span>
                <KbdGroup className="hidden sm:flex">
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                </KbdGroup>
            </Button>
            <CommandDialog
                open={open}
                onOpenChange={setOpen}
                title="Search components"
                description="Jump to a category or a demo."
            >
                <CommandInput placeholder="Search components…" />
                <CommandList>
                    <CommandEmpty>No results.</CommandEmpty>
                    <CommandGroup heading="Categories">
                        {categories.map((category) => (
                            <CommandItem
                                key={category.slug}
                                value={`${category.name} ${category.slug}`}
                                onSelect={() => visit(show.url(category.slug))}
                            >
                                {category.name}
                                <span className="ml-auto text-xs text-muted-foreground">
                                    {demoCount(category.slug)}
                                </span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandGroup heading="Demos">
                        {demos.map((demo) => (
                            <CommandItem
                                key={demo.id}
                                value={`${demo.category} ${demo.name} ${demo.description}`}
                                onSelect={() =>
                                    visit(
                                        `${show.url(demo.category)}#${demo.id.split('/')[1]}`,
                                    )
                                }
                            >
                                {demo.name}
                                <span className="ml-auto text-xs text-muted-foreground">
                                    {demo.category}
                                </span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
