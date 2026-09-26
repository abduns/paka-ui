import { Kbd, KbdGroup } from '@/components/ui/kbd';

export const meta = {
    name: 'Combinations',
    description: 'Group keys that are pressed together.',
    height: 'compact',
};

export default function KbdCombinationDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
                Search
                <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                </KbdGroup>
            </span>
            <span className="flex items-center gap-2">
                New invoice
                <KbdGroup>
                    <Kbd>Ctrl</Kbd>
                    <Kbd>⇧</Kbd>
                    <Kbd>N</Kbd>
                </KbdGroup>
            </span>
        </div>
    );
}
