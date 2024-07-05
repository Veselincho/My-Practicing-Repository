function Piccolo(input) {
    let parking = [];

    // Making constructor function
    function objectConstructor(number) {
        this.number = number;
    }

    input.forEach(element => {
        let elementParams = element.split(', ')
        let command = elementParams[0]
        let carNum = elementParams[1]

        if (command === 'IN') {

            if (!parking.some(car => car.number === carNum)) {
                let currentCar = new objectConstructor(carNum);
                parking.push(currentCar);
            }
        }

        else if (command === 'OUT') {
            let index = parking.findIndex(car => car.number === carNum);
            if (index !== -1){
                parking.splice(index, 1);
            }
        } 
    });


    parking.sort((a, b) => a.number.localeCompare(b.number))
    if (parking.length > 0) {
        
        parking.forEach(element => {
            console.log(element.number);
        });
    }
    else {
        console.log('Parking Lot is Empty');
    }
}


Piccolo(['IN, CA2844AA',
'IN, CA1234TA',
'OUT, CA2844AA',
'IN, CA9999TT',
'IN, CA2866HI',
'OUT, CA1234TA',
'IN, CA2844AA',
'OUT, CA2866HI',
'IN, CA9876HH',
'IN, CA2822UU'])

// Piccolo(['IN, CA2844AA',
// 'IN, CA1234TA',
// 'OUT, CA2844AA',
// 'OUT, CA1234TA'])