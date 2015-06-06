var Observer = require("rx-3/Observer");
var try_catch = require("rx-3/support/try-catch");
var error_obj = require("rx-3/support/error-object");

function getObserver(destination) {
    return new WhereObserver(destination, this.select);
};

function WhereObserver(destination, select) {
    this.select = select;
    Observer.call(this, destination);
}

WhereObserver.prototype = Object.create(Observer.prototype);

WhereObserver.prototype._next = function _next(value) {
    var result = try_catch(this.select).call(this, value);
    if(result === error_obj) {
        return this.destination["throw"](error_obj.e);
    } else if(!result) {
        return this.result;
    } else {
        return this.destination.next(value);
    }
};

module.exports = function where(select) {
    return new this.constructor(this, { select: select, getObserver: getObserver });
};