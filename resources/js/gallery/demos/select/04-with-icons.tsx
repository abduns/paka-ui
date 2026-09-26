import {
    Building03Icon,
    Globe02Icon,
    UserIcon,
    UserMultipleIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export const meta = {
    name: 'With icons',
    description: 'Options with leading icons that carry into the trigger.',
};

export default function SelectWithIconsDemo() {
    return (
        <Select defaultValue="workspace">
            <SelectTrigger className="w-56">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="private">
                        <HugeiconsIcon icon={UserIcon} />
                        Only me
                    </SelectItem>
                    <SelectItem value="members">
                        <HugeiconsIcon icon={UserMultipleIcon} />
                        Invited members
                    </SelectItem>
                    <SelectItem value="workspace">
                        <HugeiconsIcon icon={Building03Icon} />
                        Whole workspace
                    </SelectItem>
                    <SelectItem value="public">
                        <HugeiconsIcon icon={Globe02Icon} />
                        Anyone with the link
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
