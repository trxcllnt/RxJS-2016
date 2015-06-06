var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {
    
    var oldMergeWithImmediateScheduler = RxOld.Observable.range(0, 250, RxOld.Scheduler.immediate).merge(RxOld.Observable.range(0, 250, RxOld.Scheduler.immediate));
    var oldMergeWithCurrentThreadScheduler = RxOld.Observable.range(0, 250, RxOld.Scheduler.currentThread).merge(RxOld.Observable.range(0, 250, RxOld.Scheduler.currentThread));
    var newMergeWithImmediateScheduler = RxNew.Observable.range(0, 250).merge(RxNew.Observable.range(0, 250));
    var newMergeWithCurrentThreadScheduler = RxNew.Observable.range(0, 250, RxNew.Scheduler).merge(RxNew.Observable.range(0, 250, RxNew.Scheduler));

    return suite
        .add('old merge (proto) with immediate scheduler', function () {
            oldMergeWithImmediateScheduler.subscribe();
        })
        .add('old merge (proto) with current thread scheduler', function () {
            oldMergeWithCurrentThreadScheduler.subscribe();
        })
        .add('new merge (proto) with immediate scheduler', function () {
            newMergeWithImmediateScheduler.subscribe();
        })
        .add('new merge (proto) with current thread scheduler', function () {
            newMergeWithCurrentThreadScheduler.subscribe();
        });
};