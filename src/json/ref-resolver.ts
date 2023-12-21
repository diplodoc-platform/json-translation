import {resolveRefs} from 'json-refs';

export type JSONRefResolverParameters = {
    resolveCircular: boolean;
};

class JSONRefResolver {
    private resolveCircular: boolean;
    private refs: object;

    constructor(parameters: JSONRefResolverParameters) {
        const {resolveCircular} = parameters;

        this.resolveCircular = resolveCircular;
        this.refs = {};
    }

    async resolve(json: object): Promise<object> {
        const {resolved, refs} = await resolveRefs(json, {
            resolveCirculars: this.resolveCircular,
        });

        this.refs = refs;

        return resolved;
    }

    getRefs(): object {
        return this.refs;
    }
}

export {JSONRefResolver};
export default {JSONRefResolver};
