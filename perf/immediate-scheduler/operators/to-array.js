var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {

    var oldToArrayWithImmediateScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.immediate).toArray();
    var newToArrayWithImmediateScheduler = RxNew.Observable.range(0, 25).toArray();

    return suite
        .add('old toArray with immediate scheduler', function () {
            oldToArrayWithImmediateScheduler.subscribe(_next, _throw, _return);
        })
        .add('new toArray with immediate scheduler', function () {
            newToArrayWithImmediateScheduler.subscribe(_next, _throw, _return);
        });
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};