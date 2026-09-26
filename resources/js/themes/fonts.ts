import type { FontHeadingName, FontName } from '@/themes/preset';

export type FontDefinition = {
    name: FontName;
    label: string;
    /** The CSS font-family stack. */
    family: string;
    /** Google Fonts family query, or null when the font ships with the app. */
    google: string | null;
    category: 'sans' | 'serif' | 'mono';
};

const SANS_FALLBACK =
    "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'";
const SERIF_FALLBACK = "ui-serif, Georgia, Cambria, 'Times New Roman', serif";
const MONO_FALLBACK =
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";

function sans(
    name: FontName,
    label: string,
    google:
        string | null = `${label.replaceAll(' ', '+')}:wght@400;500;600;700`,
): FontDefinition {
    return {
        name,
        label,
        family: `'${label}', ${SANS_FALLBACK}`,
        google,
        category: 'sans',
    };
}

function serif(name: FontName, label: string): FontDefinition {
    return {
        name,
        label,
        family: `'${label}', ${SERIF_FALLBACK}`,
        google: `${label.replaceAll(' ', '+')}:wght@400;500;600;700`,
        category: 'serif',
    };
}

function mono(name: FontName, label: string): FontDefinition {
    return {
        name,
        label,
        family: `'${label}', ${MONO_FALLBACK}`,
        google: `${label.replaceAll(' ', '+')}:wght@400;500;600;700`,
        category: 'mono',
    };
}

export const fonts: readonly FontDefinition[] = [
    {
        name: 'inter',
        label: 'Inter',
        family: `'Inter Variable', ${SANS_FALLBACK}`,
        google: null,
        category: 'sans',
    },
    sans('geist', 'Geist'),
    sans('noto-sans', 'Noto Sans'),
    sans('nunito-sans', 'Nunito Sans'),
    sans('figtree', 'Figtree'),
    sans('roboto', 'Roboto'),
    sans('raleway', 'Raleway'),
    sans('dm-sans', 'DM Sans'),
    sans('public-sans', 'Public Sans'),
    sans('outfit', 'Outfit'),
    sans('manrope', 'Manrope'),
    sans('space-grotesk', 'Space Grotesk'),
    sans('montserrat', 'Montserrat'),
    sans('ibm-plex-sans', 'IBM Plex Sans'),
    sans('source-sans-3', 'Source Sans 3'),
    sans('instrument-sans', 'Instrument Sans'),
    sans('oxanium', 'Oxanium'),
    serif('lora', 'Lora'),
    serif('merriweather', 'Merriweather'),
    serif('playfair-display', 'Playfair Display'),
    serif('noto-serif', 'Noto Serif'),
    serif('roboto-slab', 'Roboto Slab'),
    serif('eb-garamond', 'EB Garamond'),
    {
        name: 'instrument-serif',
        label: 'Instrument Serif',
        family: `'Instrument Serif', ${SERIF_FALLBACK}`,
        google: 'Instrument+Serif:ital@0;1',
        category: 'serif',
    },
    mono('jetbrains-mono', 'JetBrains Mono'),
    mono('geist-mono', 'Geist Mono'),
];

export function fontDefinition(name: FontName): FontDefinition {
    return fonts.find((font) => font.name === name) ?? fonts[0];
}

export function headingFontDefinition(
    heading: FontHeadingName,
    body: FontName,
): FontDefinition {
    return fontDefinition(heading === 'inherit' ? body : heading);
}

export function googleFontsUrl(definitions: FontDefinition[]): string | null {
    const families = [
        ...new Set(
            definitions
                .map((font) => font.google)
                .filter((family): family is string => family !== null),
        ),
    ];

    if (families.length === 0) {
        return null;
    }

    return `https://fonts.googleapis.com/css2?${families
        .map((family) => `family=${family}`)
        .join('&')}&display=swap`;
}
