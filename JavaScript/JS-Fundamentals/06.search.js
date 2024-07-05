/**
 * 
 * @param {string} text 
 * @param {string} word 
 */
function solve(text, word) {
    let index = 0;
    let count = 0;

    while (text.includes(word, index)) {
        count++;
        index = text.indexOf(word) + 1;
    }

    console.log(count);
}

solve('This is a word and it also is a sentence',
    'is'
);
