import { BSTNode } from "./bstNode.js";
import { arrToBST } from "./array.js";

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.root}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};


export class BST {
    constructor(arr)
    {
        console.log(arrToBST(arr));
        this._root = this.buildTree(arrToBST(arr));
    }

    get root() {
        return this._root;
    }

    set root(newRoot) {
        this._root = newRoot;
    }

    buildTree(arr) {
        if(arr.length == 0)
        {
            return null;
        }
        const rootIndex = (arr.length % 2 !== 0) ? Math.floor(arr.length / 2) : arr.length / 2 - 1;
        const rootNode = new BSTNode(arr[rootIndex], null, null)
        
        rootNode.left = this.buildTree(arr.slice(0, rootIndex));
        rootNode.right = this.buildTree(arr.slice( rootIndex + 1, arr.length));
        return rootNode;
    }

    print() {
        prettyPrint(this.root);
    }

}

const BSTree = new BST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
BSTree.print();

const BSTree2 = new BST([10,20,30]);
BSTree2.print();

const BSTree3= new BST([1, 5, 9, 14, 23, 27]);
BSTree3.print();