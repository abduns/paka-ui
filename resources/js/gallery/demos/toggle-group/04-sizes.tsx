import { GridViewIcon, LayoutListIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export const meta = {
    name: 'Sizes',
    description: 'Small, default, and large groups for a view switcher.',
    height: 'compact',
};

export default function ToggleGroupSizesDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-4">
            <ToggleGroup
                size="sm"
                variant="outline"
                defaultValue={['grid']}
                aria-label="View"
            >
                <ToggleGroupItem value="grid" aria-label="Grid view">
                    <HugeiconsIcon icon={GridViewIcon} />
                </ToggleGroupItem>
                <ToggleGroupItem value="list" aria-label="List view">
                    <HugeiconsIcon icon={LayoutListIcon} />
                </ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup
                variant="outline"
                defaultValue={['grid']}
                aria-label="View"
            >
                <ToggleGroupItem value="grid" aria-label="Grid view">
                    <HugeiconsIcon icon={GridViewIcon} />
                </ToggleGroupItem>
                <ToggleGroupItem value="list" aria-label="List view">
                    <HugeiconsIcon icon={LayoutListIcon} />
                </ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup
                size="lg"
                variant="outline"
                defaultValue={['grid']}
                aria-label="View"
            >
                <ToggleGroupItem value="grid" aria-label="Grid view">
                    <HugeiconsIcon icon={GridViewIcon} />
                </ToggleGroupItem>
                <ToggleGroupItem value="list" aria-label="List view">
                    <HugeiconsIcon icon={LayoutListIcon} />
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    );
}
