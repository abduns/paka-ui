import {
    Invoice01Icon,
    Rocket01Icon,
    UserGroupIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export const meta = {
    name: 'Default',
    description: 'A flyout of product areas beside plain links.',
    height: 'tall',
};

const product = [
    {
        title: 'Invoices',
        description: 'Send, track, and reconcile payments.',
        icon: Invoice01Icon,
    },
    {
        title: 'Deployments',
        description: 'Ship from any branch with previews.',
        icon: Rocket01Icon,
    },
    {
        title: 'Members',
        description: 'Roles, invitations, and access.',
        icon: UserGroupIcon,
    },
];

export default function NavigationMenuDefaultDemo() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-72 gap-1">
                            {product.map((item) => (
                                <li key={item.title}>
                                    <NavigationMenuLink
                                        href="#"
                                        className="flex-col items-start gap-1"
                                    >
                                        <span className="flex items-center gap-2 font-medium">
                                            <HugeiconsIcon icon={item.icon} />
                                            {item.title}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {item.description}
                                        </span>
                                    </NavigationMenuLink>
                                </li>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        href="#"
                        className={navigationMenuTriggerStyle()}
                    >
                        Pricing
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        href="#"
                        className={navigationMenuTriggerStyle()}
                    >
                        Docs
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
