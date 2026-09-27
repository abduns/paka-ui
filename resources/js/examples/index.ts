import type { PageConfig } from '@/renderer/validate-page';

type PageExample = {
    name: string;
    category: string;
    config: PageConfig;
};

export const examples: Record<string, PageExample> = {};

export function isExample(name: string): name is keyof typeof examples {
    return Object.hasOwn(examples, name);
}
