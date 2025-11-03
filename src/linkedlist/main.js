import { LinkedList } from "./linkedList.js";

// Main Test for .append() + .preappend();
const list = new LinkedList();
list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");
list.prepend("cricket");
list.prepend("monkey");
console.log(list.toString());

// Test for contains()
console.log(list.contains("snake"));
console.log(list.contains("turtle"))
console.log(list.contains("border"));

// Test for find()
console.log(list.find("snake"));
console.log(list.find("monkey"));
console.log(list.find("border"));

// Test for insertAt(), size
console.log(list.size);
list.insertAt("lion", 7);
list.insertAt("octopus", 0);
console.log(list.toString());

// Test for pop(), removeAt(), size
console.log(list.size);
list.removeAt(9);
console.log(list.toString());