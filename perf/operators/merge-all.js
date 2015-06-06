var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {
    
    var oldMergeAllWithImmediateScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.immediate).map(RxOld.Observable.range(0, 25), RxOld.Scheduler.immediate).mergeAll();
    var oldMergeAllWithCurrentThreadScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.currentThread).map(RxOld.Observable.range(0, 25), RxOld.Scheduler.currentThread).mergeAll();
    var newMergeAllWithImmediateScheduler = RxNew.Observable.range(0, 25).map(RxNew.Observable.range(0, 25)).mergeAll();
    var newMergeAllWithCurrentThreadScheduler = RxNew.Observable.range(0, 25, RxNew.Scheduler).map(RxNew.Observable.range(0, 25, RxNew.Scheduler)).mergeAll();

    return suite
        .add('old mergeAll with immediate scheduler', function () {
            oldMergeAllWithImmediateScheduler.subscribe(_next, _throw, _return);
        })
        .add('old mergeAll with current thread scheduler', function () {
            oldMergeAllWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        })
        .add('new mergeAll with immediate scheduler', function () {
            newMergeAllWithImmediateScheduler.subscribe(_next, _throw, _return);
        })
        .add('new mergeAll with current thread scheduler', function () {
            newMergeAllWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        });
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};