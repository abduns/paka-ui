import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const meta = {
    name: 'Default',
    description: 'Filled tabs switching between workspace sections.',
};

export default function TabsDefaultDemo() {
    return (
        <Tabs defaultValue="overview" className="w-full max-w-sm">
            <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="text-muted-foreground">
                Acme Inc. has 3 active deployments across 2 regions.
            </TabsContent>
            <TabsContent value="members" className="text-muted-foreground">
                12 members, 2 pending invitations.
            </TabsContent>
            <TabsContent value="billing" className="text-muted-foreground">
                Team plan, renews on Oct 1 for $288.00.
            </TabsContent>
        </Tabs>
    );
}
