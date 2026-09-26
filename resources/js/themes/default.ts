import type { CSSProperties } from 'react';
import { z } from 'zod';

const colorSchema = z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, 'Use a six-digit hex color.');

export const themeTokensSchema = z
    .object({
        background: colorSchema,
        foreground: colorSchema,
        primary: colorSchema,
        primaryForeground: colorSchema,
        muted: colorSchema,
        mutedForeground: colorSchema,
        accent: colorSchema,
        accentForeground: colorSchema,
        card: colorSchema,
        border: colorSchema,
        headingFont: z.enum(['sans', 'serif']),
        radius: z.number().min(0).max(32),
        containerWidth: z.number().min(960).max(1440),
        sectionSpacing: z.number().min(64).max(144),
    })
    .strict();

export const defaultTheme: z.infer<typeof themeTokensSchema> = {
    background: '#fafbf8',
    foreground: '#1e3028',
    primary: '#2c513f',
    primaryForeground: '#ffffff',
    muted: '#edf1e9',
    mutedForeground: '#57645b',
    accent: '#e0edc6',
    accentForeground: '#2c513f',
    card: '#ffffff',
    border: '#dce3d8',
    headingFont: 'sans',
    radius: 16,
    containerWidth: 1200,
    sectionSpacing: 112,
};

export type ThemeOverrides = Partial<z.infer<typeof themeTokensSchema>>;

export function themeStyle(overrides: ThemeOverrides = {}): CSSProperties {
    const tokens = { ...defaultTheme, ...overrides };

    return {
        '--background': tokens.background,
        '--foreground': tokens.foreground,
        '--primary': tokens.primary,
        '--primary-foreground': tokens.primaryForeground,
        '--muted': tokens.muted,
        '--muted-foreground': tokens.mutedForeground,
        '--secondary': tokens.muted,
        '--secondary-foreground': tokens.foreground,
        '--accent': tokens.accent,
        '--accent-foreground': tokens.accentForeground,
        '--card': tokens.card,
        '--card-foreground': tokens.foreground,
        '--border': tokens.border,
        '--input': tokens.border,
        '--ring': tokens.primary,
        '--radius': `${tokens.radius}px`,
        '--radius-lg': `${tokens.radius}px`,
        '--radius-md': `${Math.max(0, tokens.radius - 2)}px`,
        '--radius-sm': `${Math.max(0, tokens.radius - 4)}px`,
        '--radius-xl': `${tokens.radius + 4}px`,
        '--paka-container': `${tokens.containerWidth}px`,
        '--paka-section': `clamp(3.5rem, 8vw, ${tokens.sectionSpacing}px)`,
        '--paka-font-body':
            "'Inter Variable', ui-sans-serif, system-ui, sans-serif",
        '--paka-font-heading':
            tokens.headingFont === 'serif'
                ? "Georgia, 'Times New Roman', serif"
                : "'Inter Variable', ui-sans-serif, system-ui, sans-serif",
        '--paka-text-hero': 'clamp(2.75rem, 5.6vw, 4.75rem)',
        '--paka-text-heading': 'clamp(2rem, 3.5vw, 3.25rem)',
        colorScheme: 'light',
    } as CSSProperties;
}
