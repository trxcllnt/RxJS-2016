var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {
    
    var oldCombineLatestWithCurrentThreadScheduler = RxOld.Observable.combineLatest(RxOld.Observable.range(0, 10, RxOld.Scheduler.currentThread), RxOld.Observable.range(0, 10, RxOld.Scheduler.currentThread), add);
    var newCombineLatestWithCurrentThreadScheduler = RxNew.Observable.combineLatest(RxNew.Observable.range(0, 10, RxNew.Scheduler), RxNew.Observable.range(0, 10, RxNew.Scheduler), add);

    return suite
        .add('old combineLatest with current thread scheduler', function () {
            oldCombineLatestWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        })
        .add('new combineLatest with current thread scheduler', function () {
            newCombineLatestWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        });
    
    function add(x, y) {
        return x + y;
    }
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};