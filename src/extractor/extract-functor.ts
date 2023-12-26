import {ExtractParameters, extract} from '@diplodoc/markdown-translation';

import {IFunctor} from 'src/functor';

export type ExtractFunctorParameters = {
    initialCounter: number;
};

class ExtractFunctor implements IFunctor<string> {
    private id_: number;
    private skeletons_: Record<string, string>;
    private xliffs_: Record<string, string>;
    private markdownTranslationArguments: ExtractParameters;

    get xliffs() {
        return this.xliffs_;
    }

    get skeletons() {
        return this.skeletons_;
    }

    constructor(parameters: ExtractFunctorParameters) {
        const {initialCounter} = parameters;

        this.id_ = initialCounter;
        this.skeletons_ = {};
        this.xliffs_ = {};

        this.markdownTranslationArguments = {
            source: {
                language: 'ru',
                locale: 'RU' as const,
            },
            target: {
                language: 'en',
                locale: 'US' as const,
            },
        };
    }

    call(str: string) {
        const key = `${this.id_}`;

        const extractArguments = {
            ...this.markdownTranslationArguments,
            markdown: str,
            markdownPath: `${this.id_}.md`,
            skeletonPath: `${this.id_}.skl.md`,
        };

        const {skeleton, xlf} = extract(extractArguments);

        this.skeletons_[key] = skeleton;
        this.xliffs_[key] = xlf;

        return this.skeleton();
    }

    private skeleton() {
        return `%%%${this.id_++}%%%`;
    }
}

export {ExtractFunctor};
export default {ExtractFunctor};
