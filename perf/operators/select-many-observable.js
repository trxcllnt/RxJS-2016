var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {

    var oldSelectManyWithImmediateScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.immediate).selectMany(RxOld.Observable.range(0, 25, RxOld.Scheduler.immediate));
    var oldSelectManyWithCurrentThreadScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.currentThread).selectMany(RxOld.Observable.range(0, 25, RxOld.Scheduler.immediate));
    var newSelectManyWithImmediateScheduler = RxNew.Observable.range(0, 25).selectMany(RxNew.Observable.range(0, 25));
    var newSelectManyWithCurrentThreadScheduler = RxNew.Observable.range(0, 25, RxNew.Scheduler).selectMany(RxNew.Observable.range(0, 25, RxNew.Scheduler));

    return suite
        .add('old selectMany (Observable) with immediate scheduler', function () {
            oldSelectManyWithImmediateScheduler.subscribe();
        })
        .add('old selectMany (Observable) with current thread scheduler', function () {
            oldSelectManyWithCurrentThreadScheduler.subscribe();
        })
        .add('new selectMany (Observable) with immediate scheduler', function () {
            newSelectManyWithImmediateScheduler.subscribe();
        })
        .add('new selectMany (Observable) with current thread scheduler', function () {
            newSelectManyWithCurrentThreadScheduler.subscribe();
        });
}