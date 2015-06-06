var Observer = require("rx-3/Observer");

function getObserver(destination) {
    return new CountObserver(destination, 0);
};

function CountObserver(destination, count) {
    this.count = count;
    Observer.call(this, destination);
}

CountObserver.prototype = Object.create(Observer.prototype);

CountObserver.prototype._next = function _next(value) {
    ++this.count;
};

CountObserver.prototype._return = function _return() {
    var result = this.destination.next(this.count);
    if(result.done) {
        return result;
    }
    return this.destination["return"]();
};

module.exports = function count() {
    return new this.constructor(this, { getObserver: getObserver });
};