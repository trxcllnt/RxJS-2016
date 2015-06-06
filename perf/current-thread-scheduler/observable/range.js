var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function range(suite) {
    // add tests

    var oldRangeWithCurrentThreadScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.currentThread);
    var newRangeWithCurrentThreadScheduler = RxNew.Observable.range(0, 25, RxNew.Scheduler);

    return suite
        .add('old range with current thread scheduler', function () {
            oldRangeWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        })
        .add('new range with current thread scheduler', function () {
            newRangeWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        });
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};