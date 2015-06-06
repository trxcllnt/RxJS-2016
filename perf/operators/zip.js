var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {
    
    var oldZipWithImmediateScheduler = RxOld.Observable.zip(RxOld.Observable.range(0, 10), RxOld.Observable.range(0, 10), add);
    var oldZipWithCurrentThreadScheduler = RxOld.Observable.zip(RxOld.Observable.range(0, 10, RxOld.Scheduler.currentThread), RxOld.Observable.range(0, 10, RxOld.Scheduler.currentThread), add);
    var newZipWithImmediateScheduler = RxNew.Observable.zip(RxNew.Observable.range(0, 10), RxNew.Observable.range(0, 10), add);
    var newZipWithCurrentThreadScheduler = RxNew.Observable.zip(RxNew.Observable.range(0, 10, RxNew.Scheduler), RxNew.Observable.range(0, 10, RxNew.Scheduler), add);

    return suite
        .add('old zip with immediate scheduler', function () {
            oldZipWithImmediateScheduler.subscribe();
        })
        .add('old zip with current thread scheduler', function () {
            oldZipWithCurrentThreadScheduler.subscribe();
        })
        .add('new zip with immediate scheduler', function () {
            newZipWithImmediateScheduler.subscribe();
        })
        .add('new zip with current thread scheduler', function () {
            newZipWithCurrentThreadScheduler.subscribe();
        });
    
    function add(x, y) {
        return x + y;
    }
};