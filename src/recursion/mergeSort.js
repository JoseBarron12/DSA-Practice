const mergeSort = (arr) => {
    
    if(arr.length <= 1) // Cannot be divided further
    {
        return arr;
    }
    else
    {
        // Ensures array is split properly whether length is odd or even
        // IF UNEVEN, left array will always be smaller than right array due to floor 
        const divideIndex = (arr.length % 2 !== 0) ? Math.floor(arr.length / 2) : arr.length / 2;
        
        const arrLeft = arr.slice(0, divideIndex);
        const arrRight = arr.slice(divideIndex, arr.length);

        // Sort left half of array
        const sortedLeft = mergeSort(arrLeft);
        
        // Sort right half of array
        const sortedRight = mergeSort(arrRight);
        
        // Merge two sorted halves into one array
        const mergedArray = [];
        
        // Length of biggest array to ensure no out of bound access
        let maxLength = (arrLeft.length >= arrRight.length ) ? arrLeft.length : arrRight.length;
        
        // Compares each sorted half until one is empty
        while(maxLength !== 0)
        {
            if(sortedLeft.length == 0) // Left half becomes empty before right
            {
                // Move all contents of right to merged array since right half is sorted
                mergedArray.push(...sortedRight.slice(0,sortedRight.length));
                break;
            }   
            else if(sortedRight.length == 0) // Right half becomes empty before left
            {
                // Move all contents of left to merged array since left half is sorted
                mergedArray.push(...sortedLeft.slice(0,sortedLeft.length));
                break;
            }
            
            // Compare first element of both
            // Add smaller element to merged array
            // Delete element from its sorted half.
            if(sortedLeft[0] <= sortedRight[0]) 
            {
                mergedArray.push(sortedLeft[0]);
                sortedLeft.splice(0,1);
            }
            else
            {
                mergedArray.push(sortedRight[0]);
                sortedRight.splice(0,1);
            }
            
            // Recalculate biggest length between sorted left and sorted right to avoid
            // out of bound access error.
            maxLength = (sortedLeft.length >= sortedRight.length ) ? sortedLeft.length : sortedRight.length;
        }
        return mergedArray;     

    }
}

console.log(mergeSort([]));
console.log(mergeSort([73]));
console.log(mergeSort([1, 2, 3, 4, 5]));
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
console.log(mergeSort([105, 79, 100, 110]));
