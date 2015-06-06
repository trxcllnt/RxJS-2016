var select = require("rx-3/operators/select");
var mergeAll = require("rx-3/operators/merge-all");

module.exports = function selectMany(project) {
    return mergeAll.call(select.call(this, project));
};