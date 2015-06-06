var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function fromWithString(suite) {
    var args = [];
    for (var i = 0; i < 25; i++) {
        args.push(i);
    }
    var argStr = args.join('');

    var oldFromWithImmediateScheduler = RxOld.Observable.from(argStr, null, null, RxOld.Scheduler.immediate);
    var oldFromWithCurrentThreadScheduler = RxOld.Observable.from(argStr, null, null, RxOld.Scheduler.currentThread);
    var newFromWithImmediateScheduler = RxNew.Observable.from(argStr, null, null);
    var newFromWithCurrentThreadScheduler = RxNew.Observable.from(argStr, null, null, RxNew.Scheduler);

    // add tests
    return suite
        .add('old from (array) with immediate scheduler', function () {
            oldFromWithImmediateScheduler.subscribe();
        })
        .add('old from (array) with current thread scheduler', function () {
            oldFromWithCurrentThreadScheduler.subscribe();
        })
        .add('new from (array) with immediate scheduler', function () {
            newFromWithImmediateScheduler.subscribe();
        })
        .add('new from (array) with current thread scheduler', function () {
            newFromWithCurrentThreadScheduler.subscribe();
        });
}