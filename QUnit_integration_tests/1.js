QUnit.config.reorder = false;
let baseUrl = 'http://localhost:3030'  

let user = {
    "email": "",
    "username": "",
    "password": "123456",
    "gender": "male",
    "id": "",
    "token": ""
}

let meme = {
    "title": "random_title_123456",
    "description": "random_description_534554",
    "imageUrl": "/images/2.png",
    "id": ''
}


QUnit.module('I Scope - User functionality', () =>{
    QUnit.test('User Register', async (assert) =>{
        let path = '/users/register'
        let random = Math.floor(Math.random() * 10000)
        user.email = `email${random}@abv.bg`
        user.username = `userName${random}`

        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(user) 
        })

        let jsonResponse = await response.json();

        // updating the userId, token & setting sessionStorage.
        user.id = jsonResponse._id
        user.token = jsonResponse.accessToken
        sessionStorage.setItem('user', JSON.stringify(user));


        assert.ok(response.ok, 'Register Response successful')
        assert.ok(jsonResponse.hasOwnProperty('username'), 'property username exists')
        
        assert.ok(jsonResponse.hasOwnProperty('accessToken'), 'property accessToken exists')

        assert.ok(jsonResponse.hasOwnProperty('_id'), 'property _id exists')
        
        assert.ok(jsonResponse.hasOwnProperty('_createdOn'), 'property _createdOn exists')
        
        assert.ok(jsonResponse.hasOwnProperty('password'), 'property password exists')

        assert.ok(jsonResponse.hasOwnProperty('email'), 'property email exists')

        assert.ok(jsonResponse.hasOwnProperty('gender'), 'property gender exists')
    })

    QUnit.test('User Login', async (assert) =>{
        let path = '/users/login'
        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers:{
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        })

        let jsonResponse = await response.json();

       assert.ok(response.ok, 'Response successfully')

        // updating the userId, token & setting sessionStorage.
        user.id = jsonResponse._id
        user.token = jsonResponse.accessToken
        sessionStorage.setItem('user', JSON.stringify(user));


        assert.ok(response.ok, 'Login Response successful')
        assert.ok(jsonResponse.hasOwnProperty('username'), 'property username exists')
        
        assert.ok(jsonResponse.hasOwnProperty('accessToken'), 'property accessToken exists')

        assert.ok(jsonResponse.hasOwnProperty('_id'), 'property _id exists')
        
        assert.ok(jsonResponse.hasOwnProperty('_createdOn'), 'property _createdOn exists')
        
        assert.ok(jsonResponse.hasOwnProperty('password'), 'property password exists')

        assert.ok(jsonResponse.hasOwnProperty('email'), 'property email exists')

        assert.ok(jsonResponse.hasOwnProperty('gender'), 'property gender exists')
    })
})

QUnit.module('II Scope - MEME Functionality', () =>{
    QUnit.test('GET all memes Request', async (assert) =>{
        let path = '/data/memes?sortBy=_createdOn%20desc';
        let response = await fetch(baseUrl + path)
        let jsonResponse = await response.json();
        
        console.log(response);
        console.log(jsonResponse);
        
        assert.ok(response.ok, 'successfull GET response for Memes')
        assert.ok(Array.isArray(jsonResponse))

        jsonResponse.forEach(element => {
            assert.ok(element.hasOwnProperty('description', 'imageUrl', 'title', '_createdOn', '_id', '_ownerId'), 'All required Properties exists');
            assert.ok(element.hasOwnProperty('_ownerId'))
        });
      
    })

    QUnit.test('Create MEME', async(assert) =>{
        let path = `/data/meme`;
        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': user.token
            },
            body: JSON.stringify(meme)
        })

        let jsonResponse = await response.json();        
        assert.ok(response.ok, 'Response successful')

        assert.ok(jsonResponse.hasOwnProperty('description'), 'descr prop exists')
        assert.ok(jsonResponse.hasOwnProperty('id'), 'id prop exists')
        assert.ok(jsonResponse.hasOwnProperty('imageUrl'), 'imageUrl prop exists')
        assert.ok(jsonResponse.hasOwnProperty('title'), 'title property exists')
        assert.ok(jsonResponse.hasOwnProperty('_createdOn'), ' _createdOn property exists')
        assert.ok(jsonResponse.hasOwnProperty('_ownerId'), 'ownerId property exists')
        assert.ok(jsonResponse.hasOwnProperty('_id'), 'id prop exists')

        meme.id = jsonResponse._id;
    })

    QUnit.test('Delete meme', async (assert) =>{

        let path = '/data/meme/';
        let param = `${meme.id}`

        let response = await fetch(baseUrl + path + param, {
            method: 'DELETE',
            headers:{
                'X-Authorization': user.token
            }
        })

        let jsonResponse = await response.json();
        console.log(jsonResponse);


        assert.ok(response.ok, 'response is successfull')
        assert.ok(jsonResponse.hasOwnProperty('_deletedOn'), 'Property _deletedOn exists')
        assert.strictEqual(typeof jsonResponse._deletedOn, 'number', 'Deleted on date is a correct data type')
    })
})