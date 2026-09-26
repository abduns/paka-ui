import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const meta = {
    name: 'Sizes',
    description: 'Small, default, and large avatars.',
};

export default function AvatarSizesDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <Avatar size="sm">
                <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Priya Nair"
                />
                <AvatarFallback>PN</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Priya Nair"
                />
                <AvatarFallback>PN</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
                <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Priya Nair"
                />
                <AvatarFallback>PN</AvatarFallback>
            </Avatar>
        </div>
    );
}
