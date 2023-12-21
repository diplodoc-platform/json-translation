import assert from 'node:assert';

import {JSONTranslationComposeParameters, JSONTranslationComposeResult} from './index';

import {InvalidParametersError} from 'src/error';
import {isIntStr, isNonEmptyObject, isPlainObject} from 'src/validate';

/**
 * compose translations from XLIFF and skeleton into translated JSON.
 *
 * @param {JSONTranslationComposeParameters} parameters - The parameters for the composition process.
 * @returns {Promise<JSONTranslationComposeResult>} A promise that resolves to the composition result.
 */
async function compose(
    parameters: JSONTranslationComposeParameters,
): Promise<JSONTranslationComposeResult> {
    assert(
        isComposeParametersValid(parameters),
        new InvalidParametersError('provide valid parameters for extract function'),
    );
    return {};
}

/**
 * validate compose function parameters
 *
 * @param {JSONTranslationComposeParameters} parameters - The parameters for the extraction process.
 * @returns {Boolean} validation result - true if parameters valid and false otherwise
 * @internal
 */
function isComposeParametersValid(parameters: JSONTranslationComposeParameters): Boolean {
    const {skeleton, xliff, schema} = parameters;

    let skeletonCondition = isPlainObject(skeleton) && isNonEmptyObject(skeleton);
    for (const [k, v] of Object.entries(skeleton)) {
        skeletonCondition = skeletonCondition && isIntStr(k) && Boolean(v?.length);
    }

    const xliffCondition = xliff?.length;
    const schemaCondition = isPlainObject(schema) && isNonEmptyObject(schema);

    const conditions = [skeletonCondition, xliffCondition, schemaCondition];

    return conditions.every(Boolean);
}

export {compose};
export default {compose};
