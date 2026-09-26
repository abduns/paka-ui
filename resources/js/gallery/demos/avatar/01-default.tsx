import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const meta = {
    name: 'Default',
    description: 'An image avatar with an initials fallback while it loads.',
};

export default function AvatarDefaultDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <Avatar>
                <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Priya Nair"
                />
                <AvatarFallback>PN</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
        </div>
    );
}
