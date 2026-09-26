import {
    Progress,
    ProgressLabel,
    ProgressValue,
} from '@/components/ui/progress';

export const meta = {
    name: 'Sizes and colors',
    description: 'Style the track and indicator through their data slots.',
};

export default function ProgressSizesColorsDemo() {
    return (
        <div className="flex w-full max-w-sm flex-col gap-6">
            <Progress value={80} className="**:data-[slot=progress-track]:h-1">
                <ProgressLabel>Thin</ProgressLabel>
                <ProgressValue />
            </Progress>
            <Progress value={45} className="**:data-[slot=progress-track]:h-3">
                <ProgressLabel>Thick</ProgressLabel>
                <ProgressValue />
            </Progress>
            <Progress
                value={100}
                className="**:data-[slot=progress-indicator]:bg-success"
            >
                <ProgressLabel>Deployment complete</ProgressLabel>
                <ProgressValue />
            </Progress>
            <Progress
                value={92}
                className="**:data-[slot=progress-indicator]:bg-warning"
            >
                <ProgressLabel>Spend limit</ProgressLabel>
                <ProgressValue />
            </Progress>
            <Progress
                value={100}
                className="**:data-[slot=progress-indicator]:bg-destructive"
            >
                <ProgressLabel>Storage full</ProgressLabel>
                <ProgressValue />
            </Progress>
        </div>
    );
}
