var Observer = require("rx-3/Observer");
var thrower = require("rx-3/support/thrower");
var try_catch = require("rx-3/support/try-catch");
var error_obj = require("rx-3/support/error-object");

function getObserver(destination) {
    return new ReduceObserver(destination, this.project, this.seed);
};

function ReduceObserver(destination, project, seed) {
    this.acc = seed;
    this.project = project;
    this.hasSeed = typeof seed !== "undefined"
    this.hasValue = false;
    Observer.call(this, destination);
}

ReduceObserver.prototype = Object.create(Observer.prototype);

ReduceObserver.prototype._next = function _next(value) {
    if(this.hasValue || (this.hasValue = this.hasSeed)) {
        value = try_catch(this.project).call(this, this.acc, value);
        if(value === error_obj) {
            return this.destination["throw"](error_obj.e);
        } else {
            this.acc = value;
        }
    } else {
        this.hasValue = true;
        this.acc = value;
    }
};

ReduceObserver.prototype._return = function _return() {
    if(this.hasValue || this.hasSeed) {
        var result = this.destination.next(this.acc);
        if(result.done) {
            return result;
        }
    }
    return this.destination["return"]();
};

module.exports = function reduce(project, seed) {
    return new this.constructor(this, { project: project, seed: seed, getObserver: getObserver });
};