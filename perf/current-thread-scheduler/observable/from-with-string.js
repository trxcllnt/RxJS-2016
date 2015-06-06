var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function fromWithString(suite) {
    var args = [];
    for (var i = 0; i < 25; i++) {
        args.push(i);
    }
    var argStr = args.join('');

    var oldFromWithCurrentThreadScheduler = RxOld.Observable.from(argStr, null, null, RxOld.Scheduler.currentThread);
    var newFromWithCurrentThreadScheduler = RxNew.Observable.from(argStr, null, null, RxNew.Scheduler);

    // add tests
    return suite
        .add('old from (array) with current thread scheduler', function () {
            oldFromWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        })
        .add('new from (array) with current thread scheduler', function () {
            newFromWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        });
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};