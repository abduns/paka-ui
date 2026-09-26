import {
    DashboardSquare01Icon,
    Invoice01Icon,
    Rocket01Icon,
    Settings01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState } from 'react';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';

export const meta = {
    name: 'Links only',
    description: 'A flat list of links with an active state.',
    height: 'compact',
};

const links = [
    { label: 'Overview', icon: DashboardSquare01Icon },
    { label: 'Invoices', icon: Invoice01Icon },
    { label: 'Deployments', icon: Rocket01Icon },
    { label: 'Settings', icon: Settings01Icon },
];

export default function NavigationMenuLinksDemo() {
    const [active, setActive] = useState('Overview');

    return (
        <NavigationMenu>
            <NavigationMenuList className="flex-wrap gap-1">
                {links.map((link) => (
                    <NavigationMenuItem key={link.label}>
                        <NavigationMenuLink
                            href="#"
                            active={active === link.label}
                            onClick={(event) => {
                                event.preventDefault();
                                setActive(link.label);
                            }}
                        >
                            <HugeiconsIcon icon={link.icon} />
                            {link.label}
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
