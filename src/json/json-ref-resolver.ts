import {resolveRefs} from 'json-refs';

export type JSONRefResolverParameters = {
    resolveCircular: boolean;
};

class JSONRefResolver {
    private resolveCircular: boolean;

    constructor(parameters: JSONRefResolverParameters) {
        const {resolveCircular} = parameters;

        this.resolveCircular = resolveCircular;
    }

    async resolve(json: object): Promise<object> {
        const {resolved, refs} = await resolveRefs(json, {
            resolveCirculars: this.resolveCircular,
        });

        return resolved;
    }
}

export {JSONRefResolver};
export default {JSONRefResolver};
