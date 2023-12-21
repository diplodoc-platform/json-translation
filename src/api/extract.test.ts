import {extract} from './extract';
import {JSONTranslationExtractParameters} from './types';

describe('api extract: parameters validation', () => {
    it('works with valid parameters', async () => {
        await extract({data: {a: 'b'}, schema: {$schema: 'b'}});
        await extract({data: {a: 'b'}, schema: {$schema: 'b'}, schemaKeyword: 'translatable'});
    });

    it('throws on invalid data', async () => {
        const parameters = {
            data: null,
            schema: {$schema: 'b'},
        } as unknown as JSONTranslationExtractParameters;
        await expect(extract(parameters)).rejects.toThrow();

        parameters.data = {};
        await expect(extract(parameters)).rejects.toThrow();
    });

    it('throws on invalid schema', async () => {
        const parameters = {
            data: {a: 'b'},
            schema: null,
        } as unknown as JSONTranslationExtractParameters;
        await expect(extract(parameters)).rejects.toThrow();

        parameters.schema = {};
        await expect(extract(parameters)).rejects.toThrow();
    });

    it('throws on invalid schemaKeyword', async () => {
        const parameters = {
            data: {a: 'b'},
            schema: {$schema: 'b'},
            schemaKeyword: '',
        } as unknown as JSONTranslationExtractParameters;
        await expect(extract(parameters)).rejects.toThrow();

        parameters.schemaKeyword = null as unknown as string;
        await expect(extract(parameters)).rejects.toThrow();
    });
});
