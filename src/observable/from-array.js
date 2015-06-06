var Observable = require("rx-3/Observable");

function FromArrayObservable(array, scheduler) {
    this.array = array;
    this.scheduler = scheduler;
}

FromArrayObservable.prototype = Object.create(Observable.prototype);
FromArrayObservable.prototype.constructor = Observable;

FromArrayObservable.prototype._subscribe = function _subscribe(observer) {

    var array = this.array;
    var scheduler = this.scheduler;

    if (scheduler) {
        return scheduler.schedule([{ done: false }, observer, array, -1], dispatch);
    }

    var index = -1;
    var count = array.length;

    while (++index < count) {
        var result = observer.next(array[index]);
        if (result.done) {
            return;
        }
    }

    observer["return"]();
};

function dispatch(state) {
    var result = state[0];
    var observer = state[1];
    var array = state[2];
    var index = state[3];
    var total = array.length;
    if (++index < total) {
        result = observer.next(array[index]);
        if (!result.done) {
            state[0] = result;
            state[3] = index;
            this.reschedule(state);
        }
    } else if (!result.done) {
        observer["return"]();
    }
}

module.exports = function fromArray(array, scheduler) {
    return new FromArrayObservable(array, scheduler);
};