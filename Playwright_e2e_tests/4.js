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
        test('User register', async () =>{
            await page.goto(host)
            let registerEndpoint = '/users/register'
            let random = Math.floor(Math.random() * 10000)
            user.email = `emailHere${random}@yahoo.com`

            await page.click('a[href="/register"]')
            await page.waitForSelector('form fieldset')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)    
            await page.locator('#repeat-pass').fill(user.confirmPass)   

            let [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes(registerEndpoint) && res.status() === 200),
                page.locator('#register-form > fieldset > input').click()
            ])

            expect(response.ok()).toBeTruthy();
            let jsonResponse = await response.json();

            expect(jsonResponse.email).toStrictEqual(user.email)
            expect(jsonResponse.password).toStrictEqual(user.password)
        })

        test('User login', async() =>{
            await page.goto(host)
            await page.locator('a[href="/login"]').click();
            await page.waitForSelector('#login-form')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)
            
            let [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes('/users/login') && res.status() === 200),
                page.locator('#login-form > fieldset > input').click()
            ]);

            expect(response.ok()).toBeTruthy()
            
            let jsonResponse = await response.json();

            expect(jsonResponse.email).toStrictEqual(user.email)
            expect(jsonResponse.password).toStrictEqual(user.password)

        })

        test('User Logout', async() =>{
            await page.goto(host)
            await page.locator('a[href="/login"]').click();
            await page.waitForSelector('#login-form')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)
            
            await Promise.all([
                page.waitForResponse(res => res.url().includes('/users/login') && res.status() === 200),
                page.locator('#login-form > fieldset > input').click()
           ])

            await page.waitForSelector('.navbar')

            let [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes('/users/logout') && res.status() === 204),
                page.locator('a[href="/logout"]').click() 
            ])

            expect(response.ok()).toBeTruthy()

            await page.waitForURL(host)
            expect(page.url()).toBe(host + '/')
        })
        
    })

    describe("navbar", () => {
        test('NAVBAR for logged users', async() =>{
            await page.goto(host)
            await page.locator('a[href="/login"]').click();
            await page.waitForSelector('#login-form')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)
            
            await Promise.all([
                page.waitForResponse(res => res.url().includes('/users/login') && res.status() === 200),
                page.locator('#login-form > fieldset > input').click()
            ])

            await page.waitForSelector('.navbar')

            await Promise.all([
                expect(page.locator('a[href="/mybooks"]')).toBeVisible(),
                expect(page.locator('a[href="/create"]')).toBeVisible(),
                expect(page.locator('a[href="/logout"]')).toBeVisible(),
    
                expect(page.locator('a[href="/login"]')).toBeHidden(),
                expect(page.locator('a[href="/register"]')).toBeHidden()
            ])

        })

        test('NAVBAR for guest users', async () =>{
            await page.goto(host)

            await page.waitForSelector('.navbar')

            await Promise.all([
                expect(page.locator('a[href="/mybooks"]')).toBeHidden(),

                expect(page.locator('a[href="/create"]')).toBeHidden(),
                expect(page.locator('a[href="/logout"]')).toBeHidden(),
    
                expect(page.locator('a[href="/login"]')).toBeVisible(),
                expect(page.locator('a[href="/register"]')).toBeVisible()
            ])
        })
        
    });

    describe("CRUD", () => {
        test('Create Book', async () =>{
            await page.goto(host)
            await page.locator('a[href="/login"]').click();
            await page.waitForSelector('#login-form')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)
            
            await Promise.all([
                page.waitForResponse(res => res.url().includes('/users/login') && res.status() === 200),
                page.locator('#login-form > fieldset > input').click()
            ])

            await page.waitForSelector('.navbar')
            await page.locator('a[href="/create"]').click()
            await page.waitForSelector('#create-page')
            await page.locator('#title').fill('sampleTitle')
            await page.locator('#description').fill('sampleDescr')
            await page.locator('#image').fill('/images/heart.png')
            await page.locator('#type').selectOption('Other')

            let [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes('/data/books') && res.status() === 200),
                page.locator('input[value="Add Book"]').click()
            ])
           
            expect(response.ok()).toBeTruthy();
        })

        test('Edit book', async() =>{
            await page.goto(host)
            await page.locator('a[href="/login"]').click();
            await page.waitForSelector('#login-form')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)
            
            await Promise.all([
                page.waitForResponse(res => res.url().includes('/users/login') && res.status() === 200),
                page.locator('#login-form > fieldset > input').click()
            ])

            await page.waitForSelector('#user > a:nth-child(2)')
            await page.locator('#user > a:nth-child(2)').click();
            await page.waitForSelector('#my-books-page > ul')
            await page.locator('.my-books-list .otherBooks .button').first().click();
            await page.waitForSelector('#details-page')
            await page.locator('#details-page > div.book-information > div > a:nth-child(1)').click();
            await page.waitForSelector('#edit-page')
            await page.locator('#description').fill('EdiTTT')

            let [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes('/data/books') && res.status() === 200),
                page.locator('.button.submit').click()
            ]);

            expect(response.ok()).toBeTruthy();
            let jsonResponse = await response.json();
            expect(jsonResponse.description).toStrictEqual('EdiTTT')
        })

        test('DELETE Book', async() =>{
            await page.goto(host)
            await page.locator('a[href="/login"]').click();
            await page.waitForSelector('#login-form')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)
            
            await Promise.all([
                page.waitForResponse(res => res.url().includes('/users/login') && res.status() === 200),
                page.locator('#login-form > fieldset > input').click()
            ])

            await page.waitForSelector('#user > a:nth-child(2)')
            await page.locator('#user > a:nth-child(2)').click();
            await page.waitForSelector('#my-books-page > ul')
            await page.locator('.my-books-list .otherBooks .button').first().click();
            await page.waitForSelector('#details-page')
            let [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes('/data/books') && res.status() === 200),
                page.locator('#details-page > div.book-information > div > a:nth-child(2)').click()
            ])

            expect(response.ok()).toBeTruthy();
        })
    })
})