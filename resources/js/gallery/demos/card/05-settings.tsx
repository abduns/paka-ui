import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export const meta = {
    name: 'Settings',
    description: 'A single setting with save and cancel actions in the footer.',
};

export default function CardSettingsDemo() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Workspace name</CardTitle>
                <CardDescription>
                    Shown in the sidebar and on invoices.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Field>
                    <FieldLabel htmlFor="workspace-name" className="sr-only">
                        Workspace name
                    </FieldLabel>
                    <Input
                        id="workspace-name"
                        placeholder="Workspace name"
                        defaultValue="Acme Design"
                    />
                    <FieldDescription>Max 32 characters.</FieldDescription>
                </Field>
            </CardContent>
            <CardFooter className="justify-end gap-2">
                <Button variant="ghost" size="sm">
                    Cancel
                </Button>
                <Button size="sm">Save</Button>
            </CardFooter>
        </Card>
    );
}
