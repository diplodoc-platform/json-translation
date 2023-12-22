import {JSONTraversal, JSONTraversalParameters} from './traversal';

import {pageConstructorData, pageConstructorSchema} from './__fixtures__';

describe('json traversal', () => {
    it('is able to modify data in place', () => {
        const data = JSON.parse(JSON.stringify(pageConstructorData));

        const traversalArguments: JSONTraversalParameters = {
            schema: pageConstructorSchema,
        };
        const traversal = new JSONTraversal(traversalArguments);
        traversal.addNodeHandler('string', 'translatable', () => 'i am able to modify strings');

        traversal.traverse(data);
        expect(data).toMatchSnapshot();
    });

    it('is able to collect values', () => {
        const data = JSON.parse(JSON.stringify(pageConstructorData));
        const strings: Array<string> = new Array<string>();

        const traversalArguments: JSONTraversalParameters = {
            schema: pageConstructorSchema,
        };
        const traversal = new JSONTraversal(traversalArguments);
        traversal.addNodeHandler('string', 'translatable', (s: string) => {
            strings.push(s);
            return s;
        });

        traversal.traverse(data);
        expect(strings).toMatchSnapshot();
    });
});
