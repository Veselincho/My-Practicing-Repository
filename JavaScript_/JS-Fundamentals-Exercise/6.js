function substring(word, text){
    let wordRes = word.toLowerCase();
    let textRes = text.toLowerCase();
    
    if (textRes.includes(wordRes)){
        console.log(wordRes)
    }
    else{
        console.log(`${wordRes} not found!`);
    }
}

substring('javascript',
'JavaScript is the best programming language')
substring('python',
'JavaScript is the best programming language')

