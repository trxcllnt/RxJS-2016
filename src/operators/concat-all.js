var mergeAll = require("rx-3/operators/merge-all");

module.exports = function concatAll() {
    return mergeAll.call(this, 1);
};