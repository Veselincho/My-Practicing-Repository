function Movies(inputArray) {

    //making array to keep the movie object
    let movies = [];

    // iterating over every element in the array
    inputArray.forEach(element => {
        if (element.includes('addMovie')) {
            const restOfelement = element.slice(9)
            let movieName = restOfelement

           // pushing object with props
            movies.push({ 'name': movieName })
            // movies.push({ 'name': movieName, date: undefined, director: undefined })

        }

        else if (element.includes('directedBy')){
            let indexOfDir = element.indexOf('directedBy')
            // 'Godfather directedBy Francis Ford Coppola' 
            let movieName = element.slice(0, indexOfDir - 1)
            let director = element.slice(indexOfDir+11)

            // checking every element for a match in the name
            // and if true - assigning a director to it
            movies.forEach(movie => {
                if (movie.hasOwnProperty('name') && movie.name === movieName){
                    movie.director = director;
                }
            });
        }

        else if (element.includes('onDate')){
            let startIndex = element.indexOf('onDate')
            let movieName = element.slice(0, startIndex-1);
            let onDate = element.slice(startIndex+7)

            movies.forEach(movie => {
                if (movie.hasOwnProperty('name') && movie.name === movieName){
                    movie.date = onDate;
                }
            });
        }
    });


    movies.forEach(movie => {   
        if (movie.date != undefined && movie.name != undefined && movie.director != undefined){
         
            const result = JSON.stringify(movie)
            console.log(result);

        }
    });
}



let moviesData = Movies([
    'addMovie Fast and Furious',
    'addMovie Godfather',
    'Inception directedBy Christopher Nolan',
    'Godfather directedBy Francis Ford Coppola',
    'Godfather onDate 29.07.2018',
    'Fast and Furious onDate 30.07.2018',
    'Batman onDate 01.08.2018',
    'Fast and Furious directedBy Rob Cohen'
]);
