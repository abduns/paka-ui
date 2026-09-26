import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export const meta = {
    name: 'Form',
    description: 'A dialog that collects input and submits it.',
};

export default function DialogFormDemo() {
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState<string | null>('member');

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const email = new FormData(event.currentTarget).get('email');

        toast.success(`Invitation sent to ${email}`);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button />}>Invite member</DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <DialogHeader>
                        <DialogTitle>Invite a member</DialogTitle>
                        <DialogDescription>
                            They will get an email with a link to join the Acme
                            workspace.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="invite-email">
                                Email
                            </FieldLabel>
                            <Input
                                id="invite-email"
                                name="email"
                                type="email"
                                placeholder="maria@acme.com"
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="invite-role">Role</FieldLabel>
                            <Select value={role} onValueChange={setRole}>
                                <SelectTrigger
                                    id="invite-role"
                                    className="w-full"
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="admin">
                                            Admin
                                        </SelectItem>
                                        <SelectItem value="member">
                                            Member
                                        </SelectItem>
                                        <SelectItem value="viewer">
                                            Viewer
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FieldDescription>
                                Admins can manage billing and members.
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline" />}>
                            Cancel
                        </DialogClose>
                        <Button type="submit">Send invite</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
