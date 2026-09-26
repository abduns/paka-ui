import {
    decodePreset as decodeShadcnPreset,
    encodePreset as encodeShadcnPreset,
    PRESET_BASE_COLORS,
    PRESET_CHART_COLORS,
    PRESET_FONTS,
    PRESET_FONT_HEADINGS,
    PRESET_RADII,
    PRESET_STYLES,
    PRESET_THEMES,
} from 'shadcn/preset';
import type { PresetConfig } from 'shadcn/preset';

/**
 * The customizable dimensions of a Paka preset. They mirror shadcn/create so
 * a preset code round-trips with https://ui.shadcn.com/create; the icon
 * library and menu options are fixed for this project and not exposed.
 */
export type StyleName = (typeof PRESET_STYLES)[number];
export type BaseColorName = (typeof PRESET_BASE_COLORS)[number];
export type ThemeName = (typeof PRESET_THEMES)[number];
export type ChartColorName = (typeof PRESET_CHART_COLORS)[number];
export type FontName = (typeof PRESET_FONTS)[number];
export type FontHeadingName = (typeof PRESET_FONT_HEADINGS)[number];
export type RadiusName = (typeof PRESET_RADII)[number];

export type Preset = {
    style: StyleName;
    baseColor: BaseColorName;
    theme: ThemeName;
    chartColor: ChartColorName;
    font: FontName;
    fontHeading: FontHeadingName;
    radius: RadiusName;
};

export const PRESET_KEYS = [
    'style',
    'baseColor',
    'theme',
    'chartColor',
    'font',
    'fontHeading',
    'radius',
] as const satisfies readonly (keyof Preset)[];

export const presetOptions = {
    style: PRESET_STYLES,
    baseColor: PRESET_BASE_COLORS,
    theme: PRESET_THEMES,
    chartColor: PRESET_CHART_COLORS,
    font: PRESET_FONTS,
    fontHeading: PRESET_FONT_HEADINGS,
    radius: PRESET_RADII,
} as const satisfies { [K in keyof Preset]: readonly Preset[K][] };

export const defaultPreset: Preset = {
    style: 'nova',
    baseColor: 'neutral',
    theme: 'neutral',
    chartColor: 'neutral',
    font: 'inter',
    fontHeading: 'inherit',
    radius: 'default',
};

/** Fixed parts of the shadcn preset that this project does not customize. */
const fixedConfig = {
    iconLibrary: 'hugeicons',
    menuAccent: 'subtle',
    menuColor: 'default',
} as const satisfies Partial<PresetConfig>;

export function isPresetValue<K extends keyof Preset>(
    key: K,
    value: unknown,
): value is Preset[K] {
    return (presetOptions[key] as readonly unknown[]).includes(value);
}

export function encodePreset(preset: Preset): string {
    return encodeShadcnPreset({ ...preset, ...fixedConfig });
}

/**
 * Decode a shadcn/create code. Unknown or malformed codes return null;
 * dimensions this project does not expose are ignored.
 */
export function decodePreset(code: string): Preset | null {
    const config = decodeShadcnPreset(code.trim());

    if (!config) {
        return null;
    }

    return {
        style: config.style,
        baseColor: config.baseColor,
        theme: config.theme,
        chartColor: config.chartColor ?? defaultPreset.chartColor,
        font: config.font,
        fontHeading: config.fontHeading,
        radius: config.radius,
    };
}

export function presetUrl(preset: Preset): string {
    return `https://ui.shadcn.com/create?preset=${encodePreset(preset)}`;
}

export function randomPreset(): Preset {
    const pick = <T>(values: readonly T[]): T =>
        values[Math.floor(Math.random() * values.length)];

    return {
        style: pick(presetOptions.style),
        baseColor: pick(presetOptions.baseColor),
        theme: pick(presetOptions.theme),
        chartColor: pick(presetOptions.chartColor),
        font: pick(presetOptions.font),
        fontHeading: pick(presetOptions.fontHeading),
        radius: pick(presetOptions.radius),
    };
}

export function isSamePreset(a: Preset, b: Preset): boolean {
    return PRESET_KEYS.every((key) => a[key] === b[key]);
}
