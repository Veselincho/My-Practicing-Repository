function Palindrome(word){
    let isPalindrome = true;

    if(word.length % 2 == 0){
        isPalindrome = false;
    }

    let charArray = []

    for(let char of word){
            charArray.push(char)
    }

    console.log(charArray);
    if (charArray[0] != charArray[charArray.length - 1]){
        isPalindrome = false;
        console.log('NO');
    }
}



Palindrome('radar')