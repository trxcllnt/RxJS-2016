var mergeAll = require("rx-3/operators/merge-all");
var fromArray = require("rx-3/observable/from-array");

module.exports = function () {
    var argsOff = 0;
    var argsIdx = -1;
    var argsLen = arguments.length;
    var observables = [];
    if(typeof this.subscribe === "function") {
        argsOff = 1;
        observables.push(this);
    }
    while(++argsIdx < argsLen) {
        observables[argsIdx + argsOff] = arguments[argsIdx];
    }
    return mergeAll.call(fromArray(observables));
};