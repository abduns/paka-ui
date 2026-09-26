import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';

export const meta = {
    name: 'Nested',
    description: 'Groups inside a group are spaced apart automatically.',
};

export default function ButtonGroupNestedDemo() {
    return (
        <ButtonGroup>
            <ButtonGroup>
                <Button variant="outline" size="icon" aria-label="Previous">
                    <HugeiconsIcon icon={ArrowLeft01Icon} />
                </Button>
                <Button variant="outline" size="icon" aria-label="Next">
                    <HugeiconsIcon icon={ArrowRight01Icon} />
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button variant="outline">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
            </ButtonGroup>
        </ButtonGroup>
    );
}
