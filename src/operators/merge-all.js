var Observer = require("rx-3/Observer");
var LinkedStack = require("rx-3/support/LinkedStack");
var Subscription = require("rx-3/Subscription");
var SerialSubscription = require("rx-3/SerialSubscription");
var CompositeSubscription = require("rx-3/CompositeSubscription");

function getObserver(destination) {
    return new MergeAllObserver(destination, this.concurrent);
};

function MergeAllObserver(destination, concurrent) {
    if (typeof concurrent != 'number' || concurrent !== concurrent || concurrent < 1) {
        this.concurrent = Number.POSITIVE_INFINITY;
    } else {
        this.buffer = [] || new LinkedStack(true);
        this.concurrent = concurrent;
    }
    this.stopped = false;
    this.result = { done: false };
    this.destination = destination;
    this.unsubscribed = false;
    this.subscriptions = new CompositeSubscription();
}

MergeAllObserver.prototype = Object.create(Observer.prototype);

MergeAllObserver.prototype._next = function _mergeAllNext(observable) {

    var buffer = this.buffer;
    var concurrent = this.concurrent;
    var subscriptions = this.subscriptions;

    if (subscriptions.length < concurrent) {
        var innerSubscription = new SerialSubscription();
        subscriptions.add(innerSubscription);
        innerSubscription.add(observable.subscribe(new MergeInnerObserver(this, innerSubscription)));
    } else if (buffer) {
        buffer.push(observable);
    }
};

MergeAllObserver.prototype._return = function _mergeAllReturn() {

    var buffer = this.buffer;
    var subscriptions = this.subscriptions;

    this.stopped = true;

    if (subscriptions.length === 0 && (!buffer || buffer.length === 0)) {
        return this.destination["return"]();
    }
};

MergeAllObserver.prototype._mergeAllInnerReturn = function _mergeAllInnerReturn(innerSubscription) {

    var buffer = this.buffer;
    var subscriptions = this.subscriptions;
    var length = subscriptions.length - 1;

    subscriptions.remove(innerSubscription);

    if(length < this.concurrent) {
        if (buffer && buffer.length > 0) {
            this.next(buffer.shift());
        } else if (length === 0 && this.stopped) {
            return this.destination["return"]();
        }
    }
};

function MergeInnerObserver(parent, subscription) {
    this.parent = parent;
    this.result = { done: false };
    this.unsubscribed = false;
    this.subscription = subscription;
    this.destination = parent.destination;
}

MergeInnerObserver.prototype = Object.create(Observer.prototype);

MergeInnerObserver.prototype._return = function _mergeInnerReturn() {
    return this.parent._mergeAllInnerReturn(this.subscription);
};

module.exports = function mergeAll(concurrent) {
    return new this.constructor(this, { concurrent: concurrent, getObserver: getObserver });
};