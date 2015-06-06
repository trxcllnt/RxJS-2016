var Subscription = require("rx-3/Subscription");

function SerialSubscription(subscription) {
    this.length = 0;
    this.unsubscribed = false;
    this.subscription = subscription;
}

SerialSubscription.prototype = Object.create(Subscription.prototype);

SerialSubscription.prototype.unsubscribe = function unsubscribe() {
    if(this.unsubscribed) { return; }
    this.unsubscribed = true;
    var subscription = this.subscription;
    if(subscription) {
        this.subscription = undefined;
        subscription.unsubscribe();
    }
};

SerialSubscription.prototype.add = function add(subscription) {
    if(subscription) {
        if(this.unsubscribed) {
            subscription.unsubscribe();
        } else {
            var currentSubscription = this.subscription;
            this.subscription = subscription;
            if(currentSubscription) {
                currentSubscription.unsubscribe();
            }
        }
    }
    return this;
};

SerialSubscription.prototype.remove = function remove(subscription) {
    if(this.subscription === subscription) {
        this.subscription = undefined;
    }
    return this;
};

module.exports = SerialSubscription;