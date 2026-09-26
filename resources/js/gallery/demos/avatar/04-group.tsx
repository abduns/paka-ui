import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from '@/components/ui/avatar';

export const meta = {
    name: 'Group',
    description: 'Overlapping members with an overflow count.',
};

export default function AvatarGroupDemo() {
    return (
        <AvatarGroup>
            <Avatar>
                <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Priya Nair"
                />
                <AvatarFallback>PN</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarFallback>LS</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+9</AvatarGroupCount>
        </AvatarGroup>
    );
}
