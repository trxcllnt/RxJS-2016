var is_array = Array.isArray;
module.exports = function array_slice(array, index) {
    if(is_array(array) === false) {
        return array;
    }
    (typeof index === "number") || (index = 0);
    var i = -1;
    var n = Math.max(array.length - index, 0);
    var array2 = new Array(n);
    while(++i < n) { array2[i] = array[i + index]; }
    return array2;
};