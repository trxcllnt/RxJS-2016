var Observer = require("rx-3/Observer");

var InitialLast = {};

function getObserver(destination) {
    return new LastObserver(destination, this.defaultValue);
};

function LastObserver(destination, defaultValue) {
    this.value = defaultValue;
    Observer.call(this, destination);
}

LastObserver.prototype = Object.create(Observer.prototype);

LastObserver.prototype._next = function _next(value) {
    this.value = value;
};

LastObserver.prototype._return = function _return() {
    if(this.value === InitialLast) {
        return this.destination["throw"](new Error("Sequence contains no elements."));
    }
    var result = this.destination["next"](this.value);
    if(result.done) {
        return result;
    }
    return this.destination["return"]();
};

module.exports = function last(defaultValue) {
    return new this.constructor(this, { defaultValue: typeof defaultValue === "undefined" && InitialLast || value, getObserver: getObserver });
};