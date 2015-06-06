var expect = require("chai").expect;
var Scheduler = require("rx-3/Scheduler");
var of = require("rx-3/observable/of");
var merge = require("rx-3/operators/merge");
var mergeAll = require("rx-3/operators/merge-all");

describe("merge", function() {
    it("should merge two observables", function(done) {
        var a = of(1, 2, 3);
        var b = of(4, 5, 6, 7, 8);
        var r = [1, 2, 3, 4, 5, 6, 7, 8];
        var i = 0;
        mergeAll.call(of(a, b)).subscribe(
            function(vals) {
                expect(vals).to.deep.equal(r[i++]);
            }, null,
            function() {
                done();
            });
    });
    it("should merge a source with a second", function(done) {
        var a = of(1, 2, 3);
        var b = of(4, 5, 6, 7, 8);
        var r = [1, 2, 3, 4, 5, 6, 7, 8];
        var i = 0;
        merge.call(a, b).subscribe(
            function(vals) {
                expect(vals).to.deep.equal(r[i++]);
            }, null,
            function() {
                done();
            });
    });
    it("should merge two immediately-scheduled observables", function(done) {
        var a = of(1, 2, 3, Scheduler);
        var b = of(4, 5, 6, 7, 8, Scheduler);
        var r = [1, 4, 2, 5, 3, 6, 7, 8];
        var i = 0;
        mergeAll.call(of(a, b)).subscribe(
            function(vals) {
                expect(vals).to.deep.equal(r[i++]);
            }, null,
            function() {
                done();
            });
    });
    it("should merge an immediately-scheduled source with an immediately-scheduled second", function(done) {
        var a = of(1, 2, 3, Scheduler);
        var b = of(4, 5, 6, 7, 8, Scheduler);
        var r = [1, 4, 2, 5, 3, 6, 7, 8];
        var i = 0;
        merge.call(a, b).subscribe(
            function(vals) {
                expect(vals).to.deep.equal(r[i++]);
            }, null,
            function() {
                done();
            });
    });
});