import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const meta = {
    name: 'Vertical',
    description: 'A stacked tab list with content beside it.',
};

export default function TabsVerticalDemo() {
    return (
        <Tabs
            defaultValue="general"
            orientation="vertical"
            className="w-full max-w-sm"
        >
            <TabsList variant="line">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="domains">Domains</TabsTrigger>
                <TabsTrigger value="danger">Danger zone</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="text-muted-foreground">
                Workspace name, slug, and default region.
            </TabsContent>
            <TabsContent value="domains" className="text-muted-foreground">
                acme.com and 2 preview domains are verified.
            </TabsContent>
            <TabsContent value="danger" className="text-muted-foreground">
                Transfer ownership or delete this workspace.
            </TabsContent>
        </Tabs>
    );
}
