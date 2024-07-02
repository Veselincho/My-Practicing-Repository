QUnit.config.reorder = false;

let baseUrl = 'http://localhost:3030'

let user = {
    email: '',
    password: '123456',
}

let book = {
    "title": "random_title_123456",
    "description": "random_description_534554",
    "imageUrl": "/images/2.png",
    "type": "Other"
}

let userToken = ``;
let userId = ``;
let bookId = ``;


QUnit.module('User functionalities', async () =>{
    QUnit.test('Registration test', async (assert) =>{

        let random = Math.floor(Math.random() * 10000)
        user.email = `email${random}@yahoo.com`
        let path = '/users/register'
        let response = await fetch(baseUrl + path,{
            method: 'POST',
            headers:{
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        
        let jsonResponse = await response.json();

        assert.ok(response.ok, 'response is successfull')
        
        assert.ok(jsonResponse.hasOwnProperty('accessToken'), 'property accessToken exists')
        assert.strictEqual(typeof jsonResponse.accessToken, 'string', 'Correct accessToken data type')

        assert.ok(jsonResponse.hasOwnProperty('email'), 'property email exists')
        assert.equal(jsonResponse.email, user.email, 'match in the expected email')
        assert.strictEqual(typeof jsonResponse.email, 'string', 'Correct email data type')

        assert.ok(jsonResponse.hasOwnProperty('password'), 'property password exists')
        assert.equal(jsonResponse.password, user.password, 'match in the expected email')
        assert.strictEqual(typeof jsonResponse.password, 'string', 'Correct password data type')

        assert.ok(jsonResponse.hasOwnProperty('_createdOn'), 'property _createdOn exists')
        assert.strictEqual(typeof jsonResponse._createdOn, 'number', 'Correct _createdOn data type')

        assert.ok(jsonResponse.hasOwnProperty('_id'), 'property _id exists')
        assert.strictEqual(typeof jsonResponse._id, 'string', 'Correct _id data type')


        userId = jsonResponse._id
        userToken = jsonResponse.accessToken
        sessionStorage.setItem('user', JSON.stringify(user));
    })

    QUnit.test('Login test', async (assert) =>{
        let path = '/users/login'

        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify(user)
        })

        assert.ok(response.ok)

        let jsonResponse = await response.json();

        assert.ok(response.ok, 'response is successfull')
        
        assert.ok(jsonResponse.hasOwnProperty('accessToken'), 'property accessToken exists')
        assert.strictEqual(typeof jsonResponse.accessToken, 'string', 'Correct accessToken data type')

        assert.ok(jsonResponse.hasOwnProperty('email'), 'property email exists')
        assert.equal(jsonResponse.email, user.email, 'match in the expected email')
        assert.strictEqual(typeof jsonResponse.email, 'string', 'Correct email data type')

        assert.ok(jsonResponse.hasOwnProperty('password'), 'property password exists')
        assert.equal(jsonResponse.password, user.password, 'match in the expected email')
        assert.strictEqual(typeof jsonResponse.password, 'string', 'Correct password data type')

        assert.ok(jsonResponse.hasOwnProperty('_createdOn'), 'property _createdOn exists')
        assert.strictEqual(typeof jsonResponse._createdOn, 'number', 'Correct _createdOn data type')

        assert.ok(jsonResponse.hasOwnProperty('_id'), 'property _id exists')
        assert.strictEqual(typeof jsonResponse._id, 'string', 'Correct _id data type')

        userId = jsonResponse._id
        userToken = jsonResponse.accessToken
        sessionStorage.setItem('user', JSON.stringify(user));
    })
})

QUnit.module('Book functionality', () =>{
    QUnit.test('Get all books', async(assert) =>{
        let path = `/data/books?sortBy=_createdOn%20desc`

        let response = await fetch(baseUrl + path)
        let jsonResponse = await response.json();

        assert.ok(response.ok, 'Ressponse successful')
        assert.ok(Array.isArray(jsonResponse), 'Response is an Array')
        jsonResponse.forEach(ele => {
            assert.ok(ele.hasOwnProperty('description'), 'description property exists')
            assert.strictEqual(typeof ele.description, 'string', 'correct data type')
            assert.ok(ele.hasOwnProperty('imageUrl'), 'imageUrl property exists')
            assert.strictEqual(typeof ele.imageUrl, 'string', 'correct data type')
            assert.ok(ele.hasOwnProperty('title'), 'title property exists')
            assert.strictEqual(typeof ele.title, 'string', 'correct data type')
            assert.ok(ele.hasOwnProperty('type'), 'type property exists')
            assert.strictEqual(typeof ele.type, 'string', 'correct data type')
            assert.ok(ele.hasOwnProperty('_createdOn'), '_createdOn property exists')
            assert.strictEqual(typeof ele._createdOn, 'number', 'correct data type')
            assert.ok(ele.hasOwnProperty('_id'), '_id property exists')
            assert.strictEqual(typeof ele._id, 'string', 'correct data type')
            assert.ok(ele.hasOwnProperty('_ownerId'), '_ownerId property exists')
            assert.strictEqual(typeof ele._ownerId, 'string', 'correct data type')            
        });

    })

    QUnit.test('create book', async (assert) =>{
        let path = '/data/books'

        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers:{
                'content-type': 'application/json',
                'X-Authorization' : userToken
            },
            body: JSON.stringify(book)
        })
        let jsonResponse = await response.json();

        assert.ok(response.ok, 'Response successful')

        assert.ok(jsonResponse.hasOwnProperty('description'), 'Property description exists')
        assert.strictEqual(typeof jsonResponse.description, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('imageUrl'), 'Property imageUrl exists')
        assert.strictEqual(typeof jsonResponse.imageUrl, 'string', 'correct data type')
        
        assert.ok(jsonResponse.hasOwnProperty('title'), 'Property title exists')
        assert.strictEqual(typeof jsonResponse.title, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('type'), 'Property type exists')
        assert.strictEqual(typeof jsonResponse.type, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('_createdOn'), 'Property _createdOn exists')
        assert.strictEqual(typeof jsonResponse._createdOn, 'number', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('_id'), 'Property _id exists')
        assert.strictEqual(typeof jsonResponse._id, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('_ownerId'), 'Property _ownerId exists')
        assert.strictEqual(typeof jsonResponse._ownerId, 'string', 'correct data type')

        bookId = jsonResponse._id
    })

    QUnit.test('Edit book', async(assert) =>{
        let path = `/data/books/${bookId}`

        book.title = `EdittedBookTitle`

        let response = await fetch(baseUrl + path, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': userToken
            },
            body:JSON.stringify(book)
        })

        let jsonResponse = await response.json()

        assert.ok(response.ok, 'successfull response')

        assert.ok(jsonResponse.hasOwnProperty('description'), 'Property description exists')
        assert.strictEqual(typeof jsonResponse.description, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('imageUrl'), 'Property imageUrl exists')
        assert.strictEqual(typeof jsonResponse.imageUrl, 'string', 'correct data type')
        
        assert.ok(jsonResponse.hasOwnProperty('title'), 'Property title exists')
        assert.strictEqual(typeof jsonResponse.title, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('type'), 'Property type exists')
        assert.strictEqual(typeof jsonResponse.type, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('_createdOn'), 'Property _createdOn exists')
        assert.strictEqual(typeof jsonResponse._createdOn, 'number', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('_id'), 'Property _id exists')
        assert.strictEqual(typeof jsonResponse._id, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('_ownerId'), 'Property _ownerId exists')
        assert.strictEqual(typeof jsonResponse._ownerId, 'string', 'correct data type')

        assert.ok(jsonResponse.hasOwnProperty('_updatedOn'), 'Property _updatedOn exists')
        assert.strictEqual(typeof jsonResponse._updatedOn, 'number', 'correct data type')

        assert.strictEqual(jsonResponse.title, 'EdittedBookTitle', 'Match in the expected update property')

    })

    QUnit.test('Delete Book', async(assert) =>{
        let path = `/data/books/${bookId}`

        let response = await fetch(baseUrl + path, {
            method: 'DELETE',
            headers:{
                'X-Authorization': userToken
            }
        })

        assert.ok(response.ok, 'response successful')

    })
})