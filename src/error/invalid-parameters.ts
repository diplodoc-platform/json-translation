class InvalidParametersError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidParametersError';

        Error.captureStackTrace(this, this.constructor);
    }
}

export {InvalidParametersError};
export default {InvalidParametersError};
