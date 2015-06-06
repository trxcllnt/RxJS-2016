var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function fromArray(suite) {
    var args = [];
    for (var i = 0; i < 25; i++) {
        args.push(i);
    }

    var oldFromArrayWithCurrentThreadScheduler = RxOld.Observable.fromArray(args, RxOld.Scheduler.currentThread);
    var newFromArrayWithCurrentThreadScheduler = RxNew.Observable.fromArray(args, RxNew.Scheduler);

    // add tests
    return suite
        .add('old fromArray with current thread scheduler', function () {
            oldFromArrayWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        })
        .add('new fromArray with current thread scheduler', function () {
            newFromArrayWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        });
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};