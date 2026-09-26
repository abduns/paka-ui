import {
    Add01Icon,
    MinusSignIcon,
    RefreshIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';

export const meta = {
    name: 'Vertical',
    description: 'Stack icon buttons vertically, like map or canvas controls.',
};

export default function ButtonGroupVerticalDemo() {
    return (
        <ButtonGroup orientation="vertical">
            <Button variant="outline" size="icon" aria-label="Zoom in">
                <HugeiconsIcon icon={Add01Icon} />
            </Button>
            <Button variant="outline" size="icon" aria-label="Zoom out">
                <HugeiconsIcon icon={MinusSignIcon} />
            </Button>
            <Button variant="outline" size="icon" aria-label="Reset">
                <HugeiconsIcon icon={RefreshIcon} />
            </Button>
        </ButtonGroup>
    );
}
