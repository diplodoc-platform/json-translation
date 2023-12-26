import {Builder, Parser} from 'xml2js';

import {ExtractParameters} from '@diplodoc/markdown-translation';

export type XLIFFMergerParameters = {
    sourceLanguageLocale?: ExtractParameters['source'];
    targetLanguageLocale?: ExtractParameters['target'];
    dataType?: string;
    contentName?: string;
    skeletonName?: string;
    xmlNamespace?: string;
    xmlVersion?: string;
};

class XLIFFMerger {
    private xmlNamespace_: string;
    private xmlVersion_: string;

    private sourceLanguageLocale_: ExtractParameters['source'];
    private targetLanguageLocale_: ExtractParameters['target'];

    private dataType_: string;
    private contentName_: string;
    private skeletonName_: string;

    private parser: Parser;
    private builder: Builder;

    constructor(parameters: XLIFFMergerParameters) {
        const {
            sourceLanguageLocale,
            targetLanguageLocale,
            dataType,
            contentName,
            skeletonName,
            xmlNamespace,
            xmlVersion,
        } = parameters;

        this.sourceLanguageLocale_ = sourceLanguageLocale ?? {language: 'ru', locale: 'RU'};
        this.targetLanguageLocale_ = targetLanguageLocale ?? {language: 'en', locale: 'US'};

        this.dataType_ = dataType ?? 'markdown';
        this.contentName_ = contentName ?? 'json-translation-content';
        this.skeletonName_ = skeletonName ?? 'json-translation-skeleton';
        this.xmlNamespace_ = xmlNamespace ?? 'urn:oasis:names:tc:xliff:document:1.2';
        this.xmlVersion_ = xmlVersion ?? '1.2';

        this.parser = new Parser();
        this.builder = new Builder();
    }

    async merge(xliffs: Record<string, string>): Promise<string> {
        const merged = [];

        for (const [i, xliff] of Object.entries(xliffs)) {
            if (!xliff.length) {
                continue;
            }

            const parsed = await this.parser.parseStringPromise(xliff);
            const transUnits = parsed?.xliff?.file[0]?.body[0]['trans-unit'];
            if (!transUnits) {
                continue;
            }

            for (let j = 0; j < transUnits.length; j++) {
                transUnits[j].$.id = `${i}-${transUnits[j].$.id}`;
            }

            merged.push(...transUnits);
        }

        const document = this.xliffTemplate(merged);
        const rendered = this.builder.buildObject(document);

        return rendered;
    }

    private xliffTemplate(transUnits: unknown[]) {
        return {
            xliff: {
                $: {
                    xmlns: this.xmlNamespace_,
                    version: this.xmlVersion_,
                },
                file: [
                    {
                        $: {
                            original: this.contentName_,
                            'source-language': `${this.sourceLanguageLocale_.language}-${this.sourceLanguageLocale_.locale}`,
                            'target-language': `${this.targetLanguageLocale_.language}-${this.targetLanguageLocale_.locale}`,
                            datatype: this.dataType_,
                        },
                        header: [
                            {
                                skeleton: [
                                    {
                                        'external-file': [
                                            {
                                                $: {
                                                    href: this.skeletonName_,
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                        body: [{'trans-unit': transUnits}],
                    },
                ],
            },
        };
    }
}

export {XLIFFMerger};
export default {XLIFFMerger};
