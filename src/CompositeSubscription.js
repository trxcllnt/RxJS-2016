var Subscription = require("rx-3/Subscription");
var array_slice = require("rx-3/support/array-slice");
var flatten_args = require("rx-3/support/arguments-flatten");

function CompositeSubscription() {
    this.length = 0;
    this.unsubscribed = false;
    this.add.apply(this, arguments);
}

CompositeSubscription.prototype = Object.create(Subscription.prototype);

CompositeSubscription.prototype.unsubscribe = function unsubscribe() {

    if(this.unsubscribed) { return; }

    this.unsubscribed = true;

    var subscriptions = array_slice(this._subscriptions);
    var subscriptionCount = subscriptions && subscriptions.length || 0;
    var subscriptionIndex = -1;

    this._subscriptions = undefined;

    while(++subscriptionIndex < subscriptionCount) {
        subscriptions[subscriptionIndex].unsubscribe();
    }

    var unsubscribe = this._unsubscribe;
    if(unsubscribe) {
        this._unsubscribe = undefined;
        unsubscribe.call(this);
    }
};

CompositeSubscription.prototype.add = function add() {
    var unsubscribed = this.unsubscribed;
    var subscriptions = this._subscriptions || (this._subscriptions = []);
    var additions = flatten_args(arguments);
    var index = -1;
    var count = additions.length;
    while (++index < count) {
        var subscription = additions[index];
        if (!Boolean(subscription)) {
            continue;
        }
        switch (typeof subscription) {
        case "function":
            subscription = new Subscription(subscription);
        case "object":
            if (subscription && !subscription.unsubscribed) {
                if (unsubscribed) {
                    subscription.unsubscribe();
                } else {
                    subscriptions.push(subscription);
                }
            }
            break;
        }
    }
    this.length = subscriptions.length;
    return this;
};

CompositeSubscription.prototype.remove = function remove() {
    var unsubscribed = this.unsubscribed;
    var subscriptions = this._subscriptions;
    var subscriptionCount = subscriptions && subscriptions.length;
    if (!unsubscribed && subscriptionCount) {
        var subtractions = flatten_args(arguments);
        var index = -1;
        var count = subtractions.length;
        while (++index < count) {
            var subscription = subtractions[index];
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (~subscriptionIndex) {
                subscriptions.splice(subscriptionIndex, 1);
                if (--subscriptionCount === 0) {
                    break;
                }
            }
        }
        this.length = subscriptionCount;
    }
    return this;
};

module.exports = CompositeSubscription;