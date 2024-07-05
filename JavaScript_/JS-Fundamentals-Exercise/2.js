function printN(inputArray, step){
    let newArray = [];
    for(let i = 0; i < inputArray.length; i += step){
        let result = inputArray[i];
        newArray.push(result)
    }
    
     return newArray;
}


printN(['dsa', 'asd', 'test', 'tset'], 2)
printN(['dsa', 'asd', 'test', 'tset'], 2)
