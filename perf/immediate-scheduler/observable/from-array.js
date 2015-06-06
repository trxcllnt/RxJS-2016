var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function fromArray(suite) {
    var args = [];
    for (var i = 0; i < 25; i++) {
        args.push(i);
    }

    var oldFromArrayWithImmediateScheduler = RxOld.Observable.fromArray(args, RxOld.Scheduler.immediate);
    var newFromArrayWithImmediateScheduler = RxNew.Observable.fromArray(args);

    // add tests
    return suite
        .add('old fromArray with immediate scheduler', function () {
            oldFromArrayWithImmediateScheduler.subscribe(_next, _throw, _return);
        })
        .add('new fromArray with immediate scheduler', function () {
            newFromArrayWithImmediateScheduler.subscribe(_next, _throw, _return);
        });
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};