var try_catch = require("rx-3/support/try-catch");
var error_obj = require("rx-3/support/error-object");
var every = require("rx-3/support/array-every");
var Observer = require("rx-3/Observer");
var Subscription = require("rx-3/Subscription");
var SerialSubscription = require("rx-3/SerialSubscription");
var CompositeSubscription = require("rx-3/CompositeSubscription");

function getObserver(destination) {
    return new CombineAllObserver(destination, this.project);
};

function CombineAllObserver(destination, project) {
    this.active = false;
    this.observables = [];
    this.project = project;
    this.unsubscribed = false;
    this.result = { done: false };
    this.destination = destination;
    this.subscriptions = new CompositeSubscription();
}

CombineAllObserver.prototype = Object.create(Observer.prototype);

CombineAllObserver.prototype._next = function _combineAllNext(observable) {
    this.observables.push(observable);
};

CombineAllObserver.prototype._return = function _combineAllReturn() {

    var result = this.result;
    var bucket = [];
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
        innerSubscription.add(observables[index].subscribe(new CombineAllInnerObserver(this, project, bucket, index, total, innerSubscription)));
    }

    observables.length = 0;
    this.observables = null;
};

CombineAllObserver.prototype._combineAllInnerReturn = function _combineAllInnerReturn(innerSubscription) {
    var subscriptions = this.subscriptions;
    subscriptions.remove(innerSubscription);
    if (subscriptions.length === 0) {
        return this.destination["return"]();
    }
};

function CombineAllInnerObserver(parent, project, bucket, index, total, subscription) {
    this.parent = parent;
    this.project = project;
    this.bucket = bucket;
    this.index = index;
    this.total = total;
    this.unsubscribed = false;
    this.result = { done: false };
    this.subscription = subscription;
    this.destination = parent.destination;
}

CombineAllInnerObserver.prototype = Object.create(Observer.prototype);

CombineAllInnerObserver.prototype._next = function _combineInnerNext(value) {

    var parent = this.parent;
    var active = parent.active;
    var index = this.index;
    var total = this.total;
    var result = this.result;
    var bucket = this.bucket;

    (bucket[index] || (bucket[index] = []))[0] = value;

    if (active || (parent.active = bucket.length === total && every(bucket, hasValue))) {
        var project = this.project;
        if (typeof project === "function") {
            result = try_catch(this.project).apply(null, bucket.map(unboxValue));
            if(result === error_obj) {
                result = this.destination["throw"](error_obj.e);
            } else {
                result = this.destination.next(result);
            }
        } else {
            result = this.destination.next(bucket.map(unboxValue));
        }
    }

    return result;
};

CombineAllInnerObserver.prototype._return = function _combineInnerReturn() {
    return this.parent._combineAllInnerReturn(this.subscription);
};

function hasValue(xs) {
    return xs && xs.length > 0;
}

function unboxValue(xs) {
    return xs[0];
}

module.exports = function combineAll(project) {
    return new this.constructor(this, { project: project, getObserver: getObserver } );
};