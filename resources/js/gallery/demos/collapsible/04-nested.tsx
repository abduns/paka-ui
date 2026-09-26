import {
    ArrowRight01Icon,
    Folder01Icon,
    File01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { ReactNode } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';

export const meta = {
    name: 'Nested',
    description: 'Collapsibles inside collapsibles for a file tree.',
};

function Folder({
    name,
    children,
    defaultOpen,
}: {
    name: string;
    children: ReactNode;
    defaultOpen?: boolean;
}) {
    return (
        <Collapsible defaultOpen={defaultOpen} className="flex flex-col">
            <CollapsibleTrigger className="group/folder flex items-center gap-1.5 rounded-md px-2 py-1 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50">
                <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    className="size-3.5 text-muted-foreground transition-transform group-aria-expanded/folder:rotate-90"
                />
                <HugeiconsIcon
                    icon={Folder01Icon}
                    className="size-4 text-muted-foreground"
                />
                {name}
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-3 flex flex-col border-l pl-2">
                {children}
            </CollapsibleContent>
        </Collapsible>
    );
}

function File({ name }: { name: string }) {
    return (
        <div className="flex items-center gap-1.5 px-2 py-1 text-sm">
            <HugeiconsIcon
                icon={File01Icon}
                className="ml-5 size-4 text-muted-foreground"
            />
            {name}
        </div>
    );
}

export default function CollapsibleNestedDemo() {
    return (
        <div className="w-full max-w-xs">
            <Folder name="resources" defaultOpen>
                <Folder name="js" defaultOpen>
                    <File name="app.tsx" />
                    <File name="ssr.tsx" />
                </Folder>
                <Folder name="css">
                    <File name="app.css" />
                </Folder>
            </Folder>
            <Folder name="routes">
                <File name="web.php" />
            </Folder>
        </div>
    );
}
