function EvenOdd(number){

    let oddSum = 0;
    let evenSum = 0;

    let arrayNums = [];

    for (let i = 0; number > 0; i++){
        let res = number % 10;
        arrayNums[i] = Math.floor(res);
        number = number / 10
    }

    arrayNums = arrayNums.reverse();
    arrayNums.forEach(element => {
        if (element % 2 === 0)
    {
        evenSum += element;
    } else {
        oddSum += element;
    }})

    console.log(`Odd sum = ${oddSum}, Even sum = ${evenSum}`)
}

EvenOdd(1000435)