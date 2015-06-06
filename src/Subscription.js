function Subscription(unsubscribe) {
    this.length = 0;
    this.unsubscribed = false;
    this._unsubscribe = unsubscribe;
}

Subscription.empty = new Subscription();

Subscription.prototype.unsubscribe = function unsubscribe() {

    if(this.unsubscribed) { return; }

    this.unsubscribed = true;

    var unsubscribe = this._unsubscribe;
    if(unsubscribe) {
        this._unsubscribe = undefined;
        unsubscribe.call(this);
    }
};

Subscription.prototype.add = function add() { return this; };
Subscription.prototype.remove = function remove() { return this; };

module.exports = Subscription;