var Observable = require("rx-3/Observable");

function DeferObservable(factory) {
    this.factory = factory;
}

DeferObservable.prototype = Object.create(Observable.prototype);
DeferObservable.prototype.constructor = Observable;

DeferObservable.prototype._subscribe = function _subscribe(subscriber) {
    return this.factory().subscribe(subscriber);
}

module.exports = function defer(observableFactory) {
    return new DeferObservable(observableFactory);
};