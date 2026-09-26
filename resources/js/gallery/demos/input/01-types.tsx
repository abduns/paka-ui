import PasswordInput from '@/components/password-input';
import { Input } from '@/components/ui/input';

export const meta = {
    name: 'Types',
    description: 'Text, email, password, and number inputs.',
};

export default function InputTypesDemo() {
    return (
        <div className="flex w-full max-w-sm flex-col gap-3">
            <Input type="text" placeholder="Workspace name" />
            <Input type="email" placeholder="you@acme.com" />
            <PasswordInput placeholder="Password" />
            <Input type="number" placeholder="Spend limit (USD)" min={0} />
        </div>
    );
}
