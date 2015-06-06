var Observable = require("rx-3/Observable");
var noop = require("rx-3/support/noop");
var staticNever = new Observable({ subscribe: noop });
module.exports = function never() {
    return staticNever;
};