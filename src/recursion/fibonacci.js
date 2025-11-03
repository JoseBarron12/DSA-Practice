// N is the num of fibonacci numbers
const fibs = (n) => {
    let arr = [];
    for(let i = 0; i <= n; i++)
    {
        if(i <= 1)
        {
            arr.push(i);
        }
        else
        {     
            arr.push(arr[i - 1] + arr[i - 2]);
        }
    }
    return arr;
}

console.log(fibs(8));

const fibsRec = (n) => {
    if(n <= 1)
    {
        return n;
    }
    else
    {
        return fibsRec(n-1) + fibsRec(n-2);
    }
}

console.log(fibsRec(8));


const fibsRecArr = (n) => {
    console.log("This was printed recursively");
    if(n <= 1) return [0,1];
    else
    {
        const arr = fibsRecArr(n - 1);
        arr.push(arr[n-1] + arr[n - 2]);
        return arr;
    }
}

console.log(fibsRecArr(8));