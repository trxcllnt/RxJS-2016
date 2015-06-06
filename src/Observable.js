var Observer = require("rx-3/Observer");
var Scheduler = require("rx-3/Scheduler");
var Subscription = require("rx-3/Subscription");
var SerialSubscription = require("rx-3/SerialSubscription");

function Observable(source, observerProvider) {
    this.source = source;
    this.observerProvider = observerProvider || defaultObserverProvider;
}

Observable.create = function (subscribe) {
    return new Observable({ subscribe: subscribe });
};

Observable.prototype.constructor = Observable;

Observable.prototype.subscribe = function subscribe(a, b, c) {
    if(!a || typeof a !== "object") {
        a = new Observer(a, b, c);
    }
    if (!Scheduler.active) {
        var self = this;
        return Scheduler.schedule(function scheduleSubscribe() {
            return self._subscribe(a);
        });
    }
    return this._subscribe(a);
};

Observable.prototype._subscribe = function _subscribe(destination) {
    var subscriptionResult = this.source.subscribe(this.observerProvider.getObserver(destination));
    switch(typeof subscriptionResult) {
        case "function":
            return new Subscription(subscriptionResult);
        case "object": 
            return subscriptionResult || Subscription.empty;
        default:
            return Subscription.empty
    }
};

var defaultObserverProvider = function() {
    
    function DefaultObserverProvider() {
    };

    DefaultObserverProvider.prototype.getObserver = function getDefaultObserver(destination) {
        return new Observer(destination);
    };

    return new DefaultObserverProvider();
}();

module.exports = Observable;