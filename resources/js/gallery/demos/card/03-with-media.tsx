import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

export const meta = {
    name: 'With media',
    description: 'A cover area above the header, flush to the card edges.',
};

export default function CardWithMediaDemo() {
    return (
        <Card className="w-full max-w-sm pt-0">
            <div className="aspect-video w-full bg-muted text-border">
                <PlaceholderPattern className="size-full stroke-current" />
            </div>
            <CardHeader>
                <CardTitle>Marketing site</CardTitle>
                <CardDescription>
                    Deployed 2 hours ago from <code>main</code>.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Badge variant="success">Production</Badge>
            </CardContent>
            <CardFooter className="gap-2">
                <Button size="sm">Visit</Button>
                <Button size="sm" variant="outline">
                    View logs
                </Button>
            </CardFooter>
        </Card>
    );
}
