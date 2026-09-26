import {
    Notification03Icon,
    Settings02Icon,
    UserMultipleIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const meta = {
    name: 'With icons',
    description: 'Triggers with a leading icon next to the label.',
};

export default function TabsWithIconsDemo() {
    return (
        <Tabs defaultValue="members" className="w-full max-w-sm">
            <TabsList>
                <TabsTrigger value="members">
                    <HugeiconsIcon
                        icon={UserMultipleIcon}
                        data-icon="inline-start"
                    />
                    Members
                </TabsTrigger>
                <TabsTrigger value="notifications">
                    <HugeiconsIcon
                        icon={Notification03Icon}
                        data-icon="inline-start"
                    />
                    Notifications
                </TabsTrigger>
                <TabsTrigger value="settings">
                    <HugeiconsIcon
                        icon={Settings02Icon}
                        data-icon="inline-start"
                    />
                    Settings
                </TabsTrigger>
            </TabsList>
            <TabsContent value="members" className="text-muted-foreground">
                Invite teammates and manage their roles.
            </TabsContent>
            <TabsContent
                value="notifications"
                className="text-muted-foreground"
            >
                Choose which events reach your inbox.
            </TabsContent>
            <TabsContent value="settings" className="text-muted-foreground">
                Rename the workspace or change its region.
            </TabsContent>
        </Tabs>
    );
}
