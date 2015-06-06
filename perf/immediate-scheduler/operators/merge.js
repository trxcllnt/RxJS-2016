var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {
    
    var oldMergeWithImmediateScheduler = RxOld.Observable.range(0, 250, RxOld.Scheduler.immediate).merge(RxOld.Observable.range(0, 250, RxOld.Scheduler.immediate));
    var newMergeWithImmediateScheduler = RxNew.Observable.range(0, 250).merge(RxNew.Observable.range(0, 250));

    return suite
        .add('old merge (proto) with immediate scheduler', function () {
            oldMergeWithImmediateScheduler.subscribe(_next, _throw, _return);
        })
        .add('new merge (proto) with immediate scheduler', function () {
            newMergeWithImmediateScheduler.subscribe(_next, _throw, _return);
        });
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};