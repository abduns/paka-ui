import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export const meta = {
    name: 'Two columns',
    description: 'A featured panel next to a list of links.',
    height: 'tall',
};

const resources = [
    { title: 'Documentation', description: 'Guides and API reference.' },
    { title: 'Changelog', description: 'What shipped this week.' },
    { title: 'Status', description: 'Uptime across every region.' },
];

export default function NavigationMenuTwoColumnDemo() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid w-[calc(100vw-2rem)] max-w-md gap-2 sm:grid-cols-[1fr_1.2fr]">
                            <NavigationMenuLink
                                href="#"
                                className="flex-col items-start justify-end gap-1 rounded-md bg-muted p-4"
                            >
                                <span className="font-heading text-base font-medium">
                                    Paka
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    Invoices, deployments, and your team in one
                                    workspace.
                                </span>
                            </NavigationMenuLink>
                            <ul className="flex flex-col gap-1">
                                {resources.map((item) => (
                                    <li key={item.title}>
                                        <NavigationMenuLink
                                            href="#"
                                            className="flex-col items-start gap-0.5"
                                        >
                                            <span className="font-medium">
                                                {item.title}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {item.description}
                                            </span>
                                        </NavigationMenuLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="flex w-48 flex-col gap-1">
                            {['About', 'Customers', 'Careers', 'Contact'].map(
                                (label) => (
                                    <li key={label}>
                                        <NavigationMenuLink href="#">
                                            {label}
                                        </NavigationMenuLink>
                                    </li>
                                ),
                            )}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
