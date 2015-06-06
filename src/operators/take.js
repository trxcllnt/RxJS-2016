var Observer = require("rx-3/Observer");

function getObserver(destination) {
    return new TakeObserver(destination, this.total);
};

function TakeObserver(destination, total) {
    this.count = 0;
    this.total = total;
    Observer.call(this, destination);
    if(total <= 0) {
        this["return"]();
    }
}

TakeObserver.prototype = Object.create(Observer.prototype);

TakeObserver.prototype._next = function _next(value) {
    if(++this.count <= this.total) {
        return this.destination.next(value);
    } else {
        return this.destination["return"]();
    }
};

module.exports = function take(total) {
    return new this.constructor(this, { total: total, getObserver: getObserver });
};