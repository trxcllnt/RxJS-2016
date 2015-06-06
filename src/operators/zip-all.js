var try_catch = require("rx-3/support/try-catch");
var error_obj = require("rx-3/support/error-object");
var every = require("rx-3/support/array-every");
var Observer = require("rx-3/Observer");
var Subscription = require("rx-3/Subscription");
var SerialSubscription = require("rx-3/SerialSubscription");
var CompositeSubscription = require("rx-3/CompositeSubscription");

function getObserver(destination) {
    return new ZipAllObserver(destination, this.project);
};

function ZipAllObserver(destination, project) {
    this.limit = Number.POSITIVE_INFINITY;
    this.finished = 0;
    this.project = project;
    this.observables = [];
    this.unsubscribed = false;
    this.result = { done: false };
    this.destination = destination;
    this.subscriptions = new CompositeSubscription();
}

ZipAllObserver.prototype = Object.create(Observer.prototype);


ZipAllObserver.prototype._next = function _zipAllNext(observable) {
    this.observables.push(observable);
};

ZipAllObserver.prototype._return = function _zipAllReturn() {

    var buckets = [];
    var project = this.project;
    var destination = this.destination;
    var observables = this.observables;
    var subscriptions = this.subscriptions;
    var args = [];
    var index = -1;
    var total = observables.length;

    while (++index < total) {
        var innerSubscription = new SerialSubscription();
        subscriptions.add(innerSubscription);
        innerSubscription.add(observables[index].subscribe(new ZipAllInnerObserver(this, project, buckets, index, total, innerSubscription)));
    }

    observables.length = 0;
    this.observables = null;
};

ZipAllObserver.prototype._zipAllInnerReturn = function _zipAllInnerReturn(child, innerSubscription) {
    var subscriptions = this.subscriptions;
    this.limit = child.count;
    subscriptions.remove(innerSubscription);
    if (subscriptions.length === 0) {
        return this.destination["return"]();
    }
};

function ZipAllInnerObserver(parent, project, buckets, index, total, subscription) {
    this.parent = parent;
    this.project = project;
    this.buckets = buckets;
    this.index = index;
    this.total = total;
    this.count = 0;
    this.length = 0;
    this.unsubscribed = false;
    this.result = { done: false };
    this.subscription = subscription;
    this.destination = parent.destination;
}

ZipAllInnerObserver.prototype = Object.create(Observer.prototype);

ZipAllInnerObserver.prototype._next = function _zipInnerNext(value) {

    var limit = this.parent.limit;
    var index = this.index;
    var total = this.total;
    var count = this.count++;
    var result = this.result;

    if (count > limit) {
        result = this["return"]();
    } else {

        var buckets = this.buckets;
        var bucket = buckets[count] || (buckets[count] = []);
        bucket[index] = [value];

        if (bucket.length === total && every(bucket, hasValue)) {
            var project = this.project;
            if (typeof project === "function") {
                result = try_catch(this.project).apply(null, bucket.map(unboxValue));
                if(result === error_obj) {
                    return this.destination["throw"](error_obj.e);
                } else {
                    result = this.destination.next(result);
                }
            } else {
                result = this.destination.next(bucket.map(unboxValue));
            }
            bucket.length = 0;
            buckets[count] = undefined;
        }
    }

    return result;
};


ZipAllInnerObserver.prototype._return = function _zipInnerReturn() {
    return this.parent._zipAllInnerReturn(this, this.subscription);
};

function hasValue(xs) {
    return xs && xs.length > 0;
}

function unboxValue(xs) {
    return xs[0];
}

module.exports = function zipAll(project) {
    return new this.constructor(this, { project: project, getObserver: getObserver });
};