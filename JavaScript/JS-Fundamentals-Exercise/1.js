function solve(array, count){
  for (let i = 0; i < count; i++){
    let element = array.shift();
    array.push(element);
  }
  
  let numbers = array.join(' ');
  console.log(numbers)
}

solve([51, 51, 3], 2)