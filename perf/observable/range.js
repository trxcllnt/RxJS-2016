var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function range(suite) {
    // add tests
    
    var oldRangeWithImmediateScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.immediate);
    var oldRangeWithCurrentThreadScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.currentThread);
    var newRangeWithImmediateScheduler = RxNew.Observable.range(0, 25);
    var newRangeWithCurrentThreadScheduler = RxNew.Observable.range(0, 25, RxNew.Scheduler);

    return suite
        .add('old range with immediate scheduler', function () {
            oldRangeWithImmediateScheduler.subscribe();
        })
        .add('old range with current thread scheduler', function () {
            oldRangeWithCurrentThreadScheduler.subscribe();
        })
        .add('new range with immediate scheduler', function () {
            newRangeWithImmediateScheduler.subscribe();
        })
        .add('new range with current thread scheduler', function () {
            newRangeWithCurrentThreadScheduler.subscribe();
        });
};