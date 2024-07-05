function oddOccurrences(input) { 
    // Конвертира входа в малки букви, за да се избегне различен регистър на буквите
    let inputArray = input.toLowerCase().split(' '); 
    let stringResult = ''; // Инициализира променлива за резултатния низ
    let wordCounts = new Map(); // Създава мап за броя на срещанията на думите
 
    // Преброява срещанията на всяка дума
    inputArray.forEach(word => { 
        let count = wordCounts.get(word) || 0; 
        wordCounts.set(word, count + 1); 
    }); 
 
    // Итерира през мапа
    for (let [word, count] of wordCounts.entries()) { 
        if (count % 2 !== 0) { // Проверява дали броят на срещанията е нечетен
            stringResult += word + ' '; // Добавя думата към резултатния низ
        } 
    } 
 
    console.log(stringResult.trim()); // Извежда резултатния низ без празни пространства в началото и в края
}

oddOccurrences('Java C# Php PHP Java PhP 3 C# 3 1 5 C#')