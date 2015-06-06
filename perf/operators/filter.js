var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {
    
    var oldFilterWithImmediateScheduler = RxOld.Observable.range(0, 50, RxOld.Scheduler.immediate).filter(divByTwo).filter(divByTen);
    var oldFilterWithCurrentThreadScheduler = RxOld.Observable.range(0, 50, RxOld.Scheduler.currentThread).filter(divByTwo).filter(divByTen);
    var newFilterWithImmediateScheduler = RxNew.Observable.range(0, 50).filter(divByTwo).filter(divByTen);
    var newFilterWithCurrentThreadScheduler = RxNew.Observable.range(0, 50, RxNew.Scheduler).filter(divByTwo).filter(divByTen);

    return suite
        .add('old filter with immediate scheduler', function () {
            oldFilterWithImmediateScheduler.subscribe();
        })
        .add('old filter with current thread scheduler', function () {
            oldFilterWithCurrentThreadScheduler.subscribe();
        })
        .add('new filter with immediate scheduler', function () {
            newFilterWithImmediateScheduler.subscribe();
        })
        .add('new filter with current thread scheduler', function () {
            newFilterWithCurrentThreadScheduler.subscribe();
        });

    function divByTwo(x) {
        return x / 2 === 0;
    }

    function divByTen(x) {
        return x / 10 === 0;
    }
};
