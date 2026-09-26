import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export const meta = {
    name: 'Small',
    description: 'The sm size tightens padding for dense dashboards.',
};

export default function CardSmallDemo() {
    return (
        <div className="grid w-full max-w-sm grid-cols-2 gap-3">
            <Card size="sm">
                <CardHeader>
                    <CardDescription>Deployments</CardDescription>
                    <CardTitle className="text-xl tabular-nums">128</CardTitle>
                </CardHeader>
                <CardContent>
                    <Badge variant="success">All passing</Badge>
                </CardContent>
            </Card>
            <Card size="sm">
                <CardHeader>
                    <CardDescription>Open invoices</CardDescription>
                    <CardTitle className="text-xl tabular-nums">7</CardTitle>
                </CardHeader>
                <CardContent>
                    <Badge variant="amber">2 overdue</Badge>
                </CardContent>
            </Card>
        </div>
    );
}
