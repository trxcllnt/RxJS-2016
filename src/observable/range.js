var Observable = require("rx-3/Observable");

function RangeObservable(start, end, scheduler) {
    this.end = end;
    this.start = start;
    this.scheduler = scheduler;
}

RangeObservable.prototype = Object.create(Observable.prototype);
RangeObservable.prototype.constructor = Observable;

RangeObservable.prototype._subscribe = function _subscribe(observer) {

    var end = this.end;
    var start = this.start - 1;
    var scheduler = this.scheduler;

    if (scheduler) {
        return scheduler.schedule([{ done: false }, observer, start, end], dispatch);
    }

    while (++start < end) {
        var result = observer.next(start);
        if (result.done) {
            return;
        }
    }
    observer["return"]();
};

function dispatch(state) {
    var result = state[0];
    var observer = state[1];
    var end = state[3];
    var start = state[2];
    if (++start < end) {
        result = observer.next(start);
        if (!result.done) {
            state[0] = result;
            state[2] = start;
            this.reschedule(state);
        }
    } else if (!result.done) {
        observer["return"]();
    }
}

module.exports = function range(start, end, scheduler) {
    return new RangeObservable(
        Math.min(start || (start = 0), end || (end = 0)),
        Math.max(start, end),
        scheduler
    );
};