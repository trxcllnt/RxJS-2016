module.exports = function array_concat_map(arr, project) {
    var arr2 = [];
    var idx  = -1;
    for(var i = -1, n = arr.length; ++i < n;) {
        var item = arr[i];
        var list = project(item, i, arr);
        for(var j = -1, k = list.length; ++j < k;) {
            arr2[++idx] = list[j];
        }
    }
    return arr2;
};