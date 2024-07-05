function solve(words, templates){
    let wordsArray = words.split(', ') // making new array 
    let newArray = templates.split(' '); // making new array of 
    for (let i = 0; i < newArray.length; i++) {
            if (newArray[i].includes('*')){
                let wordCount = newArray[i].length
                for (let j = 0; j < wordsArray.length; j++){
                    if (wordCount == wordsArray[j].length){
                        newArray[i] = wordsArray[j] 
                    }
                }
            }
    }
    
    let stringRes = newArray.join(' ')
    console.log(stringRes)
}


solve('great',
'softuni is ***** place for learning new programming languages')


//find word
