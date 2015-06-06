var Observer = require("rx-3/Observer");
var try_catch = require("rx-3/support/try-catch");
var error_obj = require("rx-3/support/error-object");

function getObserver(destination) {
    return new SelectObserver(destination, this.project);
};

function SelectObserver(destination, project) {
    if(typeof project !== "function") {
        this.value = project;
    } else {
        this.project = project;
    }
    Observer.call(this, destination);
}

SelectObserver.prototype = Object.create(Observer.prototype);

SelectObserver.prototype.project = function projectValue() {
    return this.value;
};

SelectObserver.prototype._next = function _next(value) {
    value = try_catch(this.project).call(this, value);
    if(value === error_obj) {
        return this.destination["throw"](error_obj.e);
    } else {
        return this.destination.next(value);
    }
};

module.exports = function select(project) {
    return new this.constructor(this, { project: project, getObserver: getObserver });
};
