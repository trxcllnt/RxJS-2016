var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {

    var oldSelectWithCurrentThreadScheduler = RxOld.Observable.range(0, 50).select(square).select(double);
    var newSelectWithCurrentThreadScheduler = RxNew.Observable.range(0, 50, RxNew.Scheduler).select(square).select(double);

    return suite
        .add('old select with current thread scheduler', function () {
            oldSelectWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        })
        .add('new select with current thread scheduler', function () {
            newSelectWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        });

    function square(x) {
        return x * x;
    }

    function double(x) {
        return x + x;
    }
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};