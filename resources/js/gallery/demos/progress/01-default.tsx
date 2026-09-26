import { Progress } from '@/components/ui/progress';

export const meta = {
    name: 'Default',
    description: 'A determinate bar at a fixed value.',
    height: 'compact',
};

export default function ProgressDefaultDemo() {
    return (
        <div className="w-full max-w-sm">
            <Progress value={62} aria-label="Upload progress" />
        </div>
    );
}
