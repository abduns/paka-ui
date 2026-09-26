import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const meta = {
    name: 'Sliding',
    description: 'An animated indicator that glides to the active tab.',
};

export default function TabsSlidingDemo() {
    return (
        <Tabs defaultValue="production" className="w-full max-w-sm">
            <TabsList variant="sliding">
                <TabsTrigger value="production">Production</TabsTrigger>
                <TabsTrigger value="staging">Staging</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="production" className="text-muted-foreground">
                Serving acme.com from EU West.
            </TabsContent>
            <TabsContent value="staging" className="text-muted-foreground">
                Last deployed from main, 2 hours ago.
            </TabsContent>
            <TabsContent value="preview" className="text-muted-foreground">
                6 open pull requests with preview links.
            </TabsContent>
        </Tabs>
    );
}
