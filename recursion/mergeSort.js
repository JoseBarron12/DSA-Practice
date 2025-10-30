const mergeSort = (arr) => {
    if(arr.length <= 1)
    {
        return arr;
    }
    else
    {
        const divideIndex = (arr.length % 2 !== 0) ? Math.floor(arr.length / 2) : arr.length / 2;
        
        const arrLeft = arr.slice(0, divideIndex);
        const arrRight = arr.slice(divideIndex, arr.length);

        const sortedLeft = mergeSort(arrLeft);
        const sortedRight = mergeSort(arrRight);
        
        const mergedArray = [];
        
        let maxLength = (arrLeft.length >= arrRight.length ) ? arrLeft.length : arrRight.length;
        
        while(maxLength !== 0)
        {
            if(sortedLeft.length == 0)
            {
                mergedArray.push(...sortedRight.slice(0,sortedRight.length));
                break;
            }   
            else if(sortedRight.length == 0)
            {
                mergedArray.push(...sortedLeft.slice(0,sortedLeft.length));
                break;
            }
            
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
            maxLength = (arrLeft.length >= arrRight.length ) ? arrLeft.length : arrRight.length;
        }
        return mergedArray;     

    }
}

console.log(mergeSort([]));
console.log(mergeSort([73]));
console.log(mergeSort([1, 2, 3, 4, 5]));
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
console.log(mergeSort([105, 79, 100, 110]));
