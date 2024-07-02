const { describe, test, beforeEach, afterEach, beforeAll, afterAll, expect, assert } = require('@playwright/test')
const { chromium } = require('playwright') 

const host = 'http://localhost:3000'

let browser;
let page;
let context;

let endpoints = {
    login: '/users/login',
    register: '/users/register'
}

let user = {
    'email': '',
    'password': '123456',
    'confirmPass': '123456'
};

describe("e2e tests", () => {
    beforeAll(async () =>{
        browser = await chromium.launch();
    })
    afterAll(async () =>{
        await browser.close()
    })
    beforeEach(async () =>{
        context = await browser.newContext()
        page = await browser.newPage();
    })
    afterEach(async () =>{
        await context.close();
        await page.close();
    })


    describe('Registration', () =>{
        test('register with valid data', async () =>{
            
            let random = Math.floor(Math.random() * 10000)
            user.email = `Genadi${random}@yahoo.com`

            await page.goto(host)
            await page.locator('#guest > a:nth-child(2)').click()
            await page.waitForSelector('#register')
            await page.locator('#email').fill(user.email)
            await page.locator('#register-password').fill(user.password)
            await page.locator('#confirm-password').fill(user.confirmPass)

            let [respone] = await Promise.all([
                page.waitForResponse(res => res.url().includes(endpoints.register) && res.status() === 200),
                page.click('[type="submit"]')
            ])

            let userData = await respone.json();
            await expect(respone.ok()).toBeTruthy();
            
        })

        test('login with valid data', async () =>
        {
            await page.goto(host);
            await page.click('#guest > a:nth-child(1)')
            await page.waitForSelector('#login')
          //  await page.waitForURL('http://localhost:3000/login')
            await page.locator('#email').fill(user.email)
            await page.locator('#login-password').fill(user.password)
            console.log(user.email);


            let [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes(endpoints.login) && res.status() === 200),
                page.click('[type="submit"]'),
            ])
            
            let jsonResponse = await response.json()
            expect(response.ok()).toBeTruthy
        })
    })
});