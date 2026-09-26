import { Button } from '@/components/ui/button';
import { ButtonGroup, ButtonGroupText } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';

export const meta = {
    name: 'With text',
    description: 'A static prefix, an input, and an action in one row.',
};

export default function ButtonGroupWithTextDemo() {
    return (
        <ButtonGroup className="w-full max-w-sm">
            <ButtonGroupText>paka.app/</ButtonGroupText>
            <Input placeholder="acme-design" aria-label="Workspace slug" />
            <Button variant="outline">Check</Button>
        </ButtonGroup>
    );
}
