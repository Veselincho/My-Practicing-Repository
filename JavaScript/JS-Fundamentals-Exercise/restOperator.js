let regex = "[!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~] "; 

    let regexArray = [];
    for (let i = 0; i < regex.length; i++){
        regexArray[i] = regex[i]
    }

    // ... rest operator
    let restRegexArray  = [...regex];
    


    console.log(restRegexArray) ; 
    console.log(regexArray) ;

    // Checking for something different
    for(let i = 0; i < 34; i++){
        if(!restRegexArray[i] === regexArray[i]){
            console.log('no');
        }
    }