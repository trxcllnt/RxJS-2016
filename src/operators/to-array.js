var Observer = require("rx-3/Observer");

function ToArrayObserverProvider() {
    
}

function getObserver(destination) {
    return new ToArrayObserver(destination, []);
};

function ToArrayObserver(destination, list) {
    this.list = list;
    Observer.call(this, destination);
}

ToArrayObserver.prototype = Object.create(Observer.prototype);

ToArrayObserver.prototype._next = function _next(value) {
    this.list.push(value);
};

ToArrayObserver.prototype._return = function _return() {
    var result = this.destination.next(this.list);
    if(result.done) {
        return result;
    }
    return this.destination["return"]();
};

module.exports = function toArray() {
    return new this.constructor(this, { getObserver: getObserver });
};