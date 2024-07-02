QUnit.config.reorder = false;
let baseUrl = 'http://localhost:3030';

let user = {
    email: '',
    password: '333',
    id: '',
    token: ''
}

let eventId = ``

let eventObj = {
    "author": "Random Author",
    "date": "24.06.2024",
    "title": "random_title_123456",
    "description": "random_description_534554",
    "imageUrl": "../../images/profilePic.png"
}

QUnit.module('User functionality', async (assert) =>{
    QUnit.test('valid registration test', async (assert) =>{
        let random = Math.floor(Math.random() * 10000)
        user.email = `user${random}@yahoo.com`
        let path = '/users/register'
        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        let jsonResponse = await response.json()

        assert.ok(response.ok, 'response is successful')
        assert.ok(jsonResponse.hasOwnProperty('accessToken'), 'Property accessToken exists')
        assert.ok(jsonResponse.hasOwnProperty('email'), 'email accessToken exists')
        assert.ok(jsonResponse.hasOwnProperty('password'), 'password accessToken exists')
        assert.ok(jsonResponse.hasOwnProperty('_createdOn'), '_createdOn accessToken exists')
        assert.ok(jsonResponse.hasOwnProperty('_id'), '_id accessToken exists')

        // updating the userId, token & setting sessionStorage.
          user.id = jsonResponse._id
          user.token = jsonResponse.accessToken
          sessionStorage.setItem('user', JSON.stringify(user));
    })

    QUnit.test('valid login test', async (assert) =>{
        let path = '/users/login'

        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(user)
        })

        let jsonResponse = await response.json();
        assert.ok(response.ok, 'response is successful')
        assert.ok(jsonResponse.hasOwnProperty('accessToken'), 'Property accessToken exists')
        assert.ok(jsonResponse.hasOwnProperty('email'), 'email accessToken exists')
        assert.ok(jsonResponse.hasOwnProperty('password'), 'password accessToken exists')
        assert.ok(jsonResponse.hasOwnProperty('_createdOn'), '_createdOn accessToken exists')
        assert.ok(jsonResponse.hasOwnProperty('_id'), '_id accessToken exists')

        // updating the userId, token & setting sessionStorage.
          user.id = jsonResponse._id
          user.token = jsonResponse.accessToken
          sessionStorage.setItem('user', JSON.stringify(user));
    })
})

QUnit.module('Event functionalities', () =>{
    QUnit.test('Get all events', async (assert) =>{

        let path = '/data/theaters?sortBy=_createdOn%20desc&distinct=title'

        let response = await fetch(baseUrl + path)
        let jsonResponse = await response.json();

        assert.ok(response.ok, 'res successfull')
        assert.ok(Array.isArray(jsonResponse), 'jsonResponse is an Array')

        jsonResponse.forEach(ele => {
            assert.ok(ele.hasOwnProperty('author'))
            assert.ok(ele.hasOwnProperty('date'))
            assert.ok(ele.hasOwnProperty('description'))
            assert.ok(ele.hasOwnProperty('imageUrl'))
            assert.ok(ele.hasOwnProperty('title'))
            assert.ok(ele.hasOwnProperty('_createdOn'))
            assert.ok(ele.hasOwnProperty('_id'))
            assert.ok(ele.hasOwnProperty('_ownerId'))
        });

      
    })
    
    QUnit.test('Create event', async (assert) =>{
        let path = '/data/theaters?sortBy=_createdOn%20desc&distinct=title'

        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers:{
                 'content-type': 'application/json',
                 'X-Authorization': user.token
            },
            body: JSON.stringify(eventObj)
        })
        
        let jsonResponse = await response.json();
        assert.ok(response.ok)

        assert.ok(jsonResponse.hasOwnProperty('author'))
        assert.ok(jsonResponse.hasOwnProperty('date'))
        assert.ok(jsonResponse.hasOwnProperty('title'))
        assert.ok(jsonResponse.hasOwnProperty('description'))
        assert.ok(jsonResponse.hasOwnProperty('imageUrl'))
        assert.ok(jsonResponse.hasOwnProperty('_id'))
        assert.ok(jsonResponse.hasOwnProperty('_createdOn'))

        eventId = jsonResponse._id;

    })

    QUnit.test('Update event', async (assert) =>{
        let path = `/data/theaters/${eventId}`

        let newValue = 'ARE WE'
        eventObj.title = newValue

        let response = await fetch(baseUrl + path, {
            method: 'PUT',
            headers:{
                'content-type': 'application/json',
                'X-Authorization' : user.token
            },
            body: JSON.stringify(eventObj)
        })

        let jsonResponse = await response.json()

        assert.ok(response.ok)
        assert.equal(jsonResponse.title, newValue, 'Match in expected updated value')
        assert.ok(jsonResponse.hasOwnProperty('author'))
        assert.ok(jsonResponse.hasOwnProperty('date'))
        assert.ok(jsonResponse.hasOwnProperty('description'))
        assert.ok(jsonResponse.hasOwnProperty('imageUrl'))
        assert.ok(jsonResponse.hasOwnProperty('title'))
        assert.ok(jsonResponse.hasOwnProperty('_createdOn'))
        assert.ok(jsonResponse.hasOwnProperty('_id'))
        assert.ok(jsonResponse.hasOwnProperty('_ownerId'))
        assert.ok(jsonResponse.hasOwnProperty('_updatedOn'))

    })

    QUnit.test('DELETE event', async (assert) =>{
        let path = `/data/theaters/${eventId}`

        let response = await fetch(baseUrl + path, {
            method: 'DELETE',
            headers:{
                'X-Authorization': user.token
            }
        })
        
        assert.ok(response.ok)
    })

})