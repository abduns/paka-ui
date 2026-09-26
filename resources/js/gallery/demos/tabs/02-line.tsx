import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const meta = {
    name: 'Line',
    description: 'Underline-style tabs with a transparent list.',
};

export default function TabsLineDemo() {
    return (
        <Tabs defaultValue="all" className="w-full max-w-sm">
            <TabsList variant="line">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="text-muted-foreground">
                48 invoices totalling $31,400.
            </TabsContent>
            <TabsContent value="paid" className="text-muted-foreground">
                41 invoices paid on time.
            </TabsContent>
            <TabsContent value="overdue" className="text-muted-foreground">
                4 invoices past due, oldest by 12 days.
            </TabsContent>
            <TabsContent value="draft" className="text-muted-foreground">
                3 drafts waiting to be sent.
            </TabsContent>
        </Tabs>
    );
}
