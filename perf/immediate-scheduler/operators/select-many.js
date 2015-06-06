var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {
    
    var oldSelectManyWithImmediateScheduler = RxOld.Observable.range(0, 10, RxOld.Scheduler.immediate).selectMany(function (x) { return RxOld.Observable.range(x, 10, RxOld.Scheduler.immediate); });
    var newSelectManyWithImmediateScheduler = RxNew.Observable.range(0, 10).selectMany(function (x) { return RxNew.Observable.range(x, 10); });

    return suite
        .add('old selectMany with immediate scheduler', function () {
            oldSelectManyWithImmediateScheduler.subscribe(_next, _throw, _return);
        })
        .add('new selectMany with immediate scheduler', function () {
            newSelectManyWithImmediateScheduler.subscribe(_next, _throw, _return);
        });
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};