var fromArray = require("rx-3/observable/from-array");
var Scheduler = require("rx-3/Scheduler");

module.exports = function of() {
    
    var args, len = arguments.length,
        scheduler = arguments[len - 1];
    
    if(scheduler === Scheduler || scheduler instanceof Scheduler) {
        len -= 1;
        args = new Array(len);
        for (var i = 0; i < len; i++) {
            args[i] = arguments[i];
        }
        return fromArray(args, scheduler);
    }
    
    args = new Array(len);
    for (var i = 0; i < len; i++) {
        args[i] = arguments[i];
    }
    return fromArray(args);
};