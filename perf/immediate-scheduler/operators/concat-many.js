var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {
    
    var oldConcatMapWithImmediateScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.immediate).concatMap(function (x) { return RxOld.Observable.range(x, 25, RxOld.Scheduler.immediate); });
    var newConcatMapWithImmediateScheduler = RxNew.Observable.range(0, 25).concatMap(function (x) { return RxNew.Observable.range(x, 25); });

    return suite
        .add('old concatMap with immediate scheduler', function () {
            oldConcatMapWithImmediateScheduler.subscribe(_next, _throw, _return);
        })
        .add('new concatMap with immediate scheduler', function () {
            newConcatMapWithImmediateScheduler.subscribe(_next, _throw, _return);
        });
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};