import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';

export const meta = {
    name: 'Member',
    description: 'A profile preview when hovering a mention.',
};

export default function HoverCardMemberDemo() {
    return (
        <p className="text-sm text-muted-foreground">
            Invoice #1042 was approved by{' '}
            <HoverCard>
                <HoverCardTrigger
                    href="#"
                    className="font-medium text-foreground underline underline-offset-4"
                >
                    @maria
                </HoverCardTrigger>
                <HoverCardContent className="w-72">
                    <div className="flex items-start gap-3">
                        <Avatar size="lg">
                            <AvatarFallback>MK</AvatarFallback>
                        </Avatar>
                        <div className="flex min-w-0 flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Maria Kim</span>
                                <Badge variant="secondary">Admin</Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">
                                maria@acme.com
                            </span>
                            <p className="text-sm text-muted-foreground">
                                Finance lead at Acme. Joined March 2024.
                            </p>
                        </div>
                    </div>
                </HoverCardContent>
            </HoverCard>{' '}
            this morning.
        </p>
    );
}
