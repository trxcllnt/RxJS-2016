var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {
    
    var oldCombineLatestWithImmediateScheduler = RxOld.Observable.combineLatest(RxOld.Observable.range(0, 10), RxOld.Observable.range(0, 10), add);
    var oldCombineLatestWithCurrentThreadScheduler = RxOld.Observable.combineLatest(RxOld.Observable.range(0, 10, RxOld.Scheduler.currentThread), RxOld.Observable.range(0, 10, RxOld.Scheduler.currentThread), add);
    var newCombineLatestWithImmediateScheduler = RxNew.Observable.combineLatest(RxNew.Observable.range(0, 10), RxNew.Observable.range(0, 10), add);
    var newCombineLatestWithCurrentThreadScheduler = RxNew.Observable.combineLatest(RxNew.Observable.range(0, 10, RxNew.Scheduler), RxNew.Observable.range(0, 10, RxNew.Scheduler), add);

    return suite
        .add('old combineLatest with immediate scheduler', function () {
            oldCombineLatestWithImmediateScheduler.subscribe();
        })
        .add('old combineLatest with current thread scheduler', function () {
            oldCombineLatestWithCurrentThreadScheduler.subscribe();
        })
        .add('new combineLatest with immediate scheduler', function () {
            newCombineLatestWithImmediateScheduler.subscribe();
        })
        .add('new combineLatest with current thread scheduler', function () {
            newCombineLatestWithCurrentThreadScheduler.subscribe();
        });
    
    function add(x, y) {
        return x + y;
    }
};