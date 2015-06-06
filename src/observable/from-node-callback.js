var try_catch = require("rx-3/support/try-catch");
var error_obj = require("rx-3/support/error-object");
var Observable = require("rx-3/Observable");

function NodeObservable(func, context, selector, args) {
    this.func = func;
    this.context = context;
    this.selector = selector;
    this.args = args;
}

NodeObservable.prototype = Object.create(Observable.prototype);
NodeObservable.prototype.constructor = Observable;

NodeObservable.prototype._subscribe = function (observer) {

    var args = this.args.concat(handler);
    var context = this.context;
    var selector = this.selector;

    this.func.apply(context, args);

    function handler(err) {

        if (err) {
            observer["throw"](err);
            return;
        }

        var result = [];
        var argsIndex = -1;
        var argsCount = arguments.length;

        while (++argsIndex < argsCount) {
            result[argsIndex - 1] = arguments[argsIndex];
        }

        if (selector) {
            result = try_catch(selector).apply(context, result);
            if(result === error_obj) {
                observer["throw"](error_obj.e);
                return;
            } else {
                observer.next(result);
            }
        } else {
            result = observer.next(result);
        }

        if (result.done) {
            return;
        }

        observer["return"]();
    }
};


module.exports = function fromNodeCallback(func, context, selector) {
    return function getNodeObservable() {

        var len = arguments.length;
        var args = new Array(len);

        for (var i = 0; i < len; i++) {
            args[i] = arguments[i];
        }

        return new NodeObservable(func, context, selector, args);
    };
};