var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function of(suite) {
    
    var args = [];
    for (var i = 0; i < 25; i++) {
        args.push(i);
    }

    var oldOfWithImmediateScheduler = RxOld.Observable.of.apply(null, args.concat(RxOld.Scheduler.immediate));
    var oldOfWithCurrentThreadScheduler = RxOld.Observable.of.apply(null, args.concat(RxOld.Scheduler.currentThread));
    var newOfWithImmediateScheduler = RxNew.Observable.of.apply(null, args);
    var newOfWithCurrentThreadScheduler = RxNew.Observable.of.apply(null, args.concat(RxNew.Scheduler));

    // add tests
    return suite
        .add('old of with immediate scheduler', function () {
            oldOfWithImmediateScheduler.subscribe();
        })
        .add('old of with current thread scheduler', function () {
            oldOfWithCurrentThreadScheduler.subscribe();
        })
        .add('new of with immediate scheduler', function () {
            newOfWithImmediateScheduler.subscribe();
        })
        .add('new of with current thread scheduler', function () {
            newOfWithCurrentThreadScheduler.subscribe();
        });
};