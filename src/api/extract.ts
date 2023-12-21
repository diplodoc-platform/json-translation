import assert from 'node:assert';

import {InvalidParametersError} from 'src/error';
import {isNonEmptyObject, isObjectOrArray, isPlainObject} from 'src/validate';

import {ExtractPipeline} from 'src/extractor';

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
    assert(
        isExtractParametersValid(parameters),
        new InvalidParametersError('provide valid parameters for extract function'),
    );

    const extractor = new ExtractPipeline(parameters);
    return await extractor.extract();
}

/**
 * validate extract function parameters
 *
 * @param {JSONTranslationExtractParameters} parameters - The parameters for the extraction process.
 * @returns {Boolean} validation result - true if parameters valid and false otherwise
 * @internal
 */
function isExtractParametersValid(parameters: JSONTranslationExtractParameters): Boolean {
    const {data, schema, translateKeyword} = parameters;

    const dataCondition = isObjectOrArray(data) && isNonEmptyObject(data);
    const schemaCondition = isPlainObject(schema) && isNonEmptyObject(schema);
    const translateKeywordCondition =
        translateKeyword?.length || typeof translateKeyword === 'undefined';
    const conditions = [dataCondition, schemaCondition, translateKeywordCondition];

    return conditions.every(Boolean);
}

export {extract};
export default {extract};
