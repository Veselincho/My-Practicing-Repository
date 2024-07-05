function oddOccurencies(input) {
    // Convert input to lowercase to avoid case sensitivity
    let input2 = input.toLowerCase();
    // Split the input into an array of words
    let inputArray = input2.split(' ');
    let stringResult = '';
    let assArrayObjct = {};

    inputArray.forEach(element => {
        // Check if the word already exists as a property in the object
        if (!assArrayObjct.hasOwnProperty(element)) {
            // If it doesn't exist, initialize it with count 1
            assArrayObjct[element] = 1;
        } else {
            // If it exists, increment its count
            assArrayObjct[element]++;
        }
    });


    // Iterate over the properties of the object
    for (let obj in assArrayObjct) {
            // Check if the count of occurrences is odd
            if (assArrayObjct[obj] % 2 !== 0) {
                // If odd, push the word to the result array
              //  oddOccurrencesArr.push({ elementName: key, countAccured: assArrayObjct[key] });
              stringResult += obj + ' ';
        }
    }

    // Return the array of words with odd occurrences
    // return oddOccurrences;
    
    console.log(stringResult)
}

// Test the function
oddOccurencies('Java C# Php PHP Java PhP 3 C# 3 1 5 C#')