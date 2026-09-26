import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export const meta = {
    name: 'File',
    description: 'A native file picker styled to match.',
};

export default function InputFileDemo() {
    return (
        <div className="w-full max-w-sm">
            <Field>
                <FieldLabel htmlFor="workspace-logo">Workspace logo</FieldLabel>
                <Input
                    id="workspace-logo"
                    type="file"
                    accept="image/*"
                    placeholder="Choose a file"
                />
                <FieldDescription>PNG or SVG, up to 2 MB.</FieldDescription>
            </Field>
        </div>
    );
}
