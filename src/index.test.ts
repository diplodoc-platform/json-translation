import {id} from './index';

describe('smoke', () => {
    it('works', () => {
        const inut = 1;
        const expected = 1;

        const actual = id(inut);
        expect(actual).toStrictEqual(expected);
    });
});
