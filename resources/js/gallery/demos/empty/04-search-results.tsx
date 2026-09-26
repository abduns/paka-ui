import { Search01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';

export const meta = {
    name: 'Search results',
    description: 'Echo the query back and offer a way to clear it.',
};

export default function EmptySearchResultsDemo() {
    const [query, setQuery] = useState('acme-legacy');

    return (
        <div className="flex w-full max-w-sm flex-col gap-4">
            <InputGroup>
                <InputGroupAddon>
                    <HugeiconsIcon icon={Search01Icon} />
                </InputGroupAddon>
                <InputGroupInput
                    placeholder="Search workspaces"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
            </InputGroup>
            <Empty className="p-8">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <HugeiconsIcon icon={Search01Icon} />
                    </EmptyMedia>
                    <EmptyTitle>No results</EmptyTitle>
                    <EmptyDescription>
                        {query
                            ? `Nothing matches "${query}". Check the spelling or try a shorter term.`
                            : 'Type to search your workspaces.'}
                    </EmptyDescription>
                </EmptyHeader>
                {query && (
                    <EmptyContent>
                        <Button variant="outline" onClick={() => setQuery('')}>
                            Clear search
                        </Button>
                    </EmptyContent>
                )}
            </Empty>
        </div>
    );
}
