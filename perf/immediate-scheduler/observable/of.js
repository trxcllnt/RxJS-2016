var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function of(suite) {
    
    var args = [];
    for (var i = 0; i < 25; i++) {
        args.push(i);
    }

    var oldOfWithImmediateScheduler = RxOld.Observable.of.apply(null, args.concat(RxOld.Scheduler.immediate));
    var newOfWithImmediateScheduler = RxNew.Observable.of.apply(null, args);

    // add tests
    return suite
        .add('old of with immediate scheduler', function () {
            oldOfWithImmediateScheduler.subscribe(_next, _throw, _return);
        })
        .add('new of with immediate scheduler', function () {
            newOfWithImmediateScheduler.subscribe(_next, _throw, _return);
        });
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};