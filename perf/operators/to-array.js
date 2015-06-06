var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {

    var oldToArrayWithImmediateScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.immediate).toArray();
    var oldToArrayWithCurrentThreadScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.currentThread).toArray();
    var newToArrayWithImmediateScheduler = RxNew.Observable.range(0, 25).toArray();
    var newToArrayWithCurrentThreadScheduler = RxNew.Observable.range(0, 25, RxNew.Scheduler).toArray();

    return suite
        .add('old toArray with immediate scheduler', function () {
            oldToArrayWithImmediateScheduler.subscribe();
        })
        .add('old toArray with current thread scheduler', function () {
            oldToArrayWithCurrentThreadScheduler.subscribe();
        })
        .add('new toArray with immediate scheduler', function () {
            newToArrayWithImmediateScheduler.subscribe();
        })
        .add('new toArray with current thread scheduler', function () {
            newToArrayWithCurrentThreadScheduler.subscribe();
        });
};