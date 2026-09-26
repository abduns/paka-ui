import type { StyleName } from '@/themes/preset';

export type StyleDefinition = {
    name: StyleName;
    label: string;
    /** One line on the style's character, shown in the customizer. */
    tagline: string;
    /**
     * Styles with a strong shape opinion override the "default" radius the
     * way shadcn/create does; explicit radius choices still apply.
     */
    defaultRadius?: string;
};

export const styles: readonly StyleDefinition[] = [
    { name: 'nova', label: 'Nova', tagline: 'Compact, flat, and quick.' },
    { name: 'vega', label: 'Vega', tagline: 'The classic shadcn look.' },
    { name: 'maia', label: 'Maia', tagline: 'Soft pills and gentle fills.' },
    {
        name: 'lyra',
        label: 'Lyra',
        tagline: 'Sharp corners, small type.',
        defaultRadius: '0',
    },
    { name: 'mira', label: 'Mira', tagline: 'Dense, for data-heavy tools.' },
    { name: 'luma', label: 'Luma', tagline: 'Rounded, airy, and lifted.' },
    {
        name: 'sera',
        label: 'Sera',
        tagline: 'Editorial: uppercase, underlines.',
        defaultRadius: '0',
    },
    { name: 'rhea', label: 'Rhea', tagline: 'Friendly curves, calm shadows.' },
];

export function styleDefinition(name: StyleName): StyleDefinition {
    return styles.find((style) => style.name === name) ?? styles[0];
}
