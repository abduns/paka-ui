import {
    Copy01Icon,
    SourceCodeIcon,
    Tick02Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useId, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import type { Demo } from '@/gallery/registry';
import { useClipboard } from '@/hooks/use-clipboard';
import { cn } from '@/lib/utils';

const HEIGHTS: Record<Demo['height'], string> = {
    compact: 'min-h-36',
    default: 'min-h-56',
    tall: 'min-h-96',
};

export function demoAnchor(demo: Demo): string {
    return demo.id.split('/')[1];
}

/**
 * One example: a live preview above a caption bar with copy and view-code
 * actions, the same shape as a ReUI component card.
 */
export function DemoCard({ demo }: { demo: Demo }) {
    const [showCode, setShowCode] = useState(false);
    const [copiedText, copy] = useClipboard();
    const codeId = useId();
    const Preview = demo.component;
    const copied = copiedText === demo.source;

    const copySource = async () => {
        if (await copy(demo.source)) {
            toast.success('Code copied', { description: demo.name });
        }
    };

    return (
        <article
            id={demoAnchor(demo)}
            aria-labelledby={`${codeId}-title`}
            className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card text-card-foreground"
        >
            <div
                className={cn(
                    'flex items-center justify-center bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[16px_16px] p-6 sm:p-10',
                    HEIGHTS[demo.height],
                )}
            >
                <div className="flex w-full max-w-xl justify-center">
                    <Preview />
                </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-muted/40 px-4 py-2.5">
                <div className="flex min-w-0 flex-col">
                    <h3 id={`${codeId}-title`} className="text-sm font-medium">
                        {demo.name}
                    </h3>
                    <p className="truncate text-xs text-muted-foreground">
                        {demo.description}
                    </p>
                </div>
                <div className="flex items-center gap-1.5">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={copySource}
                        aria-label={`Copy code for ${demo.name}`}
                    >
                        <HugeiconsIcon
                            icon={copied ? Tick02Icon : Copy01Icon}
                            data-icon="inline-start"
                            aria-hidden="true"
                        />
                        {copied ? 'Copied' : 'Copy'}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        aria-expanded={showCode}
                        aria-controls={codeId}
                        onClick={() => setShowCode((open) => !open)}
                    >
                        <HugeiconsIcon
                            icon={SourceCodeIcon}
                            data-icon="inline-start"
                            aria-hidden="true"
                        />
                        {showCode ? 'Hide code' : 'View code'}
                    </Button>
                </div>
            </div>
            {showCode && (
                <pre
                    id={codeId}
                    tabIndex={0}
                    className="max-h-[28rem] overflow-auto border-t border-border bg-background p-4 font-mono text-xs leading-relaxed"
                >
                    <code>{demo.source}</code>
                </pre>
            )}
        </article>
    );
}
