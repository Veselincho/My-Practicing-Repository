function registerHeroes(array){
    let objectArray = [];
    array.forEach(element => {
        inputParams = element.split(' / ');
        let heroName = inputParams[0];
        let heroLvl = parseFloat(inputParams[1]);
        let heroItems = inputParams[2];

        objectArray.push({
            'name': heroName,
            'lvl': heroLvl,
            'items': heroItems,
        })
    });

    objectArray.sort((a, b) => a.lvl - b.lvl); // Sort by 'lvl' property

    objectArray.forEach(element => {
        //Hero: Hes
        //level => 1
        //items => Desolator, Sentinel, Antara

        console.log(`Hero: ${element.name}`);
        console.log(`level => ${element.lvl}`);
        console.log(`items => ${element.items}`);
    });
}

registerHeroes([
    'Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara'
    ])

    console.log();

registerHeroes([
    'Batman / 2 / Banana, Gun',
    'Superman / 18 / Sword',
    'Poppy / 28 / Sentinel, Antara'
    ])