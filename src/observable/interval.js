var Scheduler = require("rx-3/Scheduler");
var is_numeric = require("rx-3/support/is-numeric");

function IntervalObservable(period, scheduler) {
    this.period = period;
    this.scheduler = scheduler;
}

IntervalObservable.prototype = Object.create(Observable.prototype);
IntervalObservable.prototype.constructor = Observable;

IntervalObservable.prototype._subscribe = function _subscribe(observer) {
    return this.scheduler.schedule(this.period, [-1, index], dispatch);
};

function dispatch(state) {
    var index = state[0];
    var observer = state[1];
    var result = observer.next(++index);
    if(!result.done) {
        state[0] = index;
        this.reschedule(state);
    }
}

module.exports = function interval(period, scheduler) {
    return new IntervalObservable(
        is_numeric(period) && (period > 0 || period * -1) || 1,
        scheduler || Scheduler
    );
};