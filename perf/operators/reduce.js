var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {
    
    var oldReduceWithImmediateScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.immediate).reduce(add);
    var oldReduceWithCurrentThreadScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.currentThread).reduce(add);
    var newReduceWithImmediateScheduler = RxNew.Observable.range(0, 25).reduce(add);
    var newReduceWithCurrentThreadScheduler = RxNew.Observable.range(0, 25, RxNew.Scheduler).reduce(add);

    return suite
        .add('old reduce with immediate scheduler', function () {
            oldReduceWithImmediateScheduler.subscribe(_next, _throw, _return);
        })
        .add('old reduce with current thread scheduler', function () {
            oldReduceWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        })
        .add('new reduce with immediate scheduler', function () {
            newReduceWithImmediateScheduler.subscribe(_next, _throw, _return);
        })
        .add('new reduce with current thread scheduler', function () {
            newReduceWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        });

    function add(acc, x) {
        return x + x
    }
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};