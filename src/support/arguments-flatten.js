var is_array = Array.isArray;
var concat_map = require("rx-3/support/array-concat-map");

module.exports = function arguments_flatten(args, from, to) {
    from || (from = 0);
    to   || (to   = args.length);
    if(to < 0) {
        to = args.length + (to % args.length)
    }
    var idx = from - 1;
    var arr = new Array(to - from);
    while(++idx < to) {
        arr[idx - from] = args[idx];
    }
    return concat_map(arr, flatten_arg);
};

function flatten_arg(arg) {
    return is_array(arg) && concat_map(arg, flatten_arg) || [arg];
}