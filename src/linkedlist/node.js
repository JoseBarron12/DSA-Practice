export class Node {
    constructor(value, next)
    {
        this._value = value;
        this._nextNode = next;
    }

    get value() {
        return this._value
    }
    
    set value(newValue) {
        this._value = newValue;
    }

    get next() {
        return this._nextNode;
    }
    
    set next(newNext) {
        this._nextNode = newNext;
    }
}