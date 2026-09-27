import type { BlockType } from '@/registry';
import { blockRegistry } from '@/registry';

export const contentSamples = ['default', 'long', 'minimal'] as const;
export type ContentSample = (typeof contentSamples)[number];

export function blockPreviewConfig(
    type: BlockType,
    sample: ContentSample = 'default',
): unknown {
    const block = blockRegistry[type];
    const props: Record<string, unknown> = structuredClone(block.defaultProps);

    if (sample === 'minimal') {
        for (const key of [
            'eyebrow',
            'description',
            'secondaryAction',
            'note',
            'image',
            'action',
        ]) {
            delete props[key];
        }
    }

    if (sample === 'long') {
        const expand = (value: unknown, key = ''): unknown => {
            if (
                typeof value === 'string' &&
                !['href', 'homeHref', 'src'].includes(key)
            ) {
                return `${value} ${value} ${value}`;
            }

            if (Array.isArray(value)) {
                return value.map((item) => expand(item));
            }

            if (value && typeof value === 'object') {
                return Object.fromEntries(
                    Object.entries(value).map(([name, item]) => [
                        name,
                        expand(item, name),
                    ]),
                );
            }

            return value;
        };

        return {
            schemaVersion: 1,
            theme: 'default',
            title: `${block.name}: long content`,
            sections: [{ id: 'top', type, props: expand(props) }],
        };
    }

    return {
        schemaVersion: 1,
        theme: 'default',
        title: `${block.name} preview`,
        sections: [{ id: 'top', type, props }],
    };
}

export const invalidExample = {
    schemaVersion: 1,
    theme: 'default',
    sections: [{ id: 'unknown', type: 'unknown.block', props: {} }],
};
