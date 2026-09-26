import {
    Progress,
    ProgressLabel,
    ProgressValue,
} from '@/components/ui/progress';

export const meta = {
    name: 'Custom format',
    description: 'Show raw units instead of a percentage.',
    height: 'compact',
};

export default function ProgressCustomFormatDemo() {
    return (
        <div className="flex w-full max-w-sm flex-col gap-6">
            <Progress value={38} max={50}>
                <ProgressLabel>Storage</ProgressLabel>
                <ProgressValue>
                    {(_, value) => `${value} GB of 50 GB`}
                </ProgressValue>
            </Progress>
            <Progress value={7} max={10}>
                <ProgressLabel>Team seats</ProgressLabel>
                <ProgressValue>
                    {(_, value) => `${value} of 10 used`}
                </ProgressValue>
            </Progress>
        </div>
    );
}
