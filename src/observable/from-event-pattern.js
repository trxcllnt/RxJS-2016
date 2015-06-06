var try_catch = require("rx-3/support/try-catch");
var error_obj = require("rx-3/support/error-object");
var Observable = require("rx-3/Observable");

var FromEventPatternObservable = function () {

    function FromEventPatternObservable(add, remove, selector) {
        this.add = add;
        this.remove = remove;
        this.selector = selector;
    }

    FromEventPatternObservable.prototype = Object.create(Observable.prototype);
    FromEventPatternObservable.prototype.constructor = Observable;
    FromEventPatternObservable.prototype._subscribe = function (subscriber) {

        function innerHandler(e) {
            var result = e;
            if (selector) {
                result = try_catch(selector).apply(this, arguments);
                if(result === error_obj) {
                    subscriber["throw"](error_obj.e);
                    unsubscribe();
                    return;
                }
            }
            result = subscriber.next(result);
            if(result.done) {
                unsubscribe();
            }
        }

        var self = this;
        var remove = this.remove;
        var selector = this.selector;
        var token = this.add(innerHandler);

        return function unsubscribe() {
            if (remove) {
                remove(innerHandler, token);
            }
        };
    };

    return FromEventPatternObservable;
}();

/**
 * Creates an observable sequence from an event emitter via an addHandler/removeHandler pair.
 * @param {Function} addHandler The function to add a handler to the emitter.
 * @param {Function} [removeHandler] The optional function to remove a handler from an emitter.
 * @param {Function} [selector] A selector which takes the arguments from the event handler to produce a single item to yield on next.
 * @returns {Observable} An observable sequence which wraps an event from an event emitter
 */
module.exports = function fromEventPattern(addHandler, removeHandler, selector) {
    return new FromEventPatternObservable(addHandler, removeHandler, selector);
};