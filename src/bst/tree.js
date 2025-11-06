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

    insert(value, node)
    {
        if(node == null)
        {
            return new BSTNode(value, null, null)
        }

        if(value < node.root) 
        {
           node.left = this.insert(value, node.left)
        }
        else 
        {
            node.right = this.insert(value, node.right);
        }
        return node;
    }

    delete(value, node)
    {
        if(node.root == value)
        {
            if(node.left == null && node.right == null) // CASE 1: Desired Node Has No Children
            {
                return null;
            }
            else if(node.left != null && node.right != null) // CASE 2: DESIRED Node Has Two Children
            {
                let temp = node.right; // Search right subtree
                
                while(temp.left != null) // Find smallest value on right subtree (inorder successor)
                {
                    temp = temp.left;
                }
                
                // Replace desired Value w/ its inorder successor
                const toDeleteValue = node.root;
                node.root = temp.root; 
                temp.root = toDeleteValue;

                node.right = this.delete(temp.root, node.right); // Traverse right tree again and delete replace node
                return node;

            }
            // CASE 3: Desired Node has only One Child
            else if(node.left != null) // CASE 3.1: Desired Node has only left Child
            {
                return node.left;
            }
            else // CASE 3.2: Desired Node has only Right Child
            {
                return node.right;
            }

        }

        if(value < node.root) 
        {
           node.left = this.delete(value, node.left)
        }
        else 
        {
            node.right = this.delete(value, node.right);
        }
        return node;
    }

}

//const BSTree = new BST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
//BSTree.print();

//const BSTree2 = new BST([10,20,30]);
//BSTree2.print();

const BSTree3= new BST([1, 5, 9, 14, 23, 27]);
BSTree3.print();

BSTree3.insert(10, BSTree3.root);
BSTree3.print();

BSTree3.insert(28, BSTree3.root);
BSTree3.print();

BSTree3.delete(28, BSTree3.root); // DELETE NODE W/O CHILDREN [LEAF NODE]
BSTree3.print();

BSTree3.delete(14, BSTree3.root); // DELETE NODE W/ ONE CHILD 
BSTree3.print();

BSTree3.delete(9, BSTree3.root); // DELETE NODE W/ TWO CHILDREN
BSTree3.print();

