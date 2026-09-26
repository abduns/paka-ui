import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export const meta = {
    name: 'Default',
    description: 'A select with grouped options and a placeholder.',
};

export default function SelectDefaultDemo() {
    return (
        <Select>
            <SelectTrigger className="w-56">
                <SelectValue placeholder="Choose a workspace" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Personal</SelectLabel>
                    <SelectItem value="sandbox">Sandbox</SelectItem>
                    <SelectItem value="side-projects">Side projects</SelectItem>
                </SelectGroup>
                <SelectGroup>
                    <SelectLabel>Teams</SelectLabel>
                    <SelectItem value="acme">Acme Inc.</SelectItem>
                    <SelectItem value="northwind">Northwind</SelectItem>
                    <SelectItem value="globex">Globex</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
