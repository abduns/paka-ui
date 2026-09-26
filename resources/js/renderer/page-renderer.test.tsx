import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { examples } from '@/examples';
import {
    blockPreviewConfig,
    contentSamples,
    invalidExample,
    minimalPage,
} from '@/examples/content-samples';
import { blockEntries, isBlockType } from '@/registry';
import { PageRenderer } from '@/renderer/page-renderer';
import { validatePage } from '@/renderer/validate-page';

describe('JSON page renderer', () => {
    for (const [name, example] of Object.entries(examples)) {
        it(`renders every ${name} section in JSON order using the shared registry`, () => {
            const result = validatePage(example.config);
            assert.equal(result.success, true);
            const markup = renderToStaticMarkup(
                <PageRenderer config={example.config} />,
            );
            let previousPosition = -1;

            for (const section of example.config.sections) {
                const position = markup.indexOf(`id="${section.id}"`);
                assert.ok(
                    position > previousPosition,
                    `Expected ${section.id} in order`,
                );
                previousPosition = position;
                assert.ok(markup.includes(`data-block="${section.type}"`));
            }

            assert.equal((markup.match(/<h1\b/g) ?? []).length, 1);
            assert.ok(markup.includes('Skip to content'));
            assert.ok(!markup.includes('Unable to render'));
        });
    }

    for (const [type] of blockEntries) {
        for (const sample of contentSamples) {
            it(`renders ${type} with ${sample} content`, () => {
                const config = blockPreviewConfig(type, sample);
                assert.deepEqual(validatePage(config).success, true);
                const markup = renderToStaticMarkup(
                    <PageRenderer config={config} />,
                );
                assert.ok(markup.includes(`data-block="${type}"`));
                assert.ok(!markup.includes('undefined'));
            });
        }
    }

    it('accepts JSON text and renders a hero without optional content', () => {
        assert.equal(validatePage(JSON.stringify(minimalPage)).success, true);
        const markup = renderToStaticMarkup(
            <PageRenderer config={minimalPage} />,
        );
        assert.ok(markup.includes('A good idea needs a place to start.'));
        assert.ok(!markup.includes('<figure'));
    });

    it('reports prop paths, unsafe links, duplicates, and unknown block types together', () => {
        const result = validatePage(invalidExample);
        assert.equal(result.success, false);

        if (!result.success) {
            assert.deepEqual(
                result.issues.map((issue) => issue.path),
                [
                    'sections.0.props.heading',
                    'sections.0.props.primaryAction.href',
                    'sections.1.id',
                    'sections.1.type',
                ],
            );
        }

        const markup = renderToStaticMarkup(
            <PageRenderer config={invalidExample} />,
        );
        assert.ok(markup.includes('role="alert"'));
        assert.ok(markup.includes('Unknown block'));
        assert.ok(!markup.includes('data-block='));
    });

    it('rejects malformed JSON, unsupported versions, themes, token values, and misspelled fields', () => {
        for (const config of [
            '{',
            null,
            [],
            { ...minimalPage, schemaVersion: 2 },
            { ...minimalPage, theme: 'unknown' },
            { ...minimalPage, sections: [] },
            {
                ...minimalPage,
                themeTokens: { primary: 'url(https://example.com)' },
            },
            { ...minimalPage, themeTokens: { containerWidth: 100 } },
            { ...minimalPage, themeTokens: { radius: -1 } },
            { ...minimalPage, themeTokens: { headingFont: 'unknown' } },
            { ...minimalPage, typo: true },
            {
                ...minimalPage,
                sections: [
                    {
                        ...minimalPage.sections[0],
                        props: {
                            ...minimalPage.sections[0].props,
                            headng: 'Typo',
                        },
                    },
                ],
            },
            {
                ...minimalPage,
                sections: [{ ...minimalPage.sections[0], id: 'has spaces' }],
            },
        ]) {
            assert.equal(
                validatePage(config).success,
                false,
                JSON.stringify(config),
            );
        }
    });

    it('does not treat prototype properties as registered blocks', () => {
        for (const type of ['constructor', '__proto__', 'toString']) {
            assert.equal(isBlockType(type), false);
            assert.equal(
                validatePage({
                    ...minimalPage,
                    sections: [{ id: 'intro', type, props: {} }],
                }).success,
                false,
            );
        }
    });

    it('rejects executable and protocol-relative links while accepting ordinary destinations', () => {
        for (const href of [
            'javascript:alert(1)',
            'data:text/html,test',
            '//evil.example',
            '/\\evil.example',
            'java\nscript:alert(1)',
        ]) {
            const config = structuredClone(minimalPage);
            config.sections[0] = {
                id: 'intro',
                type: 'hero.split',
                props: {
                    heading: 'Hello',
                    primaryAction: { label: 'Go', href },
                },
            };
            assert.equal(validatePage(config).success, false, href);
        }

        for (const href of [
            '#contact',
            '/signup',
            'https://example.com',
            'http://localhost:8000',
            'mailto:hello@example.com',
            'tel:+123456789',
        ]) {
            const config = {
                ...minimalPage,
                sections: [
                    {
                        id: 'intro',
                        type: 'hero.split',
                        props: {
                            heading: 'Hello',
                            primaryAction: { label: 'Go', href },
                        },
                    },
                ],
            };
            assert.equal(validatePage(config).success, true, href);
        }
    });

    it('escapes content and scopes theme overrides to each rendered page', () => {
        const config = {
            ...minimalPage,
            themeTokens: { primary: '#123456', radius: 6 },
            sections: [
                {
                    id: 'intro',
                    type: 'hero.split',
                    props: {
                        heading: '<script>alert(1)</script>',
                        primaryAction: { label: 'Go', href: '#intro' },
                    },
                },
            ],
        };
        const markup = renderToStaticMarkup(<PageRenderer config={config} />);
        assert.ok(markup.includes('&lt;script&gt;'));
        assert.ok(!markup.includes('<script>'));
        assert.ok(markup.includes('--primary:#123456'));
        assert.ok(markup.includes('--radius:6px'));
        assert.ok(
            renderToStaticMarkup(
                <PageRenderer config={minimalPage} />,
            ).includes('--primary:#2c513f'),
        );
    });
});
