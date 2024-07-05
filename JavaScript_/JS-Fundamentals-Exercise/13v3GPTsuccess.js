function solve(firstArray, secArray){
    // Making an array to store the objects
    let arrayOfObjects = [];

    // Making constructor
    function objectConstructor(name, quantity){
        this.name = name;
        this.quantity = quantity;
    }

    // Loop through the first array
    for (let index = 0; index < firstArray.length; index++) {
        // If the index is even, it's a product name
        if (index % 2 === 0) {
            let productName = firstArray[index];
            let quantity = parseInt(firstArray[index + 1]);
            
            // Check if the product already exists in arrayOfObjects
            let existingProduct = arrayOfObjects.find(obj => obj.name === productName);
            
            // If it exists, update the quantity
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                // Otherwise, create a new object and add it to the array
                let objectProduct = new objectConstructor(productName, quantity);
                arrayOfObjects.push(objectProduct);
            }
        }
    }
    
    // Loop through the second array
    for (let index = 0; index < secArray.length; index++) {
        // If the index is even, it's a product name
        if (index % 2 === 0) {
            let productName = secArray[index];
            let quantity = parseInt(secArray[index + 1]);
            
            // Check if the product already exists in arrayOfObjects
            let existingProduct = arrayOfObjects.find(obj => obj.name === productName);
            
            // If it exists, update the quantity
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                // Otherwise, create a new object and add it to the array
                let objectProduct = new objectConstructor(productName, quantity);
                arrayOfObjects.push(objectProduct);
            }
        }
    }
    
    // Output the array of objects
    arrayOfObjects.forEach(object => {
        console.log(`${object.name} -> ${object.quantity}`);
    });
    console.log(arrayOfObjects);
}

solve([
    'Chips', '5', 'CocaCola', '9', 'Bananas', '14', 'Pasta', '4', 'Beer', '2'
],
[
    'Flour', '44', 'Oil', '12', 'Pasta', '7', 'Tomatoes', '70', 'Bananas', '30'
]);
