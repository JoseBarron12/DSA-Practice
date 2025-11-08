import { BST } from "./tree.js";

const randomArr = (length, maxNum) => {
    let arr = [];
    for(let i = 0; i < length; i++)
    {
        arr.push(Math.floor(Math.random() * maxNum));
    }
    return arr;
}
const arr = randomArr(10,100);

const bsTree = new BST(arr);

bsTree.print();

console.log("Balanced: " + bsTree.isBalanced()); // BALANCED CHECK

let traversalText = "";
bsTree.levelOrderForEach((node) => {
    traversalText += node.root + ",";
});
console.log("Level Order Traversal: " + traversalText.slice(0,traversalText.length - 1));

traversalText = "";
bsTree.inOrderForEach((node) => {
    traversalText += node.root + ",";
});
console.log("Inorder Traversal: " + traversalText.slice(0,traversalText.length - 1));

traversalText = "";
bsTree.preOrderForEach((node) => {
    traversalText += node.root + ",";
});
console.log("Preorder Traversal: " +traversalText.slice(0,traversalText.length - 1));

traversalText = "";
bsTree.postOrderForEach((node) => {
    traversalText += node.root + ",";
});
console.log("Postorder Traversal: " + traversalText.slice(0,traversalText.length - 1));

// Insert new values to forced unbalanced tree
bsTree.insert(111);
bsTree.insert(115);
bsTree.insert(114);
bsTree.insert(120);

console.log("Balanced [AFTER NEW INSERTIONS]: " + bsTree.isBalanced());

bsTree.rebalance();
console.log("\nNEW BALANCED TREE:");
bsTree.print();

traversalText = "";
bsTree.levelOrderForEach((node) => {
    traversalText += node.root + ",";
});
console.log("Level Order Traversal: " + traversalText.slice(0,traversalText.length - 1));

traversalText = "";
bsTree.inOrderForEach((node) => {
    traversalText += node.root + ",";
});
console.log("Inorder Traversal: " + traversalText.slice(0,traversalText.length - 1));

traversalText = "";
bsTree.preOrderForEach((node) => {
    traversalText += node.root + ",";
});
console.log("Preorder Traversal: " +traversalText.slice(0,traversalText.length - 1));

traversalText = "";
bsTree.postOrderForEach((node) => {
    traversalText += node.root + ",";
});
console.log("Postorder Traversal: " + traversalText.slice(0,traversalText.length - 1));

