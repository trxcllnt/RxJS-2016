var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {
    
    var oldMergeWithCurrentThreadScheduler = RxOld.Observable.range(0, 250, RxOld.Scheduler.currentThread).merge(RxOld.Observable.range(0, 250, RxOld.Scheduler.currentThread));
    var newMergeWithCurrentThreadScheduler = RxNew.Observable.range(0, 250, RxNew.Scheduler).merge(RxNew.Observable.range(0, 250, RxNew.Scheduler));

    return suite
        .add('old merge (proto) with current thread scheduler', function () {
            oldMergeWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        })
        .add('new merge (proto) with current thread scheduler', function () {
            newMergeWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        });
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};