var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {
    
    var oldScanWithImmediateScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.immediate).scan(add);
    var newScanWithImmediateScheduler = RxNew.Observable.range(0, 25).scan(add);

    return suite
        .add('old scan with immediate scheduler', function () {
            oldScanWithImmediateScheduler.subscribe(_next, _throw, _return);
        })
        .add('new scan with immediate scheduler', function () {
            newScanWithImmediateScheduler.subscribe(_next, _throw, _return);
        });

    function add(acc, x) {
        return x + x
    }
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};