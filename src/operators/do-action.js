var noop = require("rx-3/support/noop");
var Observer = require("rx-3/Observer");
var thrower = require("rx-3/support/thrower");
var try_catch = require("rx-3/support/try-catch");
var error_obj = require("rx-3/support/error-object");

function getObserver(destination) {
    return new DoActionObserver(destination, this._next, this._throw, this._return);
};

function DoActionObserver(destination, sinkOrNext, _throw, _return) {
    if(sinkOrNext && typeof sinkOrNext === "object") {
        observer.sink = sinkOrNext;
    } else {
        observer.__next = sinkOrNext || noop;
        observer.__throw = _throw    || noop;
        observer.__return = _return  || noop;
    }
    Observer.call(this, destination);
}

DoActionObserver.prototype = Object.create(Observer.prototype);

DoActionObserver.prototype._next = function _next(value) {
    var result = try_catch(this.__next).call(this, value);
    if(result === error_obj) {
        thrower(error_obj.e);
    } else {
        return this.destination["next"](value);
    }
};

DoActionObserver.prototype._throw = function _throw(error) {
    var result = try_catch(this.__throw).call(this, error);
    if(result === error_obj) {
        thrower(error_obj.e);
    } else {
        return this.destination["throw"](error);
    }
};

DoActionObserver.prototype._return = function _return() {
    var result = try_catch(this.__return).call(this);
    if(result === error_obj) {
        thrower(error_obj.e);
    } else {
        return this.destination["return"]();
    }
};

DoActionObserver.prototype.__next = function __next(value) {
    return this.sink["next"](value);
};

DoActionObserver.prototype.__throw = function __throw(error) {
    return this.sink["throw"](error);
};

DoActionObserver.prototype.__return = function __return() {
    return this.sink["return"]();
};

module.exports = function doAction(_next, _throw, _return) {
    return new this.constructor(this, { _next: _next, _throw: _throw, _return: _return, getObserver: getObserver });
};