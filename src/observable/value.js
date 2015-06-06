var Observable = require("rx-3/Observable");

function ValueObservable(value, scheduler) {
    this.value = value;
    this.scheduler = scheduler;
}

ValueObservable.prototype = Object.create(Observable.prototype);
ValueObservable.prototype.constructor = Observable;

ValueObservable.prototype._subscribe = function _subscribe(observer) {

    var value = this.value;
    var scheduler = this.scheduler;

    if(scheduler) {
        return scheduler.schedule(["N", observer, value], dispatch);
    }

    var result = observer.next(value);

    if(result.done) {
        return;
    }

    observer["return"]();
};

function dispatch(state) {
    var phase = state[0];
    var observer = state[1];
    if(phase === "N") {
        var result = observer.next(state[2]);
        if(!result.done) {
            state[0] = "C";
            this.reschedule(state);
        }
    } else {
        observer["return"]();
    }
}

module.exports = function value(value, scheduler) {
    return new ValueObservable(value, scheduler);
};
