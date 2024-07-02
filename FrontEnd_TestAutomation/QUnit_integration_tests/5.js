const baseUrl = 'http://localhost:3030/'
QUnit.config.reorder = false;

let user = {
    email: '',
    password: '1234'
}

let token = '';
let userId = '';

let game = {
    title: '',
    category: '',
    maxLevel: '',
    imageUrl: './images/amidamaru.jpg',
    summary: ''
};

let lastCreatedGameId = '';
let gameIdForComments = '';

let comment = {
    gameId: gameIdForComments,
    comment: `comment value`
};


QUnit.module('user functionalities', () =>{
    QUnit.test('Registration', async (assert) => {
        
        
    //Arrange
    let path = 'users/register';
    let random = Math.floor(Math.random() * 10000);
    let email = `name${random}@abv.bg`
    user.email = email;

    //ACT
    let response = await fetch(baseUrl + path, {
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    let json = await response.json()

    //ASSERT
    assert.ok(response.ok, 'successfull response')

    assert.ok(json.hasOwnProperty('email'), 'property "email" exists')
    assert.equal(json.email, user.email, 'expected "email" match')
    assert.strictEqual(typeof json.email, 'string', 'property "email" is a string')

    assert.ok(json.hasOwnProperty('password'), 'property "password" exists')
    assert.equal(json.password, user.password, 'expected "password" match')
    assert.strictEqual(typeof json.password, 'string', 'property "password" is a string')

    assert.ok(json.hasOwnProperty('accessToken'), 'property "accessToken" exists')
    assert.strictEqual(typeof json.accessToken, 'string', 'property "accessToken" is a string')

    assert.ok(json.hasOwnProperty('_id'), 'property "_id" exists')
    assert.strictEqual(typeof json._id, 'string', 'property "id" is a string')

    token = json.accessToken
    token = json['accessToken']
    userId = json._id
    sessionStorage.setItem('game-user', JSON.stringify(user)); // set token to session store in browser 

    })

    QUnit.test('Login', async(assert) =>{

        let path = 'users/login'
        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        let json = await response.json();

        
        assert.ok(response.ok, 'successfull response')

        assert.ok(json.hasOwnProperty('email'), 'property "email" exists')
        assert.equal(json.email, user.email, 'expected "email" match')
        assert.strictEqual(typeof json.email, 'string', 'property "email" is a string')
    
        assert.ok(json.hasOwnProperty('password'), 'property "password" exists')
        assert.equal(json.password, user.password, 'expected "password" match')
        assert.strictEqual(typeof json.password, 'string', 'property "password" is a string')
    
        assert.ok(json.hasOwnProperty('accessToken'), 'property "accessToken" exists')
        assert.strictEqual(typeof json.accessToken, 'string', 'property "accessToken" is a string')
    
        assert.ok(json.hasOwnProperty('_id'), 'property "_id" exists')
        assert.strictEqual(typeof json._id, 'string', 'property "id" is a string')
    
        userId = json._id
        token = json.accessToken
        token = json['accessToken']
        sessionStorage.setItem('game-user', JSON.stringify(user)); // set token to session store in browser 
    })
})

QUnit.module('games functionalities', () =>{
                                                    //Arrow function
    QUnit.test('game have expected properties', async(assert) =>{
        let path = 'data/games'
        let queryParams = '?sortBy=_createdOn%20desc';

        let respone = await fetch(baseUrl + path + queryParams)
        let json = await respone.json();

        assert.ok(respone.ok, 'response is okay')
        assert.ok(Array.isArray(json), 'json is an array')

        json.forEach(jsonProperty => {
            assert.ok(jsonProperty.hasOwnProperty('category'), "Property category exists")
            assert.strictEqual(typeof jsonProperty.category, 'string', "Property category has correct type")

            assert.ok(jsonProperty.hasOwnProperty('title'), "Property title exists")
            assert.strictEqual(typeof jsonProperty.title, 'string', "Property title has correct type")

            assert.ok(jsonProperty.hasOwnProperty('maxLevel'), "MaxLevel Property exists")
            assert.strictEqual(typeof jsonProperty.maxLevel, 'string', "maxLevel property is correct type")

            assert.ok(jsonProperty.hasOwnProperty('imageUrl'), "imageUrl property exists")
            assert.strictEqual(typeof jsonProperty.imageUrl, 'string', "imageUrl has correct type")

            assert.ok(jsonProperty.hasOwnProperty('summary'), "Summary property exists")
            assert.strictEqual(typeof jsonProperty.summary, 'string', "property summary is correct type")

            assert.ok(jsonProperty.hasOwnProperty('_ownerId'), "_ownerId property exists")
            assert.strictEqual(typeof jsonProperty._ownerId, 'string', "_ownerId summary is correct type")

            assert.ok(jsonProperty.hasOwnProperty('_id'), "_id property exists")
            assert.strictEqual(typeof jsonProperty._id, 'string', "property _id is correct type")

            assert.ok(jsonProperty.hasOwnProperty('_createdOn'), "createdOn propert exists" )
            assert.strictEqual(typeof jsonProperty['_createdOn'], 'number', "createdOn property is correct type(number)")
        });
    })

                                                //Annonymous function
    QUnit.test('creating game functionalitie', async function(assert) {
        //arrange
        let random = Math.floor(Math.random() * 10000)
        game.title = `The shaman King${random}`
        game.category = `fun${random}`
        game.maxLevel = `level${random}`
        game.summary = `summary${random}`
        let path = 'data/games';


        //act
        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers:{
                'content-type': 'application/json',
                'X-Authorization': `${token}`
            },
            body: JSON.stringify(game)
        });
        let json = await response.json();

        //assert
       assert.ok(response.ok, "Response successfull")

       assert.ok(json.hasOwnProperty('_ownerId'), 'existing property ownerId')  
       assert.strictEqual(typeof json._ownerId, 'string', "ownerID property is correct type")

       assert.ok(json.hasOwnProperty('_id', "existing game ID property"))
       assert.strictEqual(typeof json._id, 'string', "_ID property is correct type")

       lastCreatedGameId = json._id;
    })

    QUnit.test('GET Game by ID', async (assert) =>{
        let path = 'data/games/';

        let response = await fetch(baseUrl + path + lastCreatedGameId)
        let json = await response.json()
        
        assert.ok(response.ok)
    })

    QUnit.test('Edit game', async (assert) =>{
        let random = Math.floor(Math.random() * 10000)
        let path = 'data/games/';
        game.title = `NEW EDITTED TITLE ${random}` 
        game.maxLevel = `${random}`


        let response = await fetch(baseUrl + path + lastCreatedGameId, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(game)
        })

        

        let json = await response.json();

        assert.ok(response.ok)
    })

    QUnit.test('Delete game funct', async (assert) =>{
        let path = 'data/games';
        let respone = await fetch(baseUrl + path + '/' + lastCreatedGameId, {
            method: 'DELETE',
            headers:{
                'X-Authorization': token,
                'content-type': 'application/json'
            },
        })
        let json = await respone.json();

        assert.ok(respone.ok)
    })
})

QUnit.module('Test comment funct', () =>{
    QUnit.test('newLy created game with no comments', async (assert) =>{
        let path = 'data/games'
        let respone = await fetch(baseUrl + path,{
            method: 'POST',
            headers:{
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(game)
        })
    
        let json = await respone.json()
    
        assert.ok(respone.ok, "Response ok")
        assert.ok(json.hasOwnProperty('_createdOn'), 'property createdOn exists')
    
        gameIdForComments = json._id;
        
        console.log(lastCreatedGameId);
        console.log(gameIdForComments);
        
        assert.ok(respone.ok, "response is successfull")
    })

    QUnit.test('POST new comment funct', async (assert) =>{
        let path = 'data/comments';
        comment.comment = 'MN IZRUDKSA IGRA BATE'
        let respone = await fetch(baseUrl + path,{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(comment)
        })

        let json = await respone.json();

        assert.ok(respone.ok, 'Response is successfull')
        assert.equal(json.comment, 'MN IZRUDKSA IGRA BATE', 'Comment matches with expected value')
        console.log(respone);
        console.log(json);
    })
})