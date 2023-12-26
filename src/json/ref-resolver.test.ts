import {JSONRefResolver} from './ref-resolver';
import {withRefs, withoutRefs} from './__fixtures__';

describe('json ref resolver', () => {
    it('resolves refs', async () => {
        const jsonRefResolver = new JSONRefResolver({resolveCircular: true});

        const actual = await jsonRefResolver.resolve(withRefs);
        expect(actual).toMatchSnapshot();
    });

    it('works on objects without refs', async () => {
        const jsonRefResolver = new JSONRefResolver({resolveCircular: true});

        const actual = await jsonRefResolver.resolve(withoutRefs);
        expect(actual).toMatchSnapshot();
    });
});
