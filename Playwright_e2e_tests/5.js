const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)

let browser;
let context;
let page;

let user = {
    username : "",
    email : "",
    password : "123456",
    confirmPass : "123456",
};

let meme = {
    id: ""
}

describe("e2e tests", () => {
    beforeAll(async () => {
        browser = await chromium.launch();
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });

    
    describe("authentication", () => {
        test('Registration with valid data makes corect API call', async () =>{
            let random = Math.floor(Math.random() * 10000)
            user.username = `user${random}`
            user.email = `email${random}@yahoo.com`

            await page.goto(host)
            await page.click('.profile a[href="/register"]')
            await page.waitForSelector('#register-form')
            await page.locator('#username').fill(user.username)
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)
            await page.locator('#repeatPass').fill(user.confirmPass)
            await page.click('#female')

            let [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes('/users/register') && res.status() === 200),
                page.click('#register-form > div > input.registerbtn.button')
            ])

            let userData = await response.json();

           expect(response.ok()).toBeTruthy();
           expect(userData).toHaveProperty('username')       
           expect(user.username).toEqual(userData.username)      
        })

        test('Login with valid data makes correct API call', async () =>{
            let pathParams = 'users/login'
            await page.goto(host);
            await page.locator('#container > nav > div > div > a:nth-child(1)').click();
            //#container > nav > div > div > a:nth-child(1)         a[href="/login"]
            await page.waitForSelector('#login')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)

            let [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes(pathParams) && res.status() === 200),
                page.click('#login-form > div > input.registerbtn.button')
            ])

            let jsonResponse = await response.json();

            expect(response.ok()).toBeTruthy();
            expect(jsonResponse).toHaveProperty('username')
            expect(jsonResponse.username).toEqual(user.username)
        })

        test('Logout makes correct API call', async () =>{

            let loginEndPoint = 'users/login'
            await page.goto(host);
            await page.locator('#container > nav > div > div > a:nth-child(1)').click();
            //#container > nav > div > div > a:nth-child(1)         a[href="/login"]
            await page.waitForSelector('#login')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)

            let [loginResponse] = await Promise.all([
                page.waitForResponse(res => res.url().includes(loginEndPoint) && res.status() === 200),
                page.click('#login-form > div > input.registerbtn.button')
            ])


            let logoutEndPoint = '/users/logout'

            let [logOutResponse] = await Promise.all([
                page.waitForResponse(res => res.url().includes(logoutEndPoint) && res.status() === 204),
                page.locator('nav .user .profile a[href="/logout"]').click()
            ])

            expect(logOutResponse.ok()).toBeTruthy()
        })
    });

    describe("navbar", () => {
        test('Navigation for logged in users', async () =>{
            let pathParams = 'users/login'
            await page.goto(host);
            await page.locator('#container > nav > div > div > a:nth-child(1)').click();
            //#container > nav > div > div > a:nth-child(1)         a[href="/login"]
            await page.waitForSelector('#login')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)

            let [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes(pathParams) && res.status() === 200),
                page.click('#login-form > div > input.registerbtn.button')
            ])

            await page.waitForSelector('nav')
            await expect(page.locator('nav')).toBeVisible();
            await expect(page.locator('nav a[href="/catalog"]')).toBeVisible();
            await expect(page.locator('nav a[href="/catalog"]')).toBeVisible();
            await expect(page.locator('nav .user .profile span')).toBeVisible();
            await expect(page.locator('nav .user a:nth-child(1)')).toBeVisible();
            
            //setting the content text
            let actualResult = await page.locator('nav .user .profile span').textContent()
            let expectedResult = `Welcome, ${user.email}`

            expect(actualResult).toEqual(expectedResult)
        })

        test('Navigation for guest user', async () =>{
            await page.goto(host);
            await page.waitForSelector('nav')
            await expect(page.locator('nav')).toBeVisible();
            await expect(page.locator('nav a[href="/catalog"]')).toBeVisible();
            await expect(page.locator('nav a[href="/login"]')).toBeVisible();
            await expect(page.locator('nav a[href="/register"]')).toBeVisible();
            await expect(page.locator('.active')).toBeVisible();
            await expect(page.locator('nav .user .profile span')).toBeHidden(); // Hidden for non logged users
            await expect(page.locator('#container > nav > div > div > a:nth-child(3)')).toBeHidden(); // Hidden for non logged users
        })
    });

    describe("CRUD", () => {
        test('Create a MEME', async () =>{
            let pathParams = 'users/login'
            await page.goto(host);
            await page.locator('#container > nav > div > div > a:nth-child(1)').click();
            //#container > nav > div > div > a:nth-child(1)         a[href="/login"]
            await page.waitForSelector('#login')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)

            await Promise.all([
                page.waitForResponse(res => res.url().includes(pathParams) && res.status() === 200),
                page.click('#login-form > div > input.registerbtn.button')
            ])

            await page.locator('a[href="/create"]').click()
            await page.waitForSelector('.container')
            await page.locator('#title').fill(`testTitle`)
            await page.locator('#description').fill(`testdescription`)
            await page.locator('#imageUrl').fill('../images/1.png')
            
            let [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes('/data/memes') && res.status() === 200,
                page.click('#create-form > div > input.registerbtn.button')
            )]);

            let jsonResponse = await response.json();

            expect(response.ok()).toBeTruthy();
            expect(jsonResponse).toHaveProperty('_ownerId')
            expect(jsonResponse).toHaveProperty('title')
            expect(jsonResponse).toHaveProperty('description')
            expect(jsonResponse).toHaveProperty('imageUrl')
            expect(jsonResponse).toHaveProperty('_createdOn')
            expect(jsonResponse).toHaveProperty('_id')

            expect(jsonResponse.title).toEqual(`testTitle`)
            expect(jsonResponse.imageUrl).toEqual('../images/1.png')
            expect(jsonResponse.description).toEqual(`testdescription`)

            meme.id = jsonResponse._id;
        })

        test('Edit a MEME', async () =>{
            let pathParams = 'users/login'
            let newTitle = 'UpdateD';
            await page.goto(host);
            await page.locator('#container > nav > div > div > a:nth-child(1)').click();
            //#container > nav > div > div > a:nth-child(1)         a[href="/login"]
            await page.waitForSelector('#login')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)

            await Promise.all([
                page.waitForResponse(res => res.url().includes(pathParams) && res.status() === 200),
                page.click('#login-form > div > input.registerbtn.button')
            ])

            await page.waitForSelector('#container')
            await page.locator('#meme-feed #memes .card #data-buttons').nth(0).click();
            await page.waitForSelector('#container')
            await page.locator('a[class="button warning"]').click();
            await page.waitForSelector('#edit-meme');
            await page.locator('#title').fill(newTitle)

            let [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes('/data/memes') && res.status() === 200),
                page.click('#edit-form > div > input.registerbtn.button')
            ])

            let jsonResponse = await response.json();

            console.log(user.email);
            console.log(jsonResponse);

            expect(response.ok()).toBeTruthy();
            expect(jsonResponse).toHaveProperty('title')
            expect(jsonResponse.title).toEqual(newTitle)
            //            await page.waitForSelector('#meme-details > div');
            meme.id = jsonResponse._id;

        })

        test('DELETE a MEME', async () =>{
            let pathParams = 'users/login'
            await page.goto(host);
            await page.locator('#container > nav > div > div > a:nth-child(1)').click();
            //#container > nav > div > div > a:nth-child(1)         a[href="/login"]
            await page.waitForSelector('#login')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)

            await Promise.all([
                page.waitForResponse(res => res.url().includes(pathParams) && res.status() === 200),
                page.click('#login-form > div > input.registerbtn.button')
            ])

            await page.waitForSelector('#container > nav')
            await page.locator('#container > nav > div > div > a:nth-child(2)').click();
            await page.waitForSelector('#user-profile-page')
            await page.locator('//*[@id="container"]/nav/div/div/a[1]').click();
            await page.waitForSelector('#container #user-profile-page > div')
            await page.locator('#user-profile-page > div > div > a').click()
            await page.waitForSelector('#container')
            

            let [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes('/data/memes') && res.status() === 200),
                page.locator('#meme-details > div > div.meme-description > button').click()
            ]);

            console.log(response);
            expect(response.ok).toBeTruthy()
        })
    });
});