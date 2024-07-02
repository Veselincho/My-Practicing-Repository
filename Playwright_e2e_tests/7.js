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


let albumName = "";


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
        test('Registration makes correct api call', async() =>{
            let random = Math.floor(Math.random() * 10000)
            user.email = `emailHere${random}@yahoo.com`
            let registerEndpoint = '/users/register'

            await page.goto(host)
            await page.waitForSelector('nav')
            await page.locator('a[href="/register"]').click()
            await page.waitForSelector('form')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)
            await page.locator('#conf-pass').fill(user.confirmPass)

            let [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes(registerEndpoint) & res.status() === 200),
                page.locator('#registerPage > form > fieldset > button').click()
            ])

            expect(response.ok()).toBeTruthy();

            let jsonResponse = await response.json();
            expect(jsonResponse.email).toStrictEqual(user.email)
            expect(jsonResponse.password).toStrictEqual(user.password)

        })

        test('Login makes correct api call', async() =>{
            let loginEndpoint = '/users/login'
            
            await page.goto(host)
            await page.waitForSelector('nav')
            await page.locator('a[href="/login"]').click()
            await page.waitForSelector('form')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)

            let [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes(loginEndpoint) & res.status() === 200,
                page.locator('#loginPage > form > fieldset > button').click()
            )])

            expect(response.ok()).toBeTruthy();

            let jsonResponse = await response.json();
            expect(jsonResponse.email).toStrictEqual(user.email)
            expect(jsonResponse.password).toStrictEqual(user.password)
        })

        test('Logout makes correct API call', async() =>{
            let loginEndpoint = '/users/login'
            let logoutEndpoint = '/users/logout'
            
            await page.goto(host)
            await page.waitForSelector('nav')
            await page.locator('a[href="/login"]').click()
            await page.waitForSelector('form')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)

            await Promise.all([
                page.waitForResponse(res => res.url().includes(loginEndpoint) & res.status() === 200,
                page.locator('#loginPage > form > fieldset > button').click()
            )])

            await page.waitForSelector('nav')
            
            let [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes(logoutEndpoint) & res.status() === 204,
                page.locator('a[href="/logout"]').click())
            ])

            expect(response.ok()).toBeTruthy();
            await page.waitForURL(host)
            expect(page.url()).toBe(host + '/')
        })
        
    });

    describe("navbar", () => {
        test('NAVBAR elements appearance for Logged in users', async() =>{
            //login
            let loginEndpoint = '/users/login'
            
            await page.goto(host)
            await page.waitForSelector('nav')
            await page.locator('a[href="/login"]').click()
            await page.waitForSelector('form')
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)

            await Promise.all([
                page.waitForResponse(res => res.url().includes(loginEndpoint) & res.status() === 200,
                page.locator('#loginPage > form > fieldset > button').click()
            )])

            await page.waitForSelector('nav')

            await expect(page.locator('#box > header > nav > a')).toBeVisible()
            await expect(page.locator('a[href="/catalog"]')).toBeVisible()
            await expect(page.locator('a[href="/search"]')).toBeVisible()
            await expect(page.locator('a[href="/create"]')).toBeVisible()
            await expect(page.locator('a[href="/logout"]')).toBeVisible()

            await expect(page.locator('a[href="/login"]')).toBeHidden()
            await expect(page.locator('a[href="/register"]')).toBeHidden()
        })

        test('NAVBAR element appearance for guest users', async() =>{
            await page.goto(host)
            await page.waitForSelector('nav')

            
            await expect(page.locator('#box > header > nav > a')).toBeVisible()
            await expect(page.locator('a[href="/catalog"]')).toBeVisible()
            await expect(page.locator('a[href="/search"]')).toBeVisible()
            await expect(page.locator('a[href="/login"]')).toBeVisible()
            await expect(page.locator('a[href="/register"]')).toBeVisible()

            await expect(page.locator('a[href="/create"]')).toBeHidden()
            await expect(page.locator('a[href="/logout"]')).toBeHidden()

        })
    });

    describe("CRUD", () => {
        test('Create an ALBUM', async() =>{
             //login
             let loginEndpoint = '/users/login'
            
             await page.goto(host)
             await page.waitForSelector('nav')
             await page.locator('a[href="/login"]').click()
             await page.waitForSelector('form')
             await page.locator('#email').fill(user.email)
             await page.locator('#password').fill(user.password)
 
             await Promise.all([
                 page.waitForResponse(res => res.url().includes(loginEndpoint) & res.status() === 200,
                 page.locator('#loginPage > form > fieldset > button').click()
             )])

             await page.waitForSelector('nav')
             await page.locator('a[href="/create"]').click()
             await page.waitForSelector('form')
             await page.locator('#name').fill('AREWE')
             await page.locator('#imgUrl').fill('../../images/back.jpg')
             await page.locator('#price').fill('5')
             await page.locator('#releaseDate').fill('03.03.2023')
             await page.locator('#artist').fill('Geronimo')
             await page.locator('#genre').fill('raggae')
             await page.locator('.description').fill('includes gr8 songs')

             let [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes('/data/albums') & res.status() === 200),
                page.locator('#main-content > section > form > fieldset > div > button').click()
             ])

             expect(response.ok()).toBeTruthy();

             let jsonResponse = await response.json();

             expect(jsonResponse.name).toStrictEqual('AREWE')
             expect(jsonResponse.imgUrl).toStrictEqual('../../images/back.jpg')
             expect(jsonResponse.price).toStrictEqual('5')
             expect(jsonResponse.releaseDate).toStrictEqual('03.03.2023')
             expect(jsonResponse.artist).toStrictEqual('Geronimo')
             expect(jsonResponse.genre).toStrictEqual('raggae')
             expect(jsonResponse.description).toStrictEqual('includes gr8 songs')



        })

        test('Edit an ALBUM', async() =>{
               //login
             let loginEndpoint = '/users/login'

             let random = Math.floor(Math.random() * 10000)
             let randomName = `ime${random}`
            
             await page.goto(host)
             await page.waitForSelector('nav')
             await page.locator('a[href="/login"]').click()
             await page.waitForSelector('form')
             await page.locator('#email').fill(user.email)
             await page.locator('#password').fill(user.password)
 
             await Promise.all([
                 page.waitForResponse(res => res.url().includes(loginEndpoint) & res.status() === 200,
                 page.locator('#loginPage > form > fieldset > button').click()
             )])


             await page.waitForSelector('nav')
             await page.locator('a[href="/search"]').click()
             await page.waitForSelector('.search')
             await page.locator('#search-input').fill('AREWE')
             await page.locator('#searchPage > div.search > button').click()
             await page.waitForSelector('#searchPage > div.search-result > div:nth-child(1)')
             await page.locator('#details').last().click()
             await page.waitForSelector('#detailsPage')
             await page.waitForSelector('#detailsPage > div > div.albumInfo > div.actionBtn > a.edit')
             await page.locator('#detailsPage > div > div.albumInfo > div.actionBtn > a.edit').click()
             
             await page.waitForSelector('.editPage')
             await page.locator('#price').fill('55')

             let [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes('/data/albums') & res.status() === 200,
                page.locator('#main-content > section > form > fieldset > div > button').click())
             ])

             expect(response.ok()).toBeTruthy()
             let jsonResponse = await response.json();

             expect(jsonResponse.price).toStrictEqual('55'), 'MATCH ON THE EDITTED VALUE'
             expect(jsonResponse.name).toStrictEqual('AREWE')
             expect(jsonResponse.imgUrl).toStrictEqual('../../images/back.jpg')
             expect(jsonResponse.releaseDate).toStrictEqual('03.03.2023')
             expect(jsonResponse.artist).toStrictEqual('Geronimo')
             expect(jsonResponse.genre).toStrictEqual('raggae')
             expect(jsonResponse.description).toStrictEqual('includes gr8 songs')

             albumName = 'AREWE'
        })

        test('DELETE Album', async() =>{
                  //login
                  let loginEndpoint = '/users/login'
            
                  await page.goto(host)
                  await page.waitForSelector('nav')
                  await page.locator('a[href="/login"]').click()
                  await page.waitForSelector('form')
                  await page.locator('#email').fill(user.email)
                  await page.locator('#password').fill(user.password)
      
                  await Promise.all([
                      page.waitForResponse(res => res.url().includes(loginEndpoint) & res.status() === 200,
                      page.locator('#loginPage > form > fieldset > button').click()
                  )])
     
                  await page.waitForSelector('nav')
                  await page.locator('#box > header > nav > ul > li:nth-child(2) > a').click()
                  await page.waitForSelector('#searchPage')
                  await page.locator('#search-input').fill(albumName)
                  await page.locator('#searchPage > div.search > button').click()
                  await page.waitForSelector('#main-content')
                  await page.locator('#details').last().click();
                  await page.waitForSelector('#main-content')

                  let [response] = await Promise.all([
                    page.waitForResponse(res => res.url().includes('/data/albums') & res.status() === 200,
                    page.on('dialog', dialog => dialog.accept()),
                    page.locator('#detailsPage > div > div.albumInfo > div.actionBtn > a.remove').click())
                  ])

                 await expect(response.ok()).toBeTruthy();
        })
    });
});