var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {
    
    var oldCombineLatestWithImmediateScheduler = RxOld.Observable.combineLatest(RxOld.Observable.range(0, 10), RxOld.Observable.range(0, 10), add);
    var newCombineLatestWithImmediateScheduler = RxNew.Observable.combineLatest(RxNew.Observable.range(0, 10), RxNew.Observable.range(0, 10), add);

    return suite
        .add('old combineLatest with immediate scheduler', function () {
            oldCombineLatestWithImmediateScheduler.subscribe(_next, _throw, _return);
        })
        .add('new combineLatest with immediate scheduler', function () {
            newCombineLatestWithImmediateScheduler.subscribe(_next, _throw, _return);
        });
    
    function add(x, y) {
        return x + y;
    }
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};