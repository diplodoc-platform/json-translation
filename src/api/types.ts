import {JSONSchema7} from 'json-schema';

/**
 * Parameters for extracting translations from JSON data based on a JSON schema.
 *
 * @typedef {Object} JSONTranslationExtractParameters
 * @property {Record<string, unknown>} data - The JSON data to translate.
 * @property {JSONSchema7} schema - The JSON schema signaling which strings to extract.
 * @property {string | undefined} translateKeyword - Optional. The keyword used to detect translatable text.
 */
export type JSONTranslationExtractParameters = {
    data: Record<string, unknown>;
    schema: JSONSchema7;
    translateKeyword?: string;
};

/**
 * extract result
 *
 * @typedef {Object} JSONTranslationExtractResult
 * @property {Record<string, string>} skeleton - The JSON with skeletons for each translatable string, containing placeholders instead of translatable segments.
 * @property {string} xliff - The XLIFF document containing translation units.
 */
export type JSONTranslationExtractResult = {
    skeleton: Record<string, string>;
    xliff: string;
};

/**
 * Parameters for composing translations from XLIFF and skeleton into translated json.
 *
 * schema - The JSON schema signaling which strings to replace with translations.
 *
 * skeleton - The JSON with skeletons for each translatable string, containing placeholders for translations.
 *
 * xliff - The XLIFF document containing translation units.
 *
 * @typedef {Object} JSONTranslationComposeParameters
 * @property {Record<string, string>} skeleton - The JSON with skeletons for each translatable string, containing placeholders for translations.
 * @property {string} xliff - The XLIFF document containing translation units.
 *
 * @property {JSONSchema7} schema - The JSON schema signaling which strings to replace with translations.
 */
export type JSONTranslationComposeParameters = {
    schema: JSONSchema7;
    skeleton: Record<string, string>;
    xliff: string;
};

/**
 * compose result
 *
 * translated json data
 */
export type JSONTranslationComposeResult = Promise<Record<string, unknown>>;
