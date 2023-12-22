class TraversalError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'TraversalError';

        Error.captureStackTrace(this, this.constructor);
    }
}

export {TraversalError};
export default {TraversalError};
