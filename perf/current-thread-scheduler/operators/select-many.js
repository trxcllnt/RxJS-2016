var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {
    
    var oldSelectManyWithCurrentThreadScheduler = RxOld.Observable.range(0, 10, RxOld.Scheduler.currentThread).selectMany(function (x) { return RxOld.Observable.range(x, 10, RxOld.Scheduler.currentThread); });
    var newSelectManyWithCurrentThreadScheduler = RxNew.Observable.range(0, 10, RxNew.Scheduler).selectMany(function (x) { return RxNew.Observable.range(x, 10, RxNew.Scheduler); });

    return suite
        .add('old selectMany with current thread scheduler', function () {
            oldSelectManyWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        })
        .add('new selectMany with current thread scheduler', function () {
            newSelectManyWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        });
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};