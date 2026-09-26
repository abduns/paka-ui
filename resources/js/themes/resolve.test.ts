import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { decodePreset, defaultPreset, encodePreset } from '@/themes/preset';
import {
    exportableThemeCss,
    resolveRadius,
    resolveTheme,
    themeStylesheet,
} from '@/themes/resolve';

/**
 * Expected values come from the "Copy theme" output of
 * https://ui.shadcn.com/create for the same preset codes.
 */
describe('resolveTheme', () => {
    it('matches shadcn/create for luma + stone + blue (b4pkjb2emW)', () => {
        const preset = decodePreset('b4pkjb2emW');

        assert.ok(preset);
        assert.equal(preset.style, 'luma');
        assert.equal(preset.baseColor, 'stone');
        assert.equal(preset.theme, 'blue');
        assert.equal(preset.radius, 'large');
        assert.equal(preset.font, 'geist');
        assert.equal(preset.fontHeading, 'playfair-display');

        const theme = resolveTheme(preset);

        assert.equal(theme.light.primary, 'oklch(48.8% 0.243 264.376)');
        assert.equal(
            theme.light['primary-foreground'],
            'oklch(97% 0.014 254.604)',
        );
        assert.equal(theme.light.secondary, 'oklch(96.7% 0.001 286.375)');
        assert.equal(
            theme.light['secondary-foreground'],
            'oklch(21% 0.006 285.885)',
        );
        assert.equal(theme.light.foreground, 'oklch(0.147 0.004 49.25)');
        assert.equal(
            theme.light['sidebar-primary'],
            'oklch(54.6% 0.245 262.881)',
        );
        assert.equal(theme.dark.primary, 'oklch(42.4% 0.199 265.638)');
        assert.equal(theme.dark.secondary, 'oklch(27.4% 0.006 286.033)');
        assert.equal(theme.dark['secondary-foreground'], 'oklch(0.985 0 0)');
        assert.equal(
            theme.dark['sidebar-primary'],
            'oklch(62.3% 0.214 259.815)',
        );
        assert.equal(theme.radius, '0.875rem');
        assert.ok(theme.fontSans.startsWith("'Geist'"));
        assert.ok(theme.fontHeading.startsWith("'Playfair Display'"));
        assert.ok(theme.fontsUrl?.includes('family=Geist'));
        assert.ok(theme.fontsUrl?.includes('family=Playfair+Display'));
    });

    it('builds chart colors from the 300/500/600/700/800 ramp', () => {
        const theme = resolveTheme({ ...defaultPreset, chartColor: 'blue' });

        assert.equal(theme.light['chart-1'], 'oklch(80.9% 0.105 251.813)');
        assert.equal(theme.light['chart-5'], 'oklch(42.4% 0.199 265.638)');
        assert.equal(theme.dark['chart-2'], 'oklch(62.3% 0.214 259.815)');
    });

    it('keeps the base palette primary for a neutral theme', () => {
        const theme = resolveTheme(defaultPreset);

        assert.equal(theme.light.primary, 'oklch(0.205 0 0)');
        assert.equal(theme.dark.primary, 'oklch(0.922 0 0)');
        assert.equal(theme.fontsUrl, null);
    });

    it('lets sharp styles override only the default radius', () => {
        assert.equal(resolveRadius({ ...defaultPreset, style: 'sera' }), '0');
        assert.equal(resolveRadius({ ...defaultPreset, style: 'lyra' }), '0');
        assert.equal(
            resolveRadius({ ...defaultPreset, style: 'sera', radius: 'large' }),
            '0.875rem',
        );
        assert.equal(resolveRadius({ ...defaultPreset, radius: 'none' }), '0');
        assert.equal(
            resolveRadius({ ...defaultPreset, radius: 'small' }),
            '0.45rem',
        );
    });
});

describe('preset codes', () => {
    it('round-trip through the shadcn encoder', () => {
        const preset = {
            ...defaultPreset,
            style: 'rhea' as const,
            theme: 'rose' as const,
        };

        assert.deepEqual(decodePreset(encodePreset(preset)), preset);
        assert.equal(decodePreset('not a code'), null);
    });
});

describe('stylesheets', () => {
    it('sets fonts and both color schemes at runtime', () => {
        const css = themeStylesheet(defaultPreset);

        assert.ok(css.includes(':root {'));
        assert.ok(css.includes('.dark {'));
        assert.ok(css.includes("--paka-ui-font-sans: 'Inter Variable'"));
        assert.ok(css.includes('--radius: 0.625rem;'));
    });

    it('exports css in the globals.css shape', () => {
        const css = exportableThemeCss(defaultPreset);

        assert.ok(css.includes('  --background: oklch(1 0 0);'));
        assert.ok(!css.includes('paka-ui-font'));
    });
});
