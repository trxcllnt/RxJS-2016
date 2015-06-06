var Observable = require("rx-3/Observable");
var $iterator$ = require("rx-3/support/iterator");
var maxSafeInteger = Math.pow(2, 53) - 1;

function StringIterable(str) {
    this._s = s;
}

StringIterable.prototype[$iterator$] = function () {
    return new StringIterator(this._s);
};

function StringIterator(str) {
    this._s = s;
    this._l = s.length;
    this._i = 0;
}

StringIterator.prototype[$iterator$] = function () {
    return this;
};

StringIterator.prototype.next = function () {
    return this._i < this._l ? {
        done: false,
        value: this._s.charAt(this._i++)
    } : {
        done: true,
        value: undefined
    };
};

function ArrayIterable(a) {
    this._a = a;
}

ArrayIterable.prototype[$iterator$] = function () {
    return new ArrayIterator(this._a);
};

function ArrayIterator(a) {
    this._a = a;
    this._l = toLength(a);
    this._i = 0;
}

ArrayIterator.prototype[$iterator$] = function () {
    return this;
};

ArrayIterator.prototype.next = function () {
    return this._i < this._l ? {
        done: false,
        value: this._a[this._i++]
    } : {
        done: true,
        value: undefined
    };
};

function numberIsFinite(value) {
    return typeof value === 'number' && root.isFinite(value);
}

function isNan(n) {
    return n !== n;
}

function getIterable(o) {
    var i = o[$iterator$],
        it;
    if (!i && typeof o === 'string') {
        it = new StringIterable(o);
        return it[$iterator$]();
    }
    if (!i && o.length !== undefined) {
        it = new ArrayIterable(o);
        return it[$iterator$]();
    }
    if (!i) {
        throw new TypeError('Object is not iterable');
    }
    return o[$iterator$]();
}

function sign(value) {
    var number = +value;
    if (number === 0) {
        return number;
    }
    if (isNaN(number)) {
        return number;
    }
    return number < 0 ? -1 : 1;
}

function toLength(o) {
    var len = +o.length;
    if (isNaN(len)) {
        return 0;
    }
    if (len === 0 || !numberIsFinite(len)) {
        return len;
    }
    len = sign(len) * Math.floor(Math.abs(len));
    if (len <= 0) {
        return 0;
    }
    if (len > maxSafeInteger) {
        return maxSafeInteger;
    }
    return len;
}

function FromObservable(iterable, project, thisArg, scheduler) {
    this.iterable = iterable;
    this.project = project;
    this.thisArg = thisArg;
    this.scheduler = scheduler
}

FromObservable.prototype = Object.create(Observable.prototype);
FromObservable.prototype.constructor = Observable;

FromObservable.prototype._subscribe = function _subscribe(observer) {

    var iterable = this.iterable,
        project = this.project,
        thisArg = this.thisArg,
        index = -1,
        scheduler = this.scheduler;

    if (scheduler) {
        return scheduler.schedule([{ done: false }, observer, iterable, project, index, thisArg], dispatch);
    }

    while (true) {

        result = iterable.next();

        if (result.done) {
            return observer;
        }

        if (project) {
            result = observer.next(project.call(thisArg, result.value, ++index));
        } else {
            result = observer.next(result.value);
        }

        if (result.done) {
            return observer;
        }
    }
};

function dispatch(state) {

    var observer = state[1],
        iterable = state[2],
        project = state[3],
        index = state[4],
        thisArg = state[5];

    var result = iterable.next();

    if (result.done) {
        observer["return"]();
        return;
    }

    if (project) {
        result = observer.next(project.call(thisArg, result.value, ++index));
    } else {
        result = observer.next(result.value);
    }

    if (result.done) {
        return;
    }

    state[4] = index;
    this.reschedule(state);
}

/**
 * This method creates a new Observable sequence from an array-like or iterable object.
 * @param {Any} arrayLike An array-like or iterable object to convert to an Observable sequence.
 * @param {Function} [mapFn] Map function to call on every element of the array.
 * @param {Any} [thisArg] The context to use calling the mapFn if provided.
 * @param {Scheduler} [scheduler] Optional scheduler to use for scheduling.  If not provided, defaults to Scheduler.currentThread.
 */

module.exports = function from(iterable, project, thisArg, scheduler) {
    if (iterable == null) {
        throw new Error('iterable cannot be null.')
    }
    if (project && typeof project == "function") {
        throw new Error('project when provided must be a function');
    }
    return new FromObservable(getIterable(Object(iterable)), project, thisArg, scheduler);
};