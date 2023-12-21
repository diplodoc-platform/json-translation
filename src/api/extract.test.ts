import {extract} from './extract';
import {JSONTranslationExtractParameters} from './types';

describe('extract: parameters validation', () => {
    it('works with valid parameters', async () => {
        await extract({data: {a: 'b'}, schema: {$schema: 'b'}});
        await extract({data: {a: 'b'}, schema: {$schema: 'b'}, translateKeyword: 'translatable'});
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

    it('throws on invalid translateKeyword', async () => {
        const parameters = {
            data: {a: 'b'},
            schema: {$schema: 'b'},
            translateKeyword: '',
        } as unknown as JSONTranslationExtractParameters;
        await expect(extract(parameters)).rejects.toThrow();

        parameters.translateKeyword = null as unknown as undefined;
        await expect(extract(parameters)).rejects.toThrow();
    });
});
