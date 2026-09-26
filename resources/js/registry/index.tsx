import { createElement } from 'react';
import type { ComponentType } from 'react';
import type { z } from 'zod';
import { Cta } from '@/components/blocks/cta';
import { Features } from '@/components/blocks/features';
import { Footer } from '@/components/blocks/footer';
import { Hero } from '@/components/blocks/hero';
import { Navbar } from '@/components/blocks/navbar';
import { Testimonials } from '@/components/blocks/testimonials';
import {
    ctaSchema,
    featuresSchema,
    footerSchema,
    heroSchema,
    navbarSchema,
    testimonialsSchema,
} from '@/registry/schemas';

function defineBlock<S extends z.ZodType<Record<string, unknown>>>(definition: {
    name: string;
    description: string;
    component: ComponentType<z.output<S>>;
    schema: S;
    defaultProps: z.input<S>;
}) {
    return {
        ...definition,
        defaultProps: definition.schema.parse(definition.defaultProps),
        render(props: unknown) {
            return createElement(
                definition.component,
                definition.schema.parse(props),
            );
        },
    };
}

export const blockRegistry = {
    'navbar.simple': defineBlock({
        name: 'Navbar',
        description:
            'Brand, navigation links, and a call to action with a keyboard-accessible mobile menu.',
        component: Navbar,
        schema: navbarSchema,
        defaultProps: {
            brand: 'Gather',
            homeHref: '#top',
            links: [
                { label: 'Why Gather', href: '#features' },
                { label: 'Kind words', href: '#testimonials' },
            ],
            action: { label: 'Say hello', href: 'mailto:hello@example.com' },
        },
    }),
    'hero.split': defineBlock({
        name: 'Hero',
        description:
            'An expressive headline and actions alongside an optional, content-driven overview card.',
        component: Hero,
        schema: heroSchema,
        defaultProps: {
            eyebrow: 'A little less busy. A lot more focused.',
            heading: 'Make room for your best work.',
            description:
                'Bring your plans, projects, and people together. Gather gives small teams a calmer way to move good ideas forward.',
            primaryAction: { label: 'Find your focus', href: '#contact' },
            secondaryAction: { label: 'See how it works', href: '#features' },
            note: 'Thoughtfully made for teams of every size.',
            visual: {
                label: 'Your week, in perspective',
                title: 'Good things are taking shape.',
                items: [
                    {
                        title: 'A shared direction',
                        description: 'One plan everyone can get behind.',
                        tag: 'Monday · Set your intentions',
                    },
                    {
                        title: 'Space to do the work',
                        description: 'Fewer check-ins. More progress.',
                        tag: 'Tuesday · Find your flow',
                    },
                    {
                        title: 'Celebrate the small wins',
                        description: 'See how far you have come.',
                        tag: 'Friday · Look back, move forward',
                    },
                ],
                metric: {
                    value: 'One place.',
                    label: 'For the things that move you forward.',
                },
                caption: 'A sample week with Gather',
            },
        },
    }),
    'features.grid': defineBlock({
        name: 'Features',
        description:
            'A responsive grid of benefits with an optional introduction.',
        component: Features,
        schema: featuresSchema,
        defaultProps: {
            eyebrow: 'Everything you need. Room to breathe.',
            heading: 'Less managing. More making.',
            description:
                'Simple by design, so you can spend your energy on the work that matters.',
            items: [
                {
                    title: 'Start with a clear plan',
                    description:
                        'Turn a big idea into small, achievable steps. Everyone knows what comes next.',
                },
                {
                    title: 'Keep the conversation close',
                    description:
                        'Decisions, context, and feedback live alongside the work. Nothing gets lost in the shuffle.',
                },
                {
                    title: 'Move at your own pace',
                    description:
                        'Make space for deep work with thoughtful updates that do not demand an instant reply.',
                },
            ],
        },
    }),
    'testimonials.grid': defineBlock({
        name: 'Testimonials',
        description:
            'Customer quotations with names, optional roles, and text-based avatars.',
        component: Testimonials,
        schema: testimonialsSchema,
        defaultProps: {
            eyebrow: 'Good company',
            heading: 'Small teams. Meaningful progress.',
            description:
                'Illustrative stories from the kinds of teams we build for.',
            items: [
                {
                    quote: 'We finally have a place for the whole picture. Monday mornings feel lighter already.',
                    name: 'Alex Morgan',
                    role: 'Studio founder · Example team',
                },
                {
                    quote: 'It is the first tool our entire team actually enjoys opening. Clear, calm, and just enough.',
                    name: 'Jamie Park',
                    role: 'Design lead · Example team',
                },
                {
                    quote: 'Less time chasing updates means more time making something we are proud of.',
                    name: 'Sam Rivera',
                    role: 'Product lead · Example team',
                },
            ],
        },
    }),
    'cta.banner': defineBlock({
        name: 'Call to action',
        description:
            'A generous closing invitation with a primary action and optional supporting content.',
        component: Cta,
        schema: ctaSchema,
        defaultProps: {
            eyebrow: 'A fresh start',
            heading: 'Your next chapter starts here.',
            description:
                'Tell us what you are working on. We would love to help you find a little more focus.',
            primaryAction: {
                label: 'Let’s talk',
                href: 'mailto:hello@example.com',
            },
            note: 'A real conversation. No pressure.',
        },
    }),
    'footer.simple': defineBlock({
        name: 'Footer',
        description:
            'A simple closing section with brand, useful links, and copyright.',
        component: Footer,
        schema: footerSchema,
        defaultProps: {
            brand: 'Gather',
            homeHref: '#top',
            description: 'A calmer place for your best work.',
            links: [
                { label: 'Our approach', href: '#features' },
                { label: 'Get in touch', href: 'mailto:hello@example.com' },
            ],
            copyright: '© 2026 Gather. A fictional Paka demo.',
        },
    }),
} as const;

export type BlockType = keyof typeof blockRegistry;
export type BlockSection = {
    [K in BlockType]: {
        id: string;
        type: K;
        props: z.input<(typeof blockRegistry)[K]['schema']>;
    };
}[BlockType];

export function isBlockType(type: string): type is BlockType {
    return Object.hasOwn(blockRegistry, type);
}

export const blockEntries = Object.entries(blockRegistry) as [
    BlockType,
    (typeof blockRegistry)[BlockType],
][];
