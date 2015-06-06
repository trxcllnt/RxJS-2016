var is_numeric = require("rx-3/support/is-numeric");
var LinkedStack = require("rx-3/support/LinkedStack");
var Observer = require("rx-3/Observer");
var Immediate = require("rx-3/support/Immediate");
var SerialSubscription = require("rx-3/SerialSubscription");

function Scheduler(async) {
    this.async = async || false;
    this.active = false;
    this.scheduled = false;
    this.actions = [] || new LinkedStack();
}

Scheduler.actions = [] || new LinkedStack();
Scheduler.async = false;
Scheduler.active = false;
Scheduler.scheduled = false;

Scheduler.schedule = Scheduler.prototype.schedule = function schedule(delay, state, work) {

    var argsLen = arguments.length;

    if (argsLen === 2) {
        work = state;
        state = delay;
        delay = 0;
    } else if (argsLen === 1) {
        work = delay;
        state = void 0,
        delay = 0;
    } else if(argsLen === 0) {
        throw new Error("Scheduler.schedule requires an action to schedule.");
    }

    is_numeric(delay) || (delay = 0);

    if (delay <= 0) {
        if (Boolean(this.async)) {
            return scheduleNext(this, state, work);
        } else {
            return scheduleNow(this, state, work);
        }
    } else {
        return scheduleLater(this, state, work, delay);
    }
};

Scheduler.nextTick = new Scheduler(true);

function scheduleNow(scheduler, state, work) {
    return new ScheduledAction(scheduler, state, work);
}

function scheduleNext(scheduler, state, work) {
    return Boolean(scheduler.scheduled) ?
        new ScheduledAction(scheduler, state, work)    :
        new NextScheduledAction(scheduler, state, work);
}

function scheduleLater(scheduler, state, work, delay) {
    return new FutureScheduledAction(scheduler, state, work, delay);
}

function flush(scheduler, actions) {
    if (!Boolean(scheduler.active)) {
        scheduler.active = true;
        var action;
        while(action = actions.shift()) {
            action.execute();
        };
        scheduler.head = void 0;
        scheduler.active = false;
    }
}

function ScheduledAction(scheduler, state, work) {
    this.scheduler = scheduler;
    this.work = work;
    this.unsubscribed = false;
    this.schedule(state);
}

ScheduledAction.prototype = Object.create(SerialSubscription.prototype);

ScheduledAction.prototype.schedule = function scheduleAction(state) {
    var scheduler = this.scheduler;
    var actions = scheduler.actions;
    this.state = state;
    actions.push(this);
    flush(scheduler, actions);
    return this;
};

ScheduledAction.prototype.reschedule = function reschedule(state) {
    return this.schedule(state);
};

ScheduledAction.prototype.execute = function executeScheduledAction() {
    if (this.unsubscribed) {
        throw new Error("How did did we execute a canceled ScheduledAction?");
    }
    this.add(this.work(this.state));
};

ScheduledAction.prototype._unsubscribe = function unsubscribeScheduledAction() {
    var actions = this.scheduler.actions;
    var index = actions.indexOf(this);
    if(index !== -1) {
        actions.splice(index, 1);
    }
    this.work = void 0;
    this.state = void 0;
    this.scheduler = void 0;
};

function NextScheduledAction(scheduler, state, work) {
    ScheduledAction.call(this, scheduler, state, work);
}

NextScheduledAction.prototype = Object.create(ScheduledAction.prototype);

NextScheduledAction.prototype.schedule = function scheduleNextAction(state) {
    var self = this;
    var scheduler = this.scheduler;
    this.state = state;
    scheduler.actions.push(this);
    if (!Boolean(scheduler.scheduled)) {
        scheduler.active = true;
        scheduler.scheduled = true;
        this.id = Immediate.setImmediate(function () {
            self.id = void 0;
            scheduler.active = false;
            scheduler.scheduled = false;
            flush(scheduler, scheduler.actions);
        });
    }
};

NextScheduledAction.prototype._unsubscribe = function unsubscribeNextScheduledAction() {
    unsubscribeScheduledAction.call(this);
    var scheduler = this.scheduler;
    if(scheduler.actions.length === 0) {
        scheduler.active = false;
        scheduler.scheduled = false;
        var id = this.id;
        if(id) {
            this.id = void 0;
            Immediate.clearImmediate(id);
        }
    }
};

function FutureScheduledAction(scheduler, state, work, delay) {
    this.delay = delay;
    ScheduledAction.call(this, scheduler, work, state);
}

FutureScheduledAction.prototype = Object.create(ScheduledAction.prototype);

FutureScheduledAction.prototype.schedule = function scheduleFutureAction(state) {
    var self = this;
    var id = this.id;
    var scheduler = this.scheduler;
    if(id != null) {
        this.id = undefined;
        clearTimeout(id);
    }
    this.state = state;
    this.id = setTimeout(function executeFutureAction() {
        self.id = void 0;
        scheduleAction.call(self, self.state);
    }, this.delay);
};

FutureScheduledAction.prototype._unsubscribe = function unsubscribeFutureScheduledAction() {
    unsubscribeScheduledAction.call(this);
    var id = this.id;
    if(id != null) {
        this.id = void 0;
        clearTimeout(id);
    }
}

module.exports = Scheduler;