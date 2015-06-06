var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {
    
    var oldScanWithImmediateScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.immediate).scan(add);
    var oldScanWithCurrentThreadScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.currentThread).scan(add);
    var newScanWithImmediateScheduler = RxNew.Observable.range(0, 25).scan(add);
    var newScanWithCurrentThreadScheduler = RxNew.Observable.range(0, 25, RxNew.Scheduler).scan(add);

    return suite
        .add('old scan with immediate scheduler', function () {
            oldScanWithImmediateScheduler.subscribe();
        })
        .add('old scan with current thread scheduler', function () {
            oldScanWithCurrentThreadScheduler.subscribe();
        })
        .add('new scan with immediate scheduler', function () {
            newScanWithImmediateScheduler.subscribe();
        })
        .add('new scan with current thread scheduler', function () {
            newScanWithCurrentThreadScheduler.subscribe();
        });

    function add(acc, x) {
        return x + x
    }
};