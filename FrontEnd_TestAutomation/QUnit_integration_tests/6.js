QUnit.config.reorder = false;

let baseUrl = 'http://localhost:3030';

let user = {
    email: '',
    password: '123456'
}

let userId = ''
let userToken = ''

let albumId = ''

let album = {
    "name": "Random album title_67373",
    "artist": "Unknown",
    "description": "Description 67373",
    "genre": "Random genre",
    "imgUrl": "/images/pinkFloyd.jpg",
    "price": "15.25",
    "releaseDate": "29 June 2024"
}

QUnit.module('User Functionality', () =>{
    QUnit.test('register', async(assert) =>{
        let path = '/users/register'
        let random = Math.floor(Math.random() * 10000)
        user.email = `emailHere${random}@yahoo.com`

        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        let jsonResponse = await response.json();

        assert.ok(response.ok, 'response is okay')

        assert.ok(jsonResponse.hasOwnProperty('email'), 'prop email exists')
        assert.strictEqual(typeof jsonResponse.email, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('accessToken'), 'prop emaccessTokenail exists')
        assert.strictEqual(typeof jsonResponse.accessToken, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('password'), 'prop password exists')
        assert.strictEqual(typeof jsonResponse.password, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('_createdOn'), 'prop _createdOn exists')
        assert.strictEqual(typeof jsonResponse._createdOn, 'number', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('_id'), 'prop _id exists')
        assert.strictEqual(typeof jsonResponse._id, 'string', 'correct data type')

        userId = jsonResponse._id
        userToken = jsonResponse.accessToken
        sessionStorage.setItem('user', JSON.stringify(user));
    })

    QUnit.test('login', async(assert) => {
        let path = '/users/login'

        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        assert.ok(response.ok, 'Response is okay')
        let jsonResponse = await response.json()

        assert.ok(jsonResponse.hasOwnProperty('email'), 'prop email exists')
        assert.strictEqual(typeof jsonResponse.email, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('accessToken'), 'prop emaccessTokenail exists')
        assert.strictEqual(typeof jsonResponse.accessToken, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('password'), 'prop password exists')
        assert.strictEqual(typeof jsonResponse.password, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('_createdOn'), 'prop _createdOn exists')
        assert.strictEqual(typeof jsonResponse._createdOn, 'number', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('_id'), 'prop _id exists')
        assert.strictEqual(typeof jsonResponse._id, 'string', 'correct data type')

        userId = jsonResponse._id
        userToken = jsonResponse.accessToken
        sessionStorage.setItem('user', JSON.stringify(user));
    })
})

QUnit.module('Album Functionality', () =>{
    QUnit.test('Get all albums', async (assert) =>{

        let path = '/data/albums?sortBy=_createdOn%20desc&distinct=name'
        let response = await fetch(baseUrl + path)
        assert.ok(response, 'Response is okay')
        let jsonResponse = await response.json()

        assert.ok(Array.isArray(jsonResponse), 'Response is an Array')
        jsonResponse.forEach(el => {

            assert.ok(el.hasOwnProperty('artist'), 'Prop artist exists')
            assert.strictEqual(typeof el.artist, 'string', 'Correct data type')
            
            assert.ok(el.hasOwnProperty('description'), 'Prop description exists')
            assert.strictEqual(typeof el.description, 'string', 'Correct data type')
            
            assert.ok(el.hasOwnProperty('genre'), 'Prop genre exists')
            assert.strictEqual(typeof el.genre, 'string', 'Correct data type')
            
            assert.ok(el.hasOwnProperty('imgUrl'), 'Prop imgUrl exists')
            assert.strictEqual(typeof el.imgUrl, 'string', 'Correct data type')
            
            assert.ok(el.hasOwnProperty('name'), 'Prop name exists')
            assert.strictEqual(typeof el.name, 'string', 'Correct data type')
            
            assert.ok(el.hasOwnProperty('price'), 'Prop price exists')
            assert.strictEqual(typeof el.price, 'string', 'Correct data type')
            
            assert.ok(el.hasOwnProperty('releaseDate'), 'Prop releaseDate exists')
            assert.strictEqual(typeof el.releaseDate, 'string', 'Correct data type')
            
            assert.ok(el.hasOwnProperty('_createdOn'), 'Prop _createdOn exists')
            assert.strictEqual(typeof el._createdOn, 'number', 'Correct data type')
            
            assert.ok(el.hasOwnProperty('_id'), 'Prop _id exists')
            assert.strictEqual(typeof el._id, 'string', 'Correct data type')
            
            assert.ok(el.hasOwnProperty('_ownerId'), 'Prop _ownerId exists')
            assert.strictEqual(typeof el._ownerId, 'string', 'Correct data type')

        });
        
        
    })

    QUnit.test('Create Album', async(assert) =>{
        let path = '/data/albums'

        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers:{
                'content-type': 'application/json',
                'X-Authorization': userToken
            },
            body:JSON.stringify(album)
        })

        assert.ok(response.ok, 'Response is okay/successful')
        let jsonResponse = await response.json();

        assert.ok(jsonResponse.hasOwnProperty('artist'), 'property artist exists')
        assert.strictEqual(typeof jsonResponse.artist, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('description'), 'property description exists')
        assert.strictEqual(typeof jsonResponse.description, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('genre'), 'property genre exists')
        assert.strictEqual(typeof jsonResponse.genre, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('imgUrl'), 'property imgUrl exists')
        assert.strictEqual(typeof jsonResponse.imgUrl, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('name'), 'property name exists')
        assert.strictEqual(typeof jsonResponse.name, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('price'), 'property price exists')
        assert.strictEqual(typeof jsonResponse.price, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('releaseDate'), 'property releaseDate exists')
        assert.strictEqual(typeof jsonResponse.releaseDate, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('_createdOn'), 'property _createdOn exists')
        assert.strictEqual(typeof jsonResponse._createdOn, 'number', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('_id'), 'property _id exists')
        assert.strictEqual(typeof jsonResponse._id, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('_ownerId'), 'property _ownerId exists')
        assert.strictEqual(typeof jsonResponse._ownerId, 'string', 'correct data type')

        albumId = jsonResponse._id;
    })

    QUnit.test('Edit album', async(assert) =>{
        let path = `/data/albums/${albumId}`
        album.artist = 'editted'

        let response = await fetch(baseUrl + path,{
            method: 'PUT',
            headers:{
                'content-type': 'application/json',
                'X-Authorization': userToken
            },
            body: JSON.stringify(album)
        })

        let jsonResponse = await response.json()

        assert.ok(response.ok, 'response is successfull')

        assert.ok(jsonResponse.hasOwnProperty('artist'), 'property artist exists')
        assert.strictEqual(typeof jsonResponse.artist, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('description'), 'property description exists')
        assert.strictEqual(typeof jsonResponse.description, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('genre'), 'property genre exists')
        assert.strictEqual(typeof jsonResponse.genre, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('imgUrl'), 'property imgUrl exists')
        assert.strictEqual(typeof jsonResponse.imgUrl, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('name'), 'property name exists')
        assert.strictEqual(typeof jsonResponse.name, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('price'), 'property price exists')
        assert.strictEqual(typeof jsonResponse.price, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('releaseDate'), 'property releaseDate exists')
        assert.strictEqual(typeof jsonResponse.releaseDate, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('_createdOn'), 'property _createdOn exists')
        assert.strictEqual(typeof jsonResponse._createdOn, 'number', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('_id'), 'property _id exists')
        assert.strictEqual(typeof jsonResponse._id, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('_ownerId'), 'property _ownerId exists')
        assert.strictEqual(typeof jsonResponse._ownerId, 'string', 'correct data type')
        
        assert.ok(jsonResponse.hasOwnProperty('_updatedOn'), 'property _updatedOn exists')
        assert.strictEqual(typeof jsonResponse._updatedOn, 'number', 'correct data type')

        assert.strictEqual(jsonResponse.artist, 'editted', 'Match on the editted value')
    })

    QUnit.test('Delete album', async(assert) =>{
        let path = `/data/albums/${albumId}`

        let response = await fetch(baseUrl + path, {
            method: 'DELETE',
            headers:{
                'X-Authorization': userToken
            }
        })

        assert.ok(response.ok, 'Response successful')
    })
    
})