var noop = require("rx-3/support/noop");

function Observer(destinationOrNext, _throw, _return) {
    this.unsubscribed = false;
    if (destinationOrNext && typeof destinationOrNext === "object") {
        this.result = destinationOrNext.result || { done: false };
        this.destination = destinationOrNext;
        destinationOrNext["next"] || (destinationOrNext["next"] = noop);
        destinationOrNext["throw"] || (destinationOrNext["throw"] = noop);
        destinationOrNext["return"] || (destinationOrNext["return"] = noop);
    } else {
        this.result = { done: false };
        this._next = destinationOrNext && wrapTryCatch(destinationOrNext) || noop;
        this._throw = _throw && wrapTryCatch(_throw) || noop;
        this._return = _return && wrapTryCatch(_return) || noop;
    }
}

Observer.prototype.unsubscribe = function unsubscribe() {
    this.unsubscribed = true;
};

Observer.prototype["next"] = function (value) {

    var result = this.result;

    if (this.unsubscribed || Boolean(result.done)) {
        return result;
    }

    var result2 = this._next(value) || result;

    if (result !== result2) {
        result.done = result2.done;
        result.value = result2.value;
    }

    if (result.done) {
        this.unsubscribe();
    }

    return result;
};

Observer.prototype["throw"] = function (error) {

    var result = this.result;

    if (this.unsubscribed || Boolean(result.done)) {
        return result;
    }

    var result2 = this._throw(error) || result;

    if (result !== result2) {
        result.value = result2.value;
    }
    result.done = true;

    this.unsubscribe();

    return result;
};

Observer.prototype["return"] = function () {

    var result = this.result;

    if (this.unsubscribed || Boolean(result.done)) {
        return result;
    }

    var result2 = this._return() || result;

    if (result !== result2) {
        result.value = result2.value;
    }

    result.done = true;

    this.unsubscribe();

    return result;
};

Observer.prototype._next = function (value) {
    return this.destination["next"](value);
};

Observer.prototype._throw = function (error) {
    return this.destination["throw"](error);
};

Observer.prototype._return = function () {
    return this.destination["return"]();
};

function wrapTryCatch(tryCatchTarget) {
    return function tryCatcher() {
        try {
            return tryCatchTarget.apply(this, arguments);
        } catch (e) {
            return this["throw"](e);
        }
    }
};

module.exports = Observer;