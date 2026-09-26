import type { IconSvgElement } from '@hugeicons/react';
import { HugeiconsIcon } from '@hugeicons/react';

export function NavIcon({
    icon,
    solidIcon,
    isActive = false,
}: {
    icon: IconSvgElement;
    solidIcon?: IconSvgElement | null;
    isActive?: boolean;
}) {
    return (
        <HugeiconsIcon
            icon={icon}
            altIcon={solidIcon ?? undefined}
            showAlt={isActive}
        />
    );
}
