import {test, expect, selectors} from '@playwright/test';
import {baseUrl, TEST_URL} from '../utils/constants.js'
import {NAVBAR, credentials, LOGIN_FORM, LOGGED_IN_MENU, CAT_URL} from '../utils/locators.js'
import * as LOCATORS from '../utils/locators.js'

const url = 'http://localhost:3000';

test('allBooks example2', async ({page}) => {
    await page.goto(baseUrl)
    await expect(page.locator(LOCATORS.NAVBAR.NAV_NAVBAR)).toBeVisible();
    await expect(page.locator(NAVBAR.ALL_BOOKS_LINK)).toBeVisible();
})

// Navigation
test('allBooks is visible', async ({page}) =>{
    await page.goto(url);
    const allBookslink = await page.$('#container #site-header .navbar .navbar-dashboard a[href*="/catalog"]');
    const allBookslinkTextContent = await page.$eval('#container #site-header .navbar .navbar-dashboard a[href*="/catalog"]', el => el.textContent)
    const isVisible = await allBookslink.isVisible()
    expect(isVisible).toBeTruthy
    expect(isVisible).toBe(true)
    expect(allBookslinkTextContent).toEqual('All Books')
})

test('verify that Login button is visible', async ({page}) =>{
    await page.goto(url)
    const button = await page.$('a[href*="login"]')
    const isVisible = await button.isVisible()
    expect(isVisible).toBe(true);
})

test('verify that register button is visible', async ({page}) =>{
    await page.goto(url);
    const button = await page.$('a[href*="register"]')
    const buttonContent = await page.$eval('a[href*="register"]', el => el.textContent)
    const isVisible = await button.isVisible()
    expect(isVisible).toBe(true)
    expect(buttonContent).toEqual('Register')
})

test('Successfull login with valid credentials', async ({page}) =>{
    await page.goto(url)
    await page.click('a[href*="login"]')
    await page.fill('#email', 'asd')
    await page.fill('#password', 'asd')
    // await page.click('#login-form > fieldset > input')
    // await page.click('#site-content #login-page .button submit')
    await page.click('.button.submit')
    const userInfo = await page.$('#user > span')
    const userInfoContent = await page.$eval('#user > span', el => el.textContent)
    const isVisible = await userInfo.isVisible();
    expect(isVisible).toBe(true)
    expect(userInfoContent).toEqual('Welcome, asd')  
})

test('"all books" link is valid after login', async ({page}) =>{
    await page.goto(url)
    await page.click('a[href*="login"]')
    await page.fill('#email', 'test@abv.bg')
    await page.fill('#password', 'test')
    await page.click('.button.submit')
    // const allBooks = await page.$('#site-header > nav > section > a')
    const allBooks = await page.$('a[href*="/catalog"]')
    const isVisible = await allBooks.isVisible()
    expect(isVisible).toBe(true)
})

test('Login with empty input fields', async ({page}) =>{
    await page.goto(url);
    await page.click('#guest > a:nth-child(1)')
    await page.click('#login-form > fieldset > input')
   

})

test('Verify All books is visible after login', async ({page}) =>{
    await page.goto(baseUrl);
    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible();
    await page.locator(NAVBAR.LOGIN_BUTTON).click();
    await page.locator(LOCATORS.LOGIN_FORM.EMAIL).fill(LOCATORS.credentials.EMAIL)
    await page.locator(LOCATORS.LOGIN_FORM.PASSWORD).fill(LOCATORS.credentials.PASSWORD)
    await page.locator(LOCATORS.LOGIN_FORM.LOGIN_BUTTON).click();
    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    //expect(page.locator(LOCATORS.NAVBAR.ALL_BOOKS_LINK)).toBeVisible();
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);
    await expect(page.locator(LOCATORS.NAVBAR.ALL_BOOKS_LINK)).toBeVisible();
})

test.only('Login with empty input fields, example 2 NOT WORKING', async ({ page }) => {
    await page.goto(baseUrl); 
    await page.locator(LOCATORS.NAVBAR.LOGIN_BUTTON).click();
    page.on('dialog', async dialog =>{

        expect(dialog.type()).toContain('alert')
        expect(dialog.message()).toContain('All fields are required!')

        await dialog.dismiss();

    })
    await page.locator('#login-form > fieldset > input').click();
    await page.waitForURL(TEST_URL.TEST_LOGIN_URL)
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL)
});

test('Login with empty input fields, example 3', async ({ page }) => {
    await page.goto(baseUrl);
    await page.locator(LOCATORS.NAVBAR.LOGIN_BUTTON).click();
 
    page.on('dialog', async dialog => {

        expect(dialog.type()).toContain('alert'); // Това е грешно и трябва да бъде променено
        expect(dialog.message()).toContain('All fields are required!'); // Това е грешно и трябва да бъде променено
 
        await dialog.dismiss(); // Затваряме диалога, за да продължим теста
    });
 
    // Тук трябва да се добавят някакви действия, които задействат диалога
    await page.click('#login-form > fieldset > input');
 
    // Проверете дали правилната страница се зарежда след диалога
    await page.waitForURL(TEST_URL.TEST_LOGIN_URL);
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL);
}); 


test('Add book with correct data', async ({page}) =>{

    await page.goto(baseUrl)
    await page.click(NAVBAR.LOGIN_BUTTON)
    await page.fill(LOGIN_FORM.EMAIL, credentials.EMAIL)
    await page.fill(LOGIN_FORM.PASSWORD, credentials.PASSWORD)
    await page.click(LOGIN_FORM.LOGIN_BUTTON)
    await page.click('a[href="/create"]')

    await page.fill('#title', 'myBookTitle')
    await page.fill('#description', 'myBookDescr')
    await page.fill('#image', 'https://media.istockphoto.com/id/467923438/photo/silly-dog-tilts-head-in-front-of-barn.jpg?s=1024x1024&w=is&k=20&c=9H80IiVbNtbriSafDQhU2JqxaxeRK2-Wkdb6_LMiAJM=')
    await page.selectOption('#type', 'Mistery')
    await page.locator('#create-form > fieldset > input').click();
    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL)

    const listItem = page.locator('#dashboard-page > ul > li:nth-child(1)')
    expect(page.locator('#dashboard-page > ul > li:nth-child(1)')).toBeVisible()
    
    const h3Text = await listItem.locator('h3').innerText();
    const pText = await listItem.evaluate(el => el.querySelector('p').textContent);

    expect(h3Text).toBe('myBookTitle')
    expect(pText).toBe('Type: Mistery')
})

test('Add book with empty title field GPT', async ({ page }) => {
    // Set up dialog event listener
    let dialogTriggered = false;
    let dialogType, dialogMessage;
  
    page.on('dialog', async dialog => {
      dialogTriggered = true;
      dialogType = dialog.type();
      dialogMessage = await dialog.message(); // Ensure to await the message retrieval
      await dialog.accept();
    });
  
    // Navigate and perform actions
    await page.goto(TEST_URL.TEST_HOME_URL);
    await page.locator(LOCATORS.NAVBAR.LOGIN_BUTTON).click();
    await page.waitForURL(TEST_URL.TEST_LOGIN_URL);
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL);
  
    await page.locator(LOCATORS.LOGIN_FORM.EMAIL).fill(credentials.EMAIL);
    await page.locator(LOCATORS.LOGIN_FORM.PASSWORD).fill(credentials.PASSWORD);
    await page.locator(LOCATORS.LOGIN_FORM.LOGIN_BUTTON).click();
    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);
  
    await page.locator(LOCATORS.LOGGED_IN_MENU.ADDBOOK).click();
    await page.waitForURL(TEST_URL.TEST_CREATE_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CREATE_URL);
  
    await page.locator(LOCATORS.LOGGED_IN_MENU.DESCRIPTION).fill('TheCrazyCatAdam');
    await page.locator(LOCATORS.LOGGED_IN_MENU.IMAGE).fill(CAT_URL.URL);
    await page.locator(LOCATORS.LOGGED_IN_MENU.TYPE).selectOption(LOCATORS.LOGGED_IN_MENU.SELECT_OPTION.MYSTERY);
    await page.locator(LOCATORS.LOGGED_IN_MENU.CREATE_BOOK_BUTTON).click();
  
    // Ensure dialog event was triggered and validate its type and message
    expect(dialogTriggered).toBe(true);
    expect(dialogType).toContain('alert');
    expect(dialogMessage).toContain('All fields are required!');
  });  

test('Verify logout button is vissible after login', async ({page}) =>{
    await page.goto(TEST_URL.TEST_LOGIN_URL);
    await page.locator(LOCATORS.LOGIN_FORM.EMAIL).fill(credentials.EMAIL)
    await page.locator(LOCATORS.LOGIN_FORM.PASSWORD).fill(credentials.PASSWORD);
    await page.locator(LOCATORS.LOGIN_FORM.LOGIN_BUTTON).click();
    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);
    await expect(page.locator(LOGGED_IN_MENU.LOGOUT_BUTTON)).toBeVisible()
})
