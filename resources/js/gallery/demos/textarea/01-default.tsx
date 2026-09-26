import { Textarea } from '@/components/ui/textarea';

export const meta = {
    name: 'Default',
    description: 'A multi-line input with placeholder text.',
};

export default function TextareaDefaultDemo() {
    return (
        <div className="w-full max-w-sm">
            <Textarea placeholder="Describe what changed in this release…" />
        </div>
    );
}
