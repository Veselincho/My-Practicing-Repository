function oddOccurrences(input) {
    // Convert input to lowercase to avoid case sensitivity
    let input2 = input.toLowerCase();
    // Split the input into an array of words
    let inputArray = input2.split(' ');
    let wordCountMap = new Map();

    inputArray.forEach((word, index) => {
        // Check if the word already exists in the map
        if (!wordCountMap.has(word)) {
            // If it doesn't exist, initialize it with count 1 and save its index
            wordCountMap.set(word, { count: 1, index: index });
        } else {
            // If it exists, increment its count
            let wordObj = wordCountMap.get(word);
            wordObj.count++;
            wordCountMap.set(word, wordObj);
        }
    });

    let oddOccurrencesArr = [];

    // Iterate over the input array to maintain order and find odd occurrences
    inputArray.forEach(word => {
        let wordObj = wordCountMap.get(word);
        // Check if the count of occurrences is odd for the current word
        if (wordObj.count % 2 !== 0) {
            // If odd, add the word to the result array
            oddOccurrencesArr.push(word);
        }
    });

    // Sort the odd occurrences array based on the original order of appearance
    oddOccurrencesArr.sort((a, b) => wordCountMap.get(a).index - wordCountMap.get(b).index);

    // Construct the result string by joining the odd occurrences array
    let stringResult = oddOccurrencesArr.join(' ');

    // Return the result string
    return stringResult;
}

// Test the function
console.log(oddOccurrences('Java C# Php PHP Java PhP 3 C# 3 1 5 C#'));
