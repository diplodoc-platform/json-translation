import {JSONTranslationExtractParameters, JSONTranslationExtractResult} from './index';

/**
 * extract function for extracting translatable text from JSON data based on a JSON schema.
 *
 * @param {JSONTranslationExtractParameters} parameters - The parameters for the extraction process.
 * @returns {Promise<JSONTranslationExtractResult>} A promise that resolves to the extraction result
 */
async function extract(
    parameters: JSONTranslationExtractParameters,
): Promise<JSONTranslationExtractResult> {
    throw new Error('not implemented');
    return {skeleton: {}, xliff: ''};
}

export {extract};
export default {extract};
