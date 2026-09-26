import { z } from 'zod';
import { blockRegistry, isBlockType } from '@/registry';
import type { BlockSection, BlockType } from '@/registry';
import { themeTokensSchema } from '@/themes/default';

export const pageSchema = z
    .object({
        schemaVersion: z.literal(1),
        theme: z.literal('default'),
        title: z.string().trim().min(1).max(200).optional(),
        description: z.string().trim().min(1).max(500).optional(),
        themeTokens: themeTokensSchema.partial().optional(),
        sections: z
            .array(
                z
                    .object({
                        id: z
                            .string()
                            .regex(
                                /^[a-zA-Z][a-zA-Z0-9-]*$/,
                                'Use an ID starting with a letter, followed by letters, numbers, or hyphens.',
                            )
                            .max(100),
                        type: z.string().min(1),
                        props: z.record(z.string(), z.unknown()),
                    })
                    .strict(),
            )
            .min(1)
            .max(50),
    })
    .strict();

export type PageConfig = Omit<z.input<typeof pageSchema>, 'sections'> & {
    sections: BlockSection[];
};
export type PageIssue = { path: string; message: string };
export type ValidatedPage = Omit<z.output<typeof pageSchema>, 'sections'> & {
    sections: { id: string; type: BlockType; props: Record<string, unknown> }[];
};
export type PageValidation =
    | { success: true; data: ValidatedPage }
    | { success: false; issues: PageIssue[] };

export function validatePage(input: unknown): PageValidation {
    let config = input;

    if (typeof input === 'string') {
        try {
            config = JSON.parse(input);
        } catch (error) {
            return {
                success: false,
                issues: [
                    {
                        path: '$',
                        message: `Invalid JSON: ${error instanceof Error ? error.message : 'Unable to parse.'}`,
                    },
                ],
            };
        }
    }

    const parsed = pageSchema.safeParse(config);

    if (!parsed.success) {
        return {
            success: false,
            issues: parsed.error.issues.map((issue) => ({
                path: issue.path.join('.') || '$',
                message: issue.message,
            })),
        };
    }

    const issues: PageIssue[] = [];
    const ids = new Set<string>();
    const sections: ValidatedPage['sections'] = [];

    parsed.data.sections.forEach((section, index) => {
        const path = `sections.${index}`;

        if (ids.has(section.id)) {
            issues.push({
                path: `${path}.id`,
                message: `Duplicate section ID "${section.id}". Each instance needs a unique ID.`,
            });
        }

        ids.add(section.id);

        if (!isBlockType(section.type)) {
            issues.push({
                path: `${path}.type`,
                message: `Unknown block "${section.type}". Available blocks: ${Object.keys(blockRegistry).join(', ')}.`,
            });

            return;
        }

        const props = blockRegistry[section.type].schema.safeParse(
            section.props,
        );

        if (!props.success) {
            issues.push(
                ...props.error.issues.map((issue) => ({
                    path: `${path}.props${issue.path.length ? `.${issue.path.join('.')}` : ''}`,
                    message: `[${section.id} / ${section.type}] ${issue.message}`,
                })),
            );

            return;
        }

        sections.push({ ...section, type: section.type, props: props.data });
    });

    return issues.length > 0
        ? { success: false, issues }
        : { success: true, data: { ...parsed.data, sections } };
}
