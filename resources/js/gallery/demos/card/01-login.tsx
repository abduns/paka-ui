import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export const meta = {
    name: 'Login',
    description: 'A sign-in form with a footer link to sign up.',
};

export default function CardLoginDemo() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Sign in to Paka</CardTitle>
                <CardDescription>
                    Use your work email to continue.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-4">
                    <FieldGroup className="gap-4">
                        <Field>
                            <FieldLabel htmlFor="login-email">Email</FieldLabel>
                            <Input
                                id="login-email"
                                type="email"
                                placeholder="you@company.com"
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="login-password">
                                Password
                            </FieldLabel>
                            <PasswordInput
                                id="login-password"
                                placeholder="••••••••"
                            />
                            <FieldDescription>
                                <a href="#forgot">Forgot your password?</a>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                    <Button type="submit" className="w-full">
                        Sign in
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="justify-center text-sm text-muted-foreground">
                New to Paka?&nbsp;
                <a href="#signup" className="font-medium text-foreground">
                    Create an account
                </a>
            </CardFooter>
        </Card>
    );
}
