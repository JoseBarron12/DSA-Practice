export class BSTNode {
    constructor(root, left, right)
    {
        this._root = root;
        this._left = left;
        this._right = right;
    }
    
    get root() {
        return this._root;
    }
    
    set root(newRoot) {
        this._root = newRoot;
    }

    get left() {
        return this._left;
    }

    set left(newChild)
    {
        this._left = newChild;
    }

    get right() {
        return this._right;
    }

    set right(newChild)
    {
        this._right = newChild;
    }

}
