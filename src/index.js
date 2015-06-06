var Observer = require("rx-3/Observer");
var Observable = require("rx-3/Observable");
var Subscription = require("rx-3/Subscription");

// var Subject = require("rx-3/Subject");
// var ReplaySubject = require("rx-3/ReplaySubject");

var Scheduler  = require("rx-3/Scheduler");

var config = {
    useNativeEvents: false // Configuration option to determine whether to use native events only
}; 

Observable.config    = config;
Observable.of        = require("rx-3/observable/of");
Observable.from      = require("rx-3/observable/from");
// Observable.defer     = require("rx-3/observable/defer");
// Observable.value     = require("rx-3/observable/value");
// Observable.return    = require("rx-3/observable/value");
// Observable.error     = require("rx-3/observable/error");
// Observable.throw     = require("rx-3/observable/error");
// Observable.empty     = require("rx-3/observable/empty");
Observable.fromArray = require("rx-3/observable/from-array");
Observable.fromEvent = require("rx-3/observable/from-event");
// Observable.fromNodeCallback = require("rx-3/observable/from-node-callback");
// Observable.interval  = require("rx-3/observable/interval");
// Observable.never     = require("rx-3/observable/never");
Observable.range     = require("rx-3/observable/range");
Observable.combine   = require("rx-3/operators/combine");
Observable.zip       = require("rx-3/operators/zip");

Observable.combineLatest = Observable.combine;
Observable.zipAll = Observable.zip;

Observable.prototype.count        = require("rx-3/operators/count");
Observable.prototype.combine      = require("rx-3/operators/combine");
Observable.prototype.combineAll   = require("rx-3/operators/combine-all");
Observable.prototype.doAction     = require("rx-3/operators/do-action");
Observable.prototype.last         = require("rx-3/operators/last");
// Observable.prototype.let          = require("rx-3/operators/let");
Observable.prototype.where        = require("rx-3/operators/where");
Observable.prototype.scan         = require("rx-3/operators/scan");
Observable.prototype.reduce       = require("rx-3/operators/reduce");
Observable.prototype.take         = require("rx-3/operators/take");
// Observable.prototype.takeUntil    = require("rx-3/operators/take-until");
// Observable.prototype.timeInterval = require("rx-3/operators/time-interval");
Observable.prototype.toArray      = require("rx-3/operators/to-array");
Observable.prototype.concat       = require("rx-3/operators/concat");
Observable.prototype.concatAll    = require("rx-3/operators/concat-all");
Observable.prototype.concatMany   = require("rx-3/operators/concat-many");
Observable.prototype.merge        = require("rx-3/operators/merge");
Observable.prototype.mergeAll     = require("rx-3/operators/merge-all");
Observable.prototype.select       = require("rx-3/operators/select");
Observable.prototype.selectMany   = require("rx-3/operators/select-many");
Observable.prototype.zip          = require("rx-3/operators/zip");
Observable.prototype.zipAll       = require("rx-3/operators/zip-all");

Observable.prototype.combineLatest = Observable.prototype.combine;
Observable.prototype.concatMap     = Observable.prototype.concatMany;
Observable.prototype["do"]         = Observable.prototype.doAction;
Observable.prototype.filter        = Observable.prototype.where;
Observable.prototype.flatMap       = Observable.prototype.selectMany;
Observable.prototype.map           = Observable.prototype.select;
Observable.prototype.tap           = Observable.prototype.doAction;

module.exports = {
    Observer : Observer,
    Scheduler : Scheduler,
    Observable: Observable,
    Subscription: Subscription,
    // Subject: Subject,
    // ReplaySubject: ReplaySubject,
    config: config
};