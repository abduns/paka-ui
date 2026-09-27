import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { examples } from '@/examples';
import { invalidExample } from '@/examples/content-samples';
import { blockEntries, isBlockType } from '@/registry';
import { PageRenderer } from '@/renderer/page-renderer';
import { validatePage } from '@/renderer/validate-page';

describe('empty block collection', () => {
    it('contains no blocks or example pages', () => {
        assert.equal(blockEntries.length, 0);
        assert.deepEqual(Object.keys(examples), []);
    });

    it('rejects removed blocks and prototype properties', () => {
        for (const type of [
            'hero.centered',
            'hero.split',
            'hero.preview',
            'pricing.cards',
            'pricing.billing',
            'pricing.offer',
            'footer.compact',
            'footer.columns',
            'footer.cta',
            'navbar.simple',
            'features.grid',
            'testimonials.grid',
            'cta.banner',
            'footer.simple',
            'constructor',
            '__proto__',
            'toString',
        ]) {
            assert.equal(isBlockType(type), false);
            const result = validatePage({
                ...invalidExample,
                sections: [{ id: 'removed', type, props: {} }],
            });
            assert.equal(result.success, false);
        }
    });

    it('renders useful diagnostics for unavailable blocks', () => {
        const markup = renderToStaticMarkup(
            <PageRenderer config={invalidExample} />,
        );
        assert.ok(markup.includes('role="alert"'));
        assert.ok(markup.includes('Unknown block'));
        assert.ok(!markup.includes('data-block='));
    });

    it('rejects malformed JSON and invalid page configuration', () => {
        for (const config of [
            '{',
            null,
            [],
            { ...invalidExample, schemaVersion: 2 },
            { ...invalidExample, theme: 'missing' },
            { ...invalidExample, sections: [] },
        ]) {
            assert.equal(validatePage(config).success, false);
        }
    });
});
