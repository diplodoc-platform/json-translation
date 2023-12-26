import {resolveRefs} from 'json-refs';

export type JSONRefResolverParameters = {
    resolveCircular: boolean;
};

class JSONRefResolver {
    private resolveCircular_: boolean;
    private refs_: object;

    get refs(): object {
        return this.refs_;
    }

    constructor(parameters: JSONRefResolverParameters) {
        const {resolveCircular} = parameters;

        this.resolveCircular_ = resolveCircular;
        this.refs_ = {};
    }

    async resolve(json: object): Promise<object> {
        const {resolved, refs} = await resolveRefs(json, {
            resolveCirculars: this.resolveCircular_,
        });

        this.refs_ = refs;

        return resolved;
    }
}

export {JSONRefResolver};
export default {JSONRefResolver};
