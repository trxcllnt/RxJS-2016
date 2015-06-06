var Observable = require("rx-3/Observable");

function EmptyObservable(scheduler) {
    this.scheduler = scheduler;
}

EmptyObservable.prototype = Object.create(Observable.prototype);
EmptyObservable.prototype.constructor = Observable;

EmptyObservable.prototype._subscribe = function _subscribe(observer) {

    var scheduler = this.scheduler;

    if(scheduler) {
        return scheduler.schedule(observer, dispatch);
    }

    observer["return"]();
};

function dispatch(observer) {
    observer["return"]();
}

var staticEmpty = new EmptyObservable();

module.exports = function empty(scheduler) {
    return scheduler && new EmptyObservable(scheduler) || staticEmpty;
};
