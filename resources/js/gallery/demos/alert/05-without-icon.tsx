import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const meta = {
    name: 'Without icon',
    description: 'A plain alert that relies on copy alone.',
};

export default function AlertWithoutIconDemo() {
    return (
        <Alert className="max-w-md">
            <AlertTitle>New member joined</AlertTitle>
            <AlertDescription>
                Priya Nair accepted the invitation to the Design workspace and
                was given the Editor role.
            </AlertDescription>
        </Alert>
    );
}
