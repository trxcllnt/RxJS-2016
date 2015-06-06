var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {
    
    var oldConcatMapWithImmediateScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.immediate).concatMap(function (x) { return RxOld.Observable.range(x, 25, RxOld.Scheduler.immediate); });
    var oldConcatMapWithCurrentThreadScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.currentThread).concatMap(function (x) { return RxOld.Observable.range(x, 25, RxOld.Scheduler.currentThread); });
    var newConcatMapWithImmediateScheduler = RxNew.Observable.range(0, 25).concatMap(function (x) { return RxNew.Observable.range(x, 25); });
    var newConcatMapWithCurrentThreadScheduler = RxNew.Observable.range(0, 25, RxNew.Scheduler).concatMap(function (x) { return RxNew.Observable.range(x, 25, RxNew.Scheduler); });

    return suite
        .add('old concatMap with immediate scheduler', function () {
            oldConcatMapWithImmediateScheduler.subscribe(_next, _throw, _return);
        })
        .add('old concatMap with current thread scheduler', function () {
            oldConcatMapWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        })
        .add('new concatMap with immediate scheduler', function () {
            newConcatMapWithImmediateScheduler.subscribe(_next, _throw, _return);
        })
        .add('new concatMap with current thread scheduler', function () {
            newConcatMapWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        })
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};