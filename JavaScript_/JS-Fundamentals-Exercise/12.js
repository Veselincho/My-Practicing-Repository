function towns(input){
    function currentTown (townName, townLatitude, townLongitude) {
        this.townName = townName,
        this.townLatitude = townLatitude, // geogravska shirina
        this.townLongitude = townLongitude // duljina
    }


    input.forEach(element => {
         let inputParams = [];
         inputParams = element.split(' | ')
         let townName = inputParams[0];
         let townLatitude = parseFloat(inputParams[1])
         let townLongitude = parseFloat(inputParams[2])

         // making obj currentTown
         objectTown = new currentTown(townName, townLatitude, townLongitude)
         let objForPr = JSON.stringify(objectTown)
         console.log(`{ town: '${objectTown.townName}', latitude: '${objectTown.townLatitude.toFixed(2)}', longitude: '${objectTown.townLongitude.toFixed(2)}' }`)
    }
  )
}

towns(['Sofia | 42.696552 | 23.32601',
'Beijing | 39.913818 | 116.363625']
)