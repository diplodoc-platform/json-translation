import {JSONTranslationComposeParameters, JSONTranslationComposeResult} from './index';

class MyError extends Error {}

/**
 * compose translations from XLIFF and skeleton into translated JSON.
 *
 * @param {JSONTranslationComposeParameters} parameters - The parameters for the composition process.
 * @returns {Promise<JSONTranslationComposeResult>} A promise that resolves to the composition result.
 */
async function compose(
    parameters: JSONTranslationComposeParameters,
): Promise<JSONTranslationComposeResult> {
    throw new Error('not implemented');
    return {};
}

export {compose};
export default {compose};
