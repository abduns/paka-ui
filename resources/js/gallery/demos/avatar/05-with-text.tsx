import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const meta = {
    name: 'With text',
    description: 'An avatar beside a name and secondary line.',
};

export default function AvatarWithTextDemo() {
    return (
        <div className="flex items-center gap-3">
            <Avatar size="lg">
                <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Priya Nair"
                />
                <AvatarFallback>PN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">Priya Nair</span>
                <span className="text-xs text-muted-foreground">
                    Owner · priya@acme.co
                </span>
            </div>
        </div>
    );
}
