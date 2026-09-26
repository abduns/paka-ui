<?php

function listPageSource(string $path): string
{
    return file_get_contents(dirname(__DIR__, 2).'/resources/js/'.$path);
}

test('list filter state goes through the shared useListFilters hook', function () {
    $hook = listPageSource('hooks/use-list-filters.ts');

    expect($hook)->toBeString()
        ->toContain('export function useListFilters')
        ->toContain('useClearFiltersOnEscape(hasActiveFilters, clearAll)')
        ->toContain("searchField = 'q'")
        ->toContain('preserveState: true')
        ->toContain('{ ...filters, ...next }');
});

test('the filter menu counts active fields and the chips clear one at a time', function () {
    $menu = listPageSource('components/filter-menu.tsx');
    $search = listPageSource('components/list-search.tsx');
    $chips = listPageSource('components/active-filters.tsx');

    expect($menu)->toBeString()
        ->toContain('data-test={testId}')
        ->toContain('FilterMailIcon')
        ->toContain('className="size-3.5"')
        ->toContain('const count = visibleFields.filter(fieldIsActive).length')
        ->and($search)->toBeString()
        ->toContain('SEARCH_DEBOUNCE_MS = 400')
        ->toContain('placeholder={placeholder}')
        ->and($chips)->toBeString()
        ->toContain('Cancel01Icon')
        ->not->toContain('icon: IconSvgElement')
        ->not->toContain('icon={icon}')
        ->not->toContain('icon={filter.icon}');
});
