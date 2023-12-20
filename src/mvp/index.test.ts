import {join} from 'node:path';

import {MVPParameters, mvp} from './index';

describe('mvp', () => {
    it('works', async () => {
        const fixturesPath = join(process.cwd(), 'src', 'mvp', '__fixtures__');
        const schemaPath = join(fixturesPath, 'schema.json');
        const dataPath = join(fixturesPath, 'data.json');

        const args: MVPParameters = {
            schemaPath,
            dataPath,
        };

        const {segments, extracted, valid} = await mvp(args);
        expect(extracted).toStrictEqual(21);
        expect(valid).toBeTruthy();
        expect(segments).toHaveLength(21);
    });
});
