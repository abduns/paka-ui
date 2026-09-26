import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export const meta = {
    name: 'Loading',
    description:
        'Disable the button and show a Spinner while work is in flight.',
};

export default function ButtonLoadingDemo() {
    const [saving, setSaving] = useState(false);

    function handleSave() {
        setSaving(true);
        window.setTimeout(() => setSaving(false), 1500);
    }

    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <Button disabled>
                <Spinner data-icon="inline-start" />
                Deploying
            </Button>
            <Button variant="outline" disabled={saving} onClick={handleSave}>
                {saving && <Spinner data-icon="inline-start" />}
                {saving ? 'Saving…' : 'Save changes'}
            </Button>
        </div>
    );
}
