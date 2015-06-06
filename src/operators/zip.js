var zipAll = require("rx-3/operators/zip-all");
var fromArray = require("rx-3/observable/from-array");
var flatten = require("rx-3/support/arguments-flatten");

module.exports = function combine() {
    var observables = flatten(arguments);
    var project = observables.pop();
    if(typeof project !== "function") {
        observables.push(project);
        project = void 0;
    }
    if(typeof this.subscribe === "function") {
        observables.unshift(this);
    }
    return zipAll.call(fromArray(observables), project);
};
