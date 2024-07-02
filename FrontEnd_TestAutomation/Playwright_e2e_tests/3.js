const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)

let browser;
let context;
let page;

let user = {
    email : "",
    password : "123456",
    confirmPass : "123456",
};

let accessToken = ``;
let eventId = ``;

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
        test('registration with valid data makes correct api call', async () =>{
            let endpoint = '/users/register'
            let random = Math.floor(Math.random() * 10000)
            user.email = `email${random}@yahoo.com`
            await page.goto(host);
            await page.click('#container > header > nav > ul > li:nth-child(2) > a')
            await page.waitForSelector('#registerPage > form')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)
            await page.locator('#repeatPassword').fill(user.confirmPass)

            let [response] = await Promise.all([
                 page.waitForResponse(res => res.url().includes(endpoint) && res.status() === 200),
                 page.locator('#registerPage > form > button').click()
            ])
            let jsonResponse = await response.json();

            expect(response.ok()).toBeTruthy()
            
            expect(jsonResponse).toHaveProperty('email')
            expect(jsonResponse).toHaveProperty('password')
            expect(jsonResponse).toHaveProperty('_createdOn')
            expect(jsonResponse).toHaveProperty('_id')
            expect(jsonResponse).toHaveProperty('accessToken')

            expect(jsonResponse.email).toStrictEqual(user.email)
            expect(jsonResponse.password).toStrictEqual(user.password)

       
           accessToken = jsonResponse.accessToken
        })
        
        test(`login makes correct api call`, async () =>{
            let endpoint = '/users/login'
            await page.goto(host)
            await page.waitForSelector('nav')
            await page.click('a[href="/login"]')
            await page.waitForSelector('#loginaPage > form')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)

            let [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes(endpoint) && res.status() === 200),
                page.locator('#loginaPage > form > button').click()
            ])

            let jsonResponse = await response.json();

            expect(response.ok()).toBeTruthy();
            expect(jsonResponse.email).toStrictEqual(user.email)
            expect(jsonResponse.password).toStrictEqual(user.password)

        })

        test('Logout makes correct api call', async () =>{
            let loginEndPoint = '/users/login'
            let logoutEndPoint = '/users/logout'

            await page.goto(host)
            await page.waitForSelector('nav')
            await page.click('a[href="/login"]')
            await page.waitForSelector('#loginaPage > form')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)

           //login
           await Promise.all([
                page.waitForResponse(res => res.url().includes(loginEndPoint) && res.status() === 200),
                page.locator('#loginaPage > form > button').click()
            ])
            
           //logout
            let [response] =  await Promise.all([
                page.waitForResponse(res => res.url().includes(logoutEndPoint) && res.status() === 204),
                page.click('#container > header > nav > ul > li:nth-child(3) > a')
            ])

            await page.waitForURL(host)
            expect(response.ok()).toBeTruthy()
            expect(page.url()).toEqual(host + '/')
            await page.waitForSelector('#container > header > nav > ul > li:nth-child(1) > a')
            await expect(page.locator('#container > header > nav > ul > li:nth-child(1) > a')).toBeVisible();

        })
    });

    describe("navbar", () => {
        test('NAV for logged in users', async () =>{

            let loginEndPoint = '/users/login'

            await page.goto(host)
            await page.waitForSelector('nav')
            await page.click('a[href="/login"]')
            await page.waitForSelector('#loginaPage > form')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)

           //login
           await Promise.all([
                page.waitForResponse(res => res.url().includes(loginEndPoint) && res.status() === 200),
                page.locator('#loginaPage > form > button').click()
            ])

            await page.waitForURL(host)
            await page.waitForSelector('#container > header > nav')
            //hidden
            await expect(page.locator('a[href="/login"]')).toBeHidden();
            await expect(page.locator('a[href="/register"]')).toBeHidden();
            //visible
            await expect(page.locator('a[href="/logout"]')).toBeVisible();
            await expect(page.locator('a[href="/profile"]')).toBeVisible();
            await expect(page.locator('a[href="/"]')).toBeVisible();
            await expect(page.locator('a[href="/create"]')).toBeVisible();
        })

        test('NAVBAR for guest users', async() =>{
            await page.goto(host)
            await page.waitForSelector('#container > header > nav')

              await expect(page.locator('a[href="/login"]')).toBeVisible();
              await expect(page.locator('a[href="/register"]')).toBeVisible();
              await expect(page.locator('a[href="/"]')).toBeVisible();


              await expect(page.locator('a[href="/logout"]')).toBeHidden();
              await expect(page.locator('a[href="/profile"]')).toBeHidden();
              await expect(page.locator('a[href="/create"]')).toBeHidden();
        })
        
    });

    describe("CRUD", () => {
        test('Create event', async () =>{
            let loginEndPoint = '/users/login'
            let createEndPoint = '/data/theaters'

            await page.goto(host)
            await page.waitForSelector('nav')
            await page.click('a[href="/login"]')
            await page.waitForSelector('#loginaPage > form')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)

           //login
           await Promise.all([
                page.waitForResponse(res => res.url().includes(loginEndPoint) && res.status() === 200),
                page.locator('#loginaPage > form > button').click()
            ])

            await page.waitForSelector('#container > header > nav')
            await page.locator('#container > header > nav > ul > li:nth-child(2) > a').click();
            await page.waitForSelector('#createPage > form')
            await page.locator('#title').fill('Zaglavie')
            await page.locator('#date').fill('01 05, 2025')
            await page.locator('#author').fill('zikata')
            await page.locator('#description').fill('testOpisanie')
            await page.locator('#imageUrl').fill('../../images/profilePic.png')

            let [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes(createEndPoint) && res.status() == 200),
                page.locator('#createPage > form > button').click()
            ])

            let jsonResponse = await response.json();

            expect(response.ok()).toBeTruthy();
            expect(jsonResponse.title).toStrictEqual('Zaglavie')
            expect(jsonResponse.date).toStrictEqual('01 05, 2025')
            expect(jsonResponse.author).toStrictEqual('zikata')
            expect(jsonResponse.description).toStrictEqual('testOpisanie')
            expect(jsonResponse.imageUrl).toStrictEqual('../../images/profilePic.png')

            eventId = jsonResponse._id
        })

        test('DELETE EVENT', async () =>{
            let loginEndPoint = '/users/login'
            let deleteEndPoint = '/data/theaters'

            await page.goto(host)
            await page.waitForSelector('nav')
            await page.click('a[href="/login"]')
            await page.waitForSelector('#loginaPage > form')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)

           //login
           await Promise.all([
                page.waitForResponse(res => res.url().includes(loginEndPoint) && res.status() === 200),
                page.locator('#loginaPage > form > button').click()
            ])

            await page.waitForSelector('#container > header > nav')
            await page.locator('#container > header > nav > ul > li:nth-child(1) > a').click();
            await page.locator('#profilePage > div.board > div:nth-child(1) > div > a').click();

            await page.waitForSelector('#detailsBox')

            let [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes(deleteEndPoint) && res.status() == 200),
                page.on('dialog', dialog => dialog.accept()),
                page.locator('#detailsBox > div.details > div > a.btn-delete').click()
            ]);

            expect(response.ok()).toBeTruthy();
        })
    })
})