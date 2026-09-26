import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const meta = {
    name: 'Notification',
    description: 'A compact card with an avatar, message, and inline actions.',
};

export default function CardNotificationDemo() {
    return (
        <Card size="sm" className="w-full max-w-sm">
            <CardContent className="flex items-start gap-3">
                <Avatar>
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="Priya Nair"
                    />
                    <AvatarFallback>PN</AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <p>
                        <span className="font-medium">Priya Nair</span> invited
                        you to the <span className="font-medium">Design</span>{' '}
                        workspace.
                    </p>
                    <p className="text-xs text-muted-foreground">
                        12 minutes ago
                    </p>
                    <div className="flex gap-2">
                        <Button size="xs">Accept</Button>
                        <Button size="xs" variant="outline">
                            Decline
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
