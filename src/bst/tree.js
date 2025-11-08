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


const levelOrder= (node,func, queue = [] ) => {
    if(node == null) // Base Case: Leaf node
    {
        return;
    }

    if(queue.length == 0) // Ensures always a node on queue [Root of tree will appear]
    {
        queue.push(node);
    }

    func(queue.shift()); // Call function on node, then dequeue node

    if(node.left != null) queue.push(node.left); // Enqueue left children if it exists
    if(node.right != null) queue.push(node.right); // Enqueue right children if it exists
    
    levelOrder(node.left, func, queue); // Visit left side children 
    levelOrder(node.right, func, queue); // Visit right side children 

    return queue;
}


const levelOrderIteration = (node,func, queue = [] ) => {
    
    queue.push(node); // Ensures level 0 is taken to account
    
    while(queue.length > 0) // Stops running once queue is empty or after level order traversal
    {
        let tempNode = queue.shift(); // Dequeue first node
        func(tempNode); // Call function on node
        if(tempNode.left != null) queue.push(tempNode.left); // Enqueue left children if it exists
        if(tempNode.right != null) queue.push(tempNode.right); // Enqueue right children if it exists
    }
}

const inOrder = (node, func) => {
    if(node == null) // Base Case: Leaf node
    {
        return;
    }

    inOrder(node.left, func);
    func(node);
    inOrder(node.right, func);
}

const preOrder = (node, func) => {
    if(node == null) // Base Case: Leaf node
    {
        return;
    }
    
    func(node);
    preOrder(node.left, func);
    preOrder(node.right, func);
}

const postOrder = (node, func) => {
    if(node == null) // Base Case: Leaf node
    {
        return;
    }
    
    postOrder(node.left, func);
    postOrder(node.right, func);
    func(node);
}

const findLongestPath = (node, height = 0) => {
    if(node == null)
    {
        return height;
    }

    let leftHeight, rightHeight = height;

    if(node.left != null) leftHeight = findLongestPath(node.left, height + 1);
    if(node.right != null)  rightHeight = findLongestPath(node.right, height + 1);
    
    return (leftHeight > rightHeight) ? leftHeight : rightHeight;
}


export class BST {
    constructor(arr)
    {
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

    insert(value, node = this.root)
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

    delete(value, node = this.root)
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

    find(value, node = this.root)
    {
        if(node == null)
        {
            return null;
        }
        else if(node.root == value)
        {
            return node;
        }

        if(value < node.root) 
        {
           return this.find(value, node.left)
        }
        else 
        {
            return this.find(value, node.right);
        }
    }

    levelOrderForEach(callback)
    {
        if(typeof callback != "function")
        {
            throw new Error("Callback function required");
        }
        
        levelOrderIteration(this.root, callback);
    }

    inOrderForEach(callback)
    {
        if(typeof callback != "function")
        {
            throw new Error("Callback function required");
        }
        
        inOrder(this.root, callback);
    }

    preOrderForEach(callback)
    {
        if(typeof callback != "function")
        {
            throw new Error("Callback function required");
        }
        
        preOrder(this.root, callback);
    }

    postOrderForEach(callback)
    {
        if(typeof callback != "function")
        {
            throw new Error("Callback function required");
        }
        
        postOrder(this.root, callback);
    }

    height(value)
    {
        const node = this.find(value);
        return (node != null) ? findLongestPath(node) : null;
    }

    heightOfNode(node)
    {
        return (node != null) ? findLongestPath(node) : null;
    }

    depth(value, node = this.root, depth = 0)
    {
        if(node == null)
        {
            return null;
        }
        else if(node.root == value)
        {
            return depth;
        }

        if(value < node.root) 
        {
           return this.depth(value, node.left, depth + 1)
        }
        else 
        {
            return this.depth(value, node.right, depth + 1);
        }
    }

    isBalanced()
    {
        let balanced = true
        this.preOrderForEach((node) => {
            
            let leftHeight = 0;
            let rightHeight = 0;
            
            if(node.left != null)
            {
                leftHeight = this.heightOfNode(node.left) + 1; // Take to account edge from parent
            }
            
            if(node.right != null)
            {
                rightHeight = this.heightOfNode(node.right) + 1; // Take to account edge from parent
            }

            if(Math.abs(leftHeight - rightHeight) > 1) 
            {
                balanced = false;
            }
        })
        return balanced;
    }

    rebalance() {
        let currentValues = []
        this.preOrderForEach((node) => {
            currentValues.push(node.root);
        });

        this.root = this.buildTree(arrToBST(currentValues));
    }

}
