var Observable = require("rx-3/Observable");

function ErrorObservable(scheduler) {
    this.scheduler = scheduler;
}

ErrorObservable.prototype = Object.create(Observable.prototype);
ErrorObservable.prototype.constructor = Observable;

ErrorObservable.prototype._subscribe = function _subscribe(observer) {

    var scheduler = this.scheduler;

    if(scheduler) {
        return scheduler.schedule(observer, dispatch);
    }

    observer["throw"]();
};

function dispatch(observer) {
    observer["throw"]();
}

var staticEmpty = new ErrorObservable();

module.exports = function error(scheduler) {
    return scheduler && new ErrorObservable(scheduler) || staticEmpty;
};
