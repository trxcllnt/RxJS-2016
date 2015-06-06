var combineAll = require("rx-3/operators/combine-all");
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
    return combineAll.call(fromArray(observables), project);
};
