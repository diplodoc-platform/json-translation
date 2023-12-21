function isPlainObject(val: unknown) {
    // eslint-disable-next-line no-eq-null, eqeqeq
    return val != null && Object.prototype.toString.call(val) === '[object Object]';
}

function isNonEmptyObject(val: object) {
    return Boolean(Object.keys(val).length);
}

function isIntStr(str: string) {
    return !isNaN(parseInt(str, 10));
}

export {isPlainObject, isNonEmptyObject, isIntStr};
export default {isPlainObject, isNonEmptyObject, isIntStr};
