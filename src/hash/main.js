import { HashMap } from "./hashmap.js";

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log("INITIAL HASHMAP:")
console.log(test.entries());
console.log("LENGTH:" + test.length());

console.log("\nSET HASHMAP METHOD:");
test.set('hat', 'blue');
test.set('elephant', 'yellow');
test.set('apple', 'purple');
test.set('lion', 'pink');
console.log(test.entries());
console.log("LENGTH:" + test.length());

console.log("\nGROWTH HASHMAP TEST:");
test.set('moon', 'silver');
console.log(test.entries());
console.log("LENGTH:" + test.length());

console.log("\nGET METHOD:");
console.log(test.get("monkey"));
console.log(test.get("lion"));

console.log("\nHAS METHOD:");
console.log(test.has("grape"));
console.log(test.has("purple"));

console.log("\nREMOVE METHOD:");
console.log(test.remove("pink"));
console.log(test.remove("dog"));

console.log("\nTEST KEY/VALUE METHODS:");
console.log("KEYS:")
console.log(test.keys());
console.log("VALUES:")
console.log(test.values());

console.log("\nCLEAR METHOD:");
test.clear();
console.log("LENGTH:" + test.length());
console.log(test.entries());


