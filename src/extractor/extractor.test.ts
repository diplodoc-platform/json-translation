import {Extractor} from './extractor';

const schema = require('src/mvp/__fixtures__/schema.json');
const data = require('src/mvp/__fixtures__/data.json');

describe('extractor', () => {
    it('generates skeleton and xliff', async () => {
        const extractorArguments = {
            schema,
            data,
        };

        const extractor = new Extractor(extractorArguments);
        const {skeleton, xliff} = await extractor.extract();

        expect(skeleton).toMatchSnapshot();
        expect(xliff).toMatchSnapshot();
    });
});
