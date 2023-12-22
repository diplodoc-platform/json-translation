import Ajv, {JSONType, CodeKeywordDefinition, KeywordCxt, _} from 'ajv';
import {JSONSchema7} from 'json-schema';

import {TraversalError} from 'src/error/traversal';

export interface JSONTraversalHandler<T> {
    handleNode(val: T): T;
}

type AjvCodeGenerationFunctionParameters<T> = {
    type: JSONType;
    handler: T;
};

export type JSONTraversalParameters = {
    schema: JSONSchema7;
    ajv?: Ajv;
};

class JSONTraversal {
    private ajv: Ajv;
    private schema: JSONSchema7;

    constructor(parameters: JSONTraversalParameters) {
        const {ajv, schema} = parameters;

        this.ajv = ajv ?? new Ajv();
        this.schema = schema;
    }

    traverse(json: object): void {
        let validate;
        let valid;

        try {
            validate = this.ajv.compile(this.schema);
            valid = validate(json);
        } catch (err: unknown) {
            let message = 'failed to traverse data';
            if (err instanceof Error) {
                message += ` ${err.message}`;
            }

            throw new TraversalError(message);
        }

        if (!valid) {
            throw new TraversalError(
                `data doesn't match schema ${JSON.stringify(validate.errors)}`,
            );
        }
    }

    addNodeHandler<T extends JSONType, U>(type: T, schemaKeyword: string, handler: U) {
        const keyword: CodeKeywordDefinition = {
            keyword: schemaKeyword,
            type,
            code: this.ajvCodeGenerationFunction({handler, type}),
        };

        this.ajv.addKeyword(keyword);
    }

    private ajvCodeGenerationFunction<T>(parameters: AjvCodeGenerationFunctionParameters<T>) {
        const {handler, type} = parameters;

        return function (cxt: KeywordCxt) {
            const {gen, data, it} = cxt;
            const {parentData, parentDataProperty} = it;

            gen.if(_`typeof ${data} == ${type} && ${parentData} !== undefined`, () => {
                const func = gen.scopeValue('func', {ref: handler});
                gen.assign(data, _`${func}(${data})`);
                gen.assign(_`${parentData}[${parentDataProperty}]`, data);
            });
        };
    }
}

export {JSONTraversal};
export default {JSONTraversal};
