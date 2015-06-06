var Observable = require("rx-3/Observable");

function ES7Observable(subscribe) {
    Observable.call(this, { subscribe: subscribe });
}

ES7Observable.prototype = Object.create(Observable.prototype);
ES7Observable.prototype.constructor = Observable;

module.exports = ES7Observable;
