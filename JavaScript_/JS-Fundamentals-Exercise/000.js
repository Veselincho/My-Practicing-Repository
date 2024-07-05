function checkForWord(word, text) {
    // Convert both word and text to lowercase for case-insensitive comparison
    var lowerCaseWord = word.toLowerCase();
    var lowerCaseText = text.toLowerCase();

    // Split the text into an array of words
    var wordsArray = lowerCaseText.split(/\s+/);

    // Iterate over the words in the array to check for a match
    for (var i = 0; i < wordsArray.length; i++) {
        if (wordsArray[i] === lowerCaseWord) {
            // If a match is found, print the word and stop the program
            console.log(word);
            return;
        }
    }

    // If the loop completes without finding a match, print "{word} not found!"
    console.log(`${word} not found!`);
}

// Example usage:
checkForWord('javascript',
'JavaScript is the best programming language')
checkForWord('python',
'JavaScript is the best programming language')

