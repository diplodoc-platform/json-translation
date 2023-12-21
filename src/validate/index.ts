function isPlainObject(val: unknown) {
    // eslint-disable-next-line no-eq-null, eqeqeq
    return val != null && Object.prototype.toString.call(val) === '[object Object]';
}

function isObjectOrArray(val: unknown) {
    // eslint-disable-next-line no-eq-null, eqeqeq
    return typeof val === 'object' && val != null;
}

function isNonEmptyObject(val: object) {
    return Boolean(Object.keys(val).length);
}

function isIntStr(str: string) {
    return !isNaN(parseInt(str, 10));
}

export {isObjectOrArray, isPlainObject, isNonEmptyObject, isIntStr};
export default {isObjectOrArray, isPlainObject, isNonEmptyObject, isIntStr};
