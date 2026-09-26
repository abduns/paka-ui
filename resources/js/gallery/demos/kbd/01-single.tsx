import { Kbd } from '@/components/ui/kbd';

export const meta = {
    name: 'Single keys',
    description: 'Individual keys and modifiers.',
    height: 'compact',
};

export default function KbdSingleDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2">
            <Kbd>⌘</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>⌥</Kbd>
            <Kbd>Ctrl</Kbd>
            <Kbd>Esc</Kbd>
            <Kbd>↵</Kbd>
        </div>
    );
}
