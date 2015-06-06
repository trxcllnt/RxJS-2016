var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function fromWithArray(suite) {
    var args = [];
    for (var i = 0; i < 25; i++) {
        args.push(i);
    }

    var oldFromWithImmediateScheduler = RxOld.Observable.from(args, null, null, RxOld.Scheduler.immediate);
    var oldFromWithCurrentThreadScheduler = RxOld.Observable.from(args, null, null, RxOld.Scheduler.currentThread);
    var newFromWithImmediateScheduler = RxNew.Observable.from(args, null, null);
    var newFromWithCurrentThreadScheduler = RxNew.Observable.from(args, null, null, RxNew.Scheduler);

    // add tests
    return suite
        .add('old from (array) with immediate scheduler', function () {
            oldFromWithImmediateScheduler.subscribe(_next, _throw, _return);
        })
        .add('old from (array) with current thread scheduler', function () {
            oldFromWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        })
        .add('new from (array) with immediate scheduler', function () {
            newFromWithImmediateScheduler.subscribe(_next, _throw, _return);
        })
        .add('new from (array) with current thread scheduler', function () {
            newFromWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        });
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};