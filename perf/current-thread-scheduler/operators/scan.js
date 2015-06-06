var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {
    
    var oldScanWithCurrentThreadScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.currentThread).scan(add);
    var newScanWithCurrentThreadScheduler = RxNew.Observable.range(0, 25, RxNew.Scheduler).scan(add);

    return suite
        .add('old scan with current thread scheduler', function () {
            oldScanWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        })
        .add('new scan with current thread scheduler', function () {
            newScanWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        });

    function add(acc, x) {
        return x + x
    }
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};