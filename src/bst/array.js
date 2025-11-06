import { HashMap } from "../hash/hashmap.js";
import {mergeSort} from "../recursion/mergeSort.js"

// Function to remove any duplicate values assuming an array of numbers
// HashMap used to instantly search for a number as it will act as the key of the
// hashmap O(1) and worst case scenario is O(N) the same as searching the original
// array for the number.
const uniqueArr = (arr) => {
    const hashMap = new HashMap();
    return arr.filter((num) => {
        if(hashMap.has(num))
        {
            return false;
        }
        hashMap.set(num, true);
        return true;
    });
}

// Function will make array unique and sorted. Array will be ready to be
// turned into a balanced binary search tree

export const arrToBST = (arr) => {
    return mergeSort(uniqueArr(arr));
}
