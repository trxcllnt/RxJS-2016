var expect = require("chai").expect;
var Scheduler = require("rx-3/Scheduler");
var of = require("rx-3/observable/of");
var selectMany = require("rx-3/operators/select-many");

describe("select many", function() {
    it("should merge with a selector function", function(done) {
        var a = of(1, 2, 3);
        var b = of(4, 5, 6, 7, 8);
        var r = [4, 5, 6, 7, 8, 4, 5, 6, 7, 8, 4, 5, 6, 7, 8];
        var i = 0;
        selectMany.call(a, function project(x) { return b; }).subscribe(function(x) {
            expect(x).to.deep.equal(r[i++]);
        }, null, done);
    });
    it("should merge with an Observable", function(done) {
        var a = of(1, 2, 3);
        var b = of(4, 5, 6, 7, 8);
        var r = [4, 5, 6, 7, 8, 4, 5, 6, 7, 8, 4, 5, 6, 7, 8];
        var i = 0;
        selectMany.call(a, b).subscribe(function(x) {
            expect(x).to.deep.equal(r[i++]);
        }, null, done);
    });
});