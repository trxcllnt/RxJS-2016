var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {

    var oldSelectManyWithCurrentThreadScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.currentThread).selectMany(RxOld.Observable.range(0, 25, RxOld.Scheduler.immediate));
    var newSelectManyWithCurrentThreadScheduler = RxNew.Observable.range(0, 25, RxNew.Scheduler).selectMany(RxNew.Observable.range(0, 25, RxNew.Scheduler));

    return suite
        .add('old selectMany (Observable) with current thread scheduler', function () {
            oldSelectManyWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        })
        .add('new selectMany (Observable) with current thread scheduler', function () {
            newSelectManyWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        });
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};