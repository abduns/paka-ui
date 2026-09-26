import { Button } from '@/components/ui/button';
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
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';

export const meta = {
    name: 'With form',
    description: 'An invite form inside a sheet with a sticky footer.',
};

export default function SheetWithFormDemo() {
    return (
        <Sheet>
            <SheetTrigger render={<Button />}>Invite member</SheetTrigger>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Invite a member</SheetTitle>
                    <SheetDescription>
                        They will get an email with a link to join Acme Inc.
                    </SheetDescription>
                </SheetHeader>
                <form
                    className="flex flex-col gap-4 px-4"
                    onSubmit={(event) => event.preventDefault()}
                >
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="invite-email">
                                Email
                            </FieldLabel>
                            <Input
                                id="invite-email"
                                type="email"
                                placeholder="teammate@acme.com"
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="invite-role">Role</FieldLabel>
                            <Select defaultValue="member">
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
                                Viewers can't trigger deployments.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="invite-note">
                                Note (optional)
                            </FieldLabel>
                            <Textarea
                                id="invite-note"
                                placeholder="Welcome to the team!"
                            />
                        </Field>
                    </FieldGroup>
                </form>
                <SheetFooter>
                    <Button type="submit">Send invite</Button>
                    <SheetClose render={<Button variant="outline" />}>
                        Cancel
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
