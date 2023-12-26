class ExtractorError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ExtractorError';

        Error.captureStackTrace(this, this.constructor);
    }
}

export {ExtractorError};
export default {ExtractorError};
