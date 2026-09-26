import { z } from 'zod';

export const textSchema = z.string().trim().min(1).max(2000);

export const hrefSchema = z
    .string()
    .trim()
    .min(1)
    .max(2048)
    .refine((value) => {
        if (
            /[\s\\]/u.test(value) ||
            Array.from(value).some(
                (character) =>
                    character.charCodeAt(0) < 32 ||
                    character.charCodeAt(0) === 127,
            )
        ) {
            return false;
        }

        if (/^#[A-Za-z][\w-]*$/.test(value) || /^\/(?!\/)/.test(value)) {
            return true;
        }

        try {
            const url = new URL(value);

            return ['https:', 'http:', 'mailto:', 'tel:'].includes(
                url.protocol,
            );
        } catch {
            return false;
        }
    }, 'Use a site path, #section, https://, http://, mailto:, or tel: link.');

export const actionSchema = z
    .object({ label: textSchema, href: hrefSchema })
    .strict();
const sectionHeading = {
    eyebrow: textSchema.optional(),
    heading: textSchema,
    description: textSchema.optional(),
};

export const navbarSchema = z
    .object({
        brand: textSchema,
        homeHref: hrefSchema,
        links: z.array(actionSchema).max(6),
        action: actionSchema.optional(),
    })
    .strict();

export const heroSchema = z
    .object({
        ...sectionHeading,
        primaryAction: actionSchema,
        secondaryAction: actionSchema.optional(),
        note: textSchema.optional(),
        visual: z
            .object({
                label: textSchema,
                title: textSchema,
                items: z
                    .array(
                        z
                            .object({
                                title: textSchema,
                                description: textSchema.optional(),
                                tag: textSchema.optional(),
                            })
                            .strict(),
                    )
                    .min(1)
                    .max(5),
                metric: z
                    .object({ value: textSchema, label: textSchema })
                    .strict()
                    .optional(),
                caption: textSchema.optional(),
            })
            .strict()
            .optional(),
    })
    .strict();

export const featuresSchema = z
    .object({
        ...sectionHeading,
        items: z
            .array(
                z
                    .object({
                        title: textSchema,
                        description: textSchema,
                    })
                    .strict(),
            )
            .min(1)
            .max(9),
    })
    .strict();

export const testimonialsSchema = z
    .object({
        ...sectionHeading,
        items: z
            .array(
                z
                    .object({
                        quote: textSchema,
                        name: textSchema,
                        role: textSchema.optional(),
                    })
                    .strict(),
            )
            .min(1)
            .max(6),
    })
    .strict();

export const ctaSchema = z
    .object({
        ...sectionHeading,
        primaryAction: actionSchema,
        secondaryAction: actionSchema.optional(),
        note: textSchema.optional(),
    })
    .strict();

export const footerSchema = z
    .object({
        brand: textSchema,
        homeHref: hrefSchema,
        description: textSchema.optional(),
        links: z.array(actionSchema).max(8),
        copyright: textSchema,
    })
    .strict();

export type NavbarProps = z.infer<typeof navbarSchema>;
export type HeroProps = z.infer<typeof heroSchema>;
export type FeaturesProps = z.infer<typeof featuresSchema>;
export type TestimonialsProps = z.infer<typeof testimonialsSchema>;
export type CtaProps = z.infer<typeof ctaSchema>;
export type FooterProps = z.infer<typeof footerSchema>;
export type ActionProps = z.infer<typeof actionSchema>;
