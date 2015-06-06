var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {
    
    var oldFilterWithImmediateScheduler = RxOld.Observable.range(0, 50, RxOld.Scheduler.immediate).filter(divByTwo).filter(divByTen);
    var newFilterWithImmediateScheduler = RxNew.Observable.range(0, 50).filter(divByTwo).filter(divByTen);

    return suite
        .add('old filter with immediate scheduler', function () {
            oldFilterWithImmediateScheduler.subscribe(_next, _throw, _return);
        })
        .add('new filter with immediate scheduler', function () {
            newFilterWithImmediateScheduler.subscribe(_next, _throw, _return);
        });

    function divByTwo(x) {
        return x / 2 === 0;
    }

    function divByTen(x) {
        return x / 10 === 0;
    }
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};
