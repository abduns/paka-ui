import {
    fontDefinition,
    googleFontsUrl,
    headingFontDefinition,
} from '@/themes/fonts';
import { baseColors, hues } from '@/themes/palettes';
import type { TokenSet } from '@/themes/palettes';
import type { Preset, RadiusName } from '@/themes/preset';
import { styleDefinition } from '@/themes/styles';

export type Mode = 'light' | 'dark';

export type ResolvedTheme = {
    light: TokenSet;
    dark: TokenSet;
    /** The `--radius` value, e.g. "0.625rem". */
    radius: string;
    fontSans: string;
    fontHeading: string;
    fontMono: string;
    /** Stylesheet to load for web fonts, or null when none is needed. */
    fontsUrl: string | null;
};

const RADIUS_VALUES: Record<RadiusName, string> = {
    none: '0',
    small: '0.45rem',
    default: '0.625rem',
    medium: '0.625rem',
    large: '0.875rem',
};

const NEUTRAL_FOREGROUND_DARK = 'oklch(0.985 0 0)';

function isBaseColor(name: string): name is keyof typeof baseColors {
    return Object.hasOwn(baseColors, name);
}

function isHue(name: string): name is keyof typeof hues {
    return Object.hasOwn(hues, name);
}

/**
 * Accent ("theme") tokens layered over a base color. A base color used as the
 * theme keeps its own primary; a hue follows the shadcn/create mapping:
 * 700/50 in light, 800/50 in dark, zinc secondary, and a brighter sidebar
 * primary.
 */
function accentTokens(theme: Preset['theme'], mode: Mode): TokenSet {
    if (isBaseColor(theme)) {
        const palette = baseColors[theme][mode];

        return {
            primary: palette.primary,
            'primary-foreground': palette['primary-foreground'],
            secondary: palette.secondary,
            'secondary-foreground': palette['secondary-foreground'],
            'sidebar-primary': palette['sidebar-primary'],
            'sidebar-primary-foreground': palette['sidebar-primary-foreground'],
        };
    }

    if (!isHue(theme)) {
        return {};
    }

    const scale = hues[theme];
    const zinc = hues.zinc;

    return mode === 'light'
        ? {
              primary: scale[7],
              'primary-foreground': scale[0],
              secondary: zinc[1],
              'secondary-foreground': zinc[9],
              'sidebar-primary': scale[6],
              'sidebar-primary-foreground': scale[0],
          }
        : {
              primary: scale[8],
              'primary-foreground': scale[0],
              secondary: zinc[8],
              'secondary-foreground': NEUTRAL_FOREGROUND_DARK,
              'sidebar-primary': scale[5],
              'sidebar-primary-foreground': scale[0],
          };
}

function chartTokens(chartColor: Preset['chartColor'], mode: Mode): TokenSet {
    if (isBaseColor(chartColor)) {
        const palette = baseColors[chartColor][mode];

        return Object.fromEntries(
            [1, 2, 3, 4, 5].map((index) => [
                `chart-${index}`,
                palette[`chart-${index}`],
            ]),
        );
    }

    if (!isHue(chartColor)) {
        return {};
    }

    const scale = hues[chartColor];

    return {
        'chart-1': scale[3],
        'chart-2': scale[5],
        'chart-3': scale[6],
        'chart-4': scale[7],
        'chart-5': scale[8],
    };
}

function tokensFor(preset: Preset, mode: Mode): TokenSet {
    return {
        ...baseColors[preset.baseColor][mode],
        ...accentTokens(preset.theme, mode),
        ...chartTokens(preset.chartColor, mode),
    };
}

export function resolveRadius(preset: Preset): string {
    const style = styleDefinition(preset.style);

    if (preset.radius === 'default' && style.defaultRadius !== undefined) {
        return style.defaultRadius;
    }

    return RADIUS_VALUES[preset.radius];
}

export function resolveTheme(preset: Preset): ResolvedTheme {
    const body = fontDefinition(preset.font);
    const heading = headingFontDefinition(preset.fontHeading, preset.font);
    const mono = fontDefinition('jetbrains-mono');

    return {
        light: tokensFor(preset, 'light'),
        dark: tokensFor(preset, 'dark'),
        radius: resolveRadius(preset),
        fontSans: body.family,
        fontHeading: heading.family,
        fontMono: mono.family,
        fontsUrl: googleFontsUrl([body, heading]),
    };
}

function declarations(tokens: TokenSet, indent = '    '): string {
    return Object.entries(tokens)
        .map(([name, value]) => `${indent}--${name}: ${value};`)
        .join('\n');
}

/**
 * The stylesheet that applies a preset. It targets `:root` and `.dark`, the
 * same selectors as app.css, and is injected after it so it wins.
 */
export function themeStylesheet(preset: Preset): string {
    const theme = resolveTheme(preset);
    const fonts = {
        'paka-ui-font-sans': theme.fontSans,
        'paka-ui-font-heading': theme.fontHeading,
        'paka-ui-font-mono': theme.fontMono,
        radius: theme.radius,
    };

    return [
        ':root {',
        declarations({ ...theme.light, ...fonts }),
        '}',
        '',
        '.dark {',
        declarations(theme.dark),
        '}',
        '',
    ].join('\n');
}

/**
 * The CSS a user pastes into their own globals.css: colors and radius only,
 * matching the "Copy theme" output of shadcn/create.
 */
export function exportableThemeCss(preset: Preset): string {
    const theme = resolveTheme(preset);

    return [
        ':root {',
        declarations({ ...theme.light, radius: theme.radius }, '  '),
        '}',
        '',
        '.dark {',
        declarations(theme.dark, '  '),
        '}',
        '',
    ].join('\n');
}
