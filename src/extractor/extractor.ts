import {JSONSchema7} from 'json-schema';

import {JSONTranslationExtractParameters, JSONTranslationExtractResult} from 'src/api';
import {JSONRefResolver, JSONTraversal} from 'src/json';
import {ExtractorError} from 'src/error/extractor';
import {ExtractFunctor} from './extract-functor';
import {XLIFFMerger} from './xliff-merger';

const SCHEMA_KEYWORD = 'translatable';

class Extractor {
    schema: JSONSchema7;
    data: object;
    schemaKeyword: string;

    extractFunctor: ExtractFunctor;
    jsonRefResolver: JSONRefResolver;
    jsonTraversal: JSONTraversal;
    xliffMerger: XLIFFMerger;

    constructor(parameters: JSONTranslationExtractParameters) {
        this.schema = parameters.schema;
        this.data = parameters.data;
        this.schemaKeyword = parameters.schemaKeyword ?? SCHEMA_KEYWORD;

        // dependencies
        this.extractFunctor = new ExtractFunctor({initialCounter: 1});
        this.jsonRefResolver = new JSONRefResolver({resolveCircular: true});
        const jsonTraversalArguments = {
            schema: this.schema,
            schemaKeyword: this.schemaKeyword,
        };
        this.jsonTraversal = new JSONTraversal(jsonTraversalArguments);
        this.xliffMerger = new XLIFFMerger({});
    }

    async extract(): Promise<JSONTranslationExtractResult> {
        try {
            this.schema = await this.jsonRefResolver.resolve(this.schema);
        } catch (err: unknown) {
            throw new ExtractorError('failed to resolve schema refs');
        }

        const extractHandler = this.extractFunctor.call.bind(this.extractFunctor);
        this.jsonTraversal.addNodeHandler('string', this.schemaKeyword, extractHandler);

        try {
            this.jsonTraversal.traverse(this.data);
        } catch (err: unknown) {
            throw new ExtractorError('failed to traverse data using schema');
        }

        let skeleton;
        let xliff;

        try {
            skeleton = this.extractFunctor.skeletons;
            xliff = await this.xliffMerger.merge(this.extractFunctor.xliffs);
        } catch (err: unknown) {
            throw new ExtractorError('failed to prepare xliff');
        }

        return {
            skeleton,
            xliff,
        };
    }
}

export {Extractor};
export default {Extractor};
