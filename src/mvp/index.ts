import {readFile} from 'node:fs/promises';

import Ajv, {CodeKeywordDefinition, KeywordCxt, _} from 'ajv';
import {resolveRefs} from 'json-refs';

export type MVPParameters = {
    schemaPath: string;
    dataPath: string;
};

async function mvp(parameters: MVPParameters) {
    const {schemaPath, dataPath} = parameters;

    const [schema, data] = await Promise.all([provideJSON(schemaPath), provideJSON(dataPath)]);

    // eslint-disable-next-line no-console
    console.log('schema');
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(schema, null, 4));

    // eslint-disable-next-line no-console
    console.log('data');
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(data, null, 4));

    const hashGeneration = provideHashGeneration({
        initial: 1,
        prefix: '%%%',
        suffix: '%%%',
        ctx: {
            segments: new Array<string>(),
        },
    });

    const code = provideCodeGeneration({translateFunction: hashGeneration.fn});

    // traversals of the json data with json schema in mind
    // is done via ajv user defined keywords
    const ajv = new Ajv();
    const extractKeyword: CodeKeywordDefinition = {
        keyword: 'translatable',
        type: ['string', 'object', 'array'],
        // modifying: true,
        // before: 'enum',
        code,
    };
    ajv.addKeyword(extractKeyword);
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (valid) {
        // eslint-disable-next-line no-console
        console.log('valid');
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(data, null, 4));
        // eslint-disable-next-line no-console
        console.log('text/markdown segments:');
        // eslint-disable-next-line no-console
        console.log(hashGeneration.ctx.segments);

        return {
            extracted: hashGeneration.counter - 1,
            segments: hashGeneration.ctx.segments,
            valid,
        };
    } else {
        // eslint-disable-next-line no-console
        console.log('invalid');
        // eslint-disable-next-line no-console
        console.log(validate.errors);
        throw new Error('test failed');
    }
}

// json file reader, parser, refs resolver
async function provideJSON(path: string) {
    const file = await readFile(path, {encoding: 'utf8'});
    const parsed = JSON.parse(file);
    const {resolved} = await resolveRefs(parsed, {
        resolveCirculars: true,
    });

    return resolved;
}

// hash generation function (extract api emulation)
export type ProvideHashGenerationParameters = {
    initial: number;
    prefix: string;
    suffix: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ctx: Record<string, any>;
};

function provideHashGeneration({initial, prefix, suffix, ctx}: ProvideHashGenerationParameters) {
    const rv = {
        counter: initial,
        fn: (str: string) => {
            ctx?.segments?.push(str);
            return `${prefix}${rv.counter++}${suffix}`;
        },
        ctx,
    };

    return rv;
}

// generate new values
export type ProvideCodeGenerationParameters = {
    translateFunction: Function;
};

function provideCodeGeneration(args: ProvideCodeGenerationParameters) {
    const {translateFunction} = args;
    return function (cxt: KeywordCxt) {
        const {gen, data, it} = cxt;
        const {parentData, parentDataProperty} = it;
        gen.if(_`typeof ${data} == "string" && ${parentData} !== undefined`, () => {
            const func = gen.scopeValue('func', {ref: translateFunction});
            gen.assign(data, _`${func}(${data})`);
            gen.assign(_`${parentData}[${parentDataProperty}]`, data);
        });
    };
}

export {mvp};

export default {mvp};
