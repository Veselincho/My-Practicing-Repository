function solve(firstArray, secArray){
    // Making associative array to keep the objects inside:
    let products = [];
    let arrayOfObjects = [];

    //making varialbes to use in the for cycle
    let productName = ''
    let quantity = 0;
    
    //making constructor
    function objectConstructor(name, quantity){
        this.name = name;
        this.quantity = quantity;
    }
    
    for (let index = 0; index < (firstArray.length / 2 ) - 1; index += 2) {
        productName = firstArray[index];
    }

    for (let index = 1; index < (firstArray.length / 2 )- 1; index += 2) {
        quantity = parseInt(index);
    }

       // quantity = parseInt(firstArray[index + 1]);
    
        // making object 
        let objectProduct = new objectConstructor(productName, quantity);
    
        // adding the object to the array
        arrayOfObjects.push(objectProduct);

        
        //INPUT  'Chips', '5', 'CocaCola', '9', 'Bananas', '14', 'Pasta', '4', 'Beer', '2'
        arrayOfObjects.forEach(object => {
            console.log(`Name: ${object.name}, Quantity: ${object.quantity}`);
        });
    }
    
      
      

  


solve([
    'Chips', '5', 'CocaCola', '9', 'Bananas', '14', 'Pasta', '4', 'Beer', '2'
    ],
    [
    'Flour', '44', 'Oil', '12', 'Pasta', '7', 'Tomatoes', '70', 'Bananas', '30'
    ])