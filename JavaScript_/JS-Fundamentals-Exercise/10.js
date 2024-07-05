function PasswordValidator(input){
    let charactersCount = 0;
    let countDigits = 0;
    let consistOnlyLettersAndNumbers = true;
    let containsOnlyDigits = false;

    let regex = "[!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~] "; 

    inputArray = [];        
    for (let i = 0; i < input.length; i++){
        inputArray[i] = input[i];
    }

    regexArray = [];
    for (let i = 0; i < regex.length; i++){
        regexArray[i] = regex[i]
    }

    let restRegexArray  = [...regex];
    
    //counting the nums
    inputArray.forEach(element => { element
        charactersCount++;
        if (element == parseInt(element)){ 
            countDigits++

            if (countDigits == charactersCount){
                containsOnlyDigits = true;
            }
            else{
                containsOnlyDigits = false;
            }
        }
    });

    if (charactersCount < 6 || charactersCount > 10){
         console.log('Password must be between 6 and 10 characters')                                                     
    }

    for (let i = 0; i < regexArray.length; i++){
        if (inputArray.includes(regexArray[i])){
            consistOnlyLettersAndNumbers = false;
        }
    }

    if (!consistOnlyLettersAndNumbers){
        console.log('Password must consist only of letters and digits')
    }

    if(containsOnlyDigits){
        console.log('Password must consist only of letters and digits')
    }
    

    if (countDigits < 2){
        console.log('Password must have at least 2 digits')                                                     
    }

    if (countDigits >= 2 && charactersCount >= 6 && charactersCount <= 10 && !containsOnlyDigits && consistOnlyLettersAndNumbers){
        console.log('Password is valid');
    }
}


//INVOKING TEST CASES
PasswordValidator('a2asadaddas2d');



