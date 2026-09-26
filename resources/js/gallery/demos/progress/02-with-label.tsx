import {
    Progress,
    ProgressLabel,
    ProgressValue,
} from '@/components/ui/progress';

export const meta = {
    name: 'With label',
    description: 'A label and formatted value above the track.',
    height: 'compact',
};

export default function ProgressWithLabelDemo() {
    return (
        <div className="w-full max-w-sm">
            <Progress value={62}>
                <ProgressLabel>Uploading invoices.csv</ProgressLabel>
                <ProgressValue />
            </Progress>
        </div>
    );
}
