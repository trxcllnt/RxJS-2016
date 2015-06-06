var errorObj = require("rx-3/support/error-object");
var tryCatchTarget;

function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    } catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}

module.exports = function tryCatch(fn) {
    // if (!isFunction(fn)) {
    //     throw new TypeError('fn must be a function');
    // }
    tryCatchTarget = fn;
    return tryCatcher;
};