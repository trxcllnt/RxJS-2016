var select = require("rx-3/operators/select");
var concatAll = require("rx-3/operators/merge-all");

module.exports = function concatMany(project) {
    return concatAll.call(select.call(this, project));
};