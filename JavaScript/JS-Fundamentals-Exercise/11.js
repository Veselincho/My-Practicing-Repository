function employees(input){
    function person (Name, PersonalNumber){
        this.Name = Name,
        this.PersonalNumber = PersonalNumber
}

    input.forEach(element => {
        let name = element.toString();
        let num = element.length;
        currentPerson = new person(name, num)
        console.log(`Name: ${currentPerson.Name} -- Personal Number: ${currentPerson.PersonalNumber}`)
    })
}

employees([
    'Silas Butler',
    'Adnaan Buckley',
    'Juan Peterson',
    'Brendan Villarreal'
    ])