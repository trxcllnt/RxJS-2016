var Rx = require("rx");
var Observable = Rx.Observable;
var Benchmark = require("benchmark");
var suite = new Benchmark.Suite;

Observable.from([
        require("perf/observable/from-array"),
        require("perf/observable/from-with-array"),
        require("perf/observable/from-with-string"),
        require("perf/observable/of"),
        require("perf/observable/range"),

        require("perf/operators/combine-latest"),
        require("perf/operators/concat-many"),
        require("perf/operators/filter"),
        require("perf/operators/merge"),
        require("perf/operators/reduce"),
        require("perf/operators/select-many"),
        require("perf/operators/select-many-observable"),
        require("perf/operators/select"),
        require("perf/operators/scan"),
        require("perf/operators/to-array"),
        require("perf/operators/zip"),
    ])
    .concatMap(function (test) {
        var tests = test(new Benchmark.Suite());
        return Observable.defer(function () {

            var cycles = new Rx.ReplaySubject();
            var complete = new Rx.ReplaySubject();

            tests.on("cycle", function (e) {
                cycles.onNext(String(e.target));
            }).on("complete", function () {
                complete.onNext("Fastest is '" + this.filter("fastest").pluck("name") + "'\n");
            }).run({
                "async": true
            });

            return cycles.merge(complete).take(tests.length + 1);
        });
    })
    .subscribe(console.log.bind(console));

/*
var Rx = require("rx");
var Observable = Rx.Observable;
var Benchmark = require("benchmark");
var suite = new Benchmark.Suite;

Observable.from([
        require("perf/observable/from-array"),
        require("perf/observable/from-with-array"),
        require("perf/observable/from-with-string"),
        require("perf/observable/of"),
        require("perf/observable/range"),

        require("perf/operators/combine-latest"),
        require("perf/operators/concat-many"),
        require("perf/operators/filter"),
        require("perf/operators/merge"),
        require("perf/operators/reduce"),
        require("perf/operators/select-many"),
        require("perf/operators/select-many-observable"),
        require("perf/operators/select"),
        require("perf/operators/scan"),
        require("perf/operators/to-array"),
        require("perf/operators/zip"),
    ])
    .concatMap(function (test) {
        var tests = test(new Benchmark.Suite());
        return Observable.defer(function () {

            var cycles = Observable.fromEvent(tests, "cycle", function(e) {
                return String(e.target);
            });

            var complete = Observable.fromEvent(tests, "complete", function(e) {
                return "Fastest is '" + this.filter("fastest").pluck("name") + "'\n";
            });

            var results = cycles.merge(complete).take(tests.length + 1).replay();

            return Rx.Observable.using(
                function() {
                    var connection = results.connect();
                    tests.run({ async: true });
                    return connection;
                },
                function() { return results; }
            );
        });
    })
    .subscribe(console.log.bind(console));
*/
