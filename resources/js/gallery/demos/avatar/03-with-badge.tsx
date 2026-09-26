import { Tick02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar';

export const meta = {
    name: 'With badge',
    description: 'A status dot or icon anchored to the bottom-right corner.',
};

export default function AvatarWithBadgeDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <Avatar>
                <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Priya Nair"
                />
                <AvatarFallback>PN</AvatarFallback>
                <AvatarBadge className="bg-success" />
            </Avatar>
            <Avatar size="lg">
                <AvatarFallback>MK</AvatarFallback>
                <AvatarBadge>
                    <HugeiconsIcon icon={Tick02Icon} strokeWidth={3} />
                </AvatarBadge>
            </Avatar>
        </div>
    );
}
