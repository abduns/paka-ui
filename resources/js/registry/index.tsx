import type { ReactNode } from 'react';
import type { z } from 'zod';

export type BlockType = string;
export type BlockDefinition = {
    name: string;
    description: string;
    schema: z.ZodType<Record<string, unknown>>;
    defaultProps: Record<string, unknown>;
    render: (props: unknown) => ReactNode;
};
export type BlockSection = {
    id: string;
    type: BlockType;
    props: Record<string, unknown>;
};

export const blockRegistry: Record<BlockType, BlockDefinition> = {};

export function isBlockType(type: string): type is BlockType {
    return Object.hasOwn(blockRegistry, type);
}

export const blockEntries = Object.entries(blockRegistry);
