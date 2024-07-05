function solve(firstArray, secArray){
    let arrayOfObjects = [];

    // Making constructor function
    function objectConstructor(name, quantity){
        this.name = name;
        this.quantity = quantity;
    }
    
    // Iterating through the first array to create objects
    for (let index = 0; index < firstArray.length - 1; index++){
        let productName = '';
        let quantity = 0;

        if (index % 2 == 0){
            productName = firstArray[index];
        }
        else{
            quantity = parseInt(firstArray[index]);
            // Making object using constructor
            let objectProduct = new objectConstructor(productName, quantity);
            // Adding the object to the array
            arrayOfObjects.push(objectProduct);
        }
    }
    
    console.log(arrayOfObjects);
}

// Test the function
solve([
    'Chips', '5', 'CocaCola', '9', 'Bananas', '14', 'Pasta', '4', 'Beer', '2'
    ],
    [
    'Flour', '44', 'Oil', '12', 'Pasta', '7', 'Tomatoes', '70', 'Bananas', '30'
    ]);
