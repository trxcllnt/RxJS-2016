var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {

    var oldToArrayWithCurrentThreadScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.currentThread).toArray();
    var newToArrayWithCurrentThreadScheduler = RxNew.Observable.range(0, 25, RxNew.Scheduler).toArray();

    return suite
        .add('old toArray with current thread scheduler', function () {
            oldToArrayWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        })
        .add('new toArray with current thread scheduler', function () {
            newToArrayWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        });
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};