import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';

export const meta = {
    name: 'Default',
    description: 'Outline buttons joined into one segmented control.',
};

export default function ButtonGroupDefaultDemo() {
    return (
        <ButtonGroup>
            <Button variant="outline">Day</Button>
            <Button variant="outline">Week</Button>
            <Button variant="outline">Month</Button>
        </ButtonGroup>
    );
}
