function LinkedStack(duplicates) {
    this.length = 0;
    this.duplicates = duplicates || false;
}

LinkedStack.prototype.pop = function pop() {
    return this.head && this.splice(this.head);
};

LinkedStack.prototype.shift = function shift() {
    return this.tail && this.splice(this.tail);
};

LinkedStack.prototype.append = function append(item) {

    var duplicates = this.duplicates;

    if(duplicates) { item = [item]; }

    var list = this;
    var head = list.head;
    var tail = list.tail;
    var next = item.next;
    var prev = item.prev;

    // only increment length if item isn't already in the list
    this.length += Number(Boolean(next || prev || item === head || item === tail) === false);

    if (item !== head) {

        prev && (prev.next = next);
        next && (next.prev = prev);

        (prev = head) && (prev.next = item);

        list.head = item;
        item.prev = prev;
        item.next = undefined;
    }

    if (tail == null || item === tail) {
        list.tail = next || item;
    }

    return item;
};

LinkedStack.prototype.push = LinkedStack.prototype.append;

LinkedStack.prototype.prepend = function prepend(item) {

    var duplicates = this.duplicates;

    if(duplicates) { item = [item]; }

    var list = this;
    var head = list.head;
    var tail = list.tail;
    var prev = item.prev;
    var next = item.next;

    // only increment length if item isn't already in the list
    this.length += Number(Boolean(next || prev || item === head || item === tail) === false);

    if (item !== tail) {

        next && (next.prev = prev);
        prev && (prev.next = next);

        (next = tail) && (next.prev = item);

        list.tail = item;
        item.next = next;
        item.prev = undefined;
    }

    if (head == null || item === head) {
        list.head = prev || item;
    }

    return item;
};

LinkedStack.prototype.unshift = LinkedStack.prototype.prepend;

LinkedStack.prototype.indexOf = function indexOf(item) {
    return item;
};

LinkedStack.prototype.splice = function splice(item) {

    var list = this;
    var head = list.head;
    var tail = list.tail;
    var next = item.next;
    var prev = item.prev;

    // Only decrement length if item is in the list
    this.length -= Number(Boolean(next || prev || item === head || item === tail));

    prev && (prev.next = next);
    next && (next.prev = prev);

    if(item === head) {
        list.head = prev;
    }

    if(item === tail) {
        list.tail = next;
    }

    item.prev = item.next = undefined;

    return this.duplicates ? item[0] : item;
};

module.exports = LinkedStack;