import {compose} from './compose';
import {JSONTranslationComposeParameters} from './types';

describe('api compose: parameters validation', () => {
    it('works with valid parameters', async () => {
        await compose({schema: {$schema: 'b'}, skeleton: {'1': 'a'}, xliff: 'a'});
    });

    it('throws on invalid schema', async () => {
        const parameters = {
            schema: null,
            skeleton: {'1': 'a'},
            xliff: 'a',
        } as unknown as JSONTranslationComposeParameters;
        await expect(compose(parameters)).rejects.toThrow();

        parameters.schema = {};
        await expect(compose(parameters)).rejects.toThrow();
    });

    it('throws on invalid skeleton', async () => {
        const parameters = {
            schema: {$schema: 'a'},
            xliff: 'a',
            skeleton: null,
        } as unknown as JSONTranslationComposeParameters;
        await expect(compose(parameters)).rejects.toThrow();

        parameters.skeleton = {};
        await expect(compose(parameters)).rejects.toThrow();
    });

    it('throws on invalid xliff', async () => {
        const parameters = {
            skeleton: {'1': 'a'},
            schema: {$schema: 'a'},
            xliff: '',
        } as unknown as JSONTranslationComposeParameters;
        await expect(compose(parameters)).rejects.toThrow();

        parameters.xliff = null as unknown as string;
        await expect(compose(parameters)).rejects.toThrow();
    });

    it('throws on invalid schemaKeyword', async () => {
        const parameters = {
            skeleton: {'1': 'a'},
            schema: {$schema: 'a'},
            xliff: 'a',
            schemaKeyword: '',
        };

        await expect(compose(parameters)).rejects.toThrow();

        parameters.schemaKeyword = null as unknown as string;
        await expect(compose(parameters)).rejects.toThrow();
    });
});
