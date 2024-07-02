const {test, describe, expect} = require('@playwright/test')
const url = 'http://localhost:8080/'

describe('Happy path tests', () => {
  
        test('User can add a task', async ({page}) => {

        // arrange
        await page.goto(url);
        await page.fill('#task-input', 'firstValue')
        //act
        await page.click('#add-task')
        const firstTask = await page.textContent('.task')
        //assert
        expect(firstTask).toContain('firstValue')
        })


        test('User can delete a task', async({page}) =>{
            await page.goto(url)
            await page.fill('#task-input', 'deleteTestText')
            await page.click('#add-task')
            await page.click('.task .delete-task')

            const tasks = await page.$$eval('.task',
                 tasks => tasks.map(task => task.textContent))
            expect(tasks).not.toContain('deleteTestText')  
        })

        test('Test If a User Can Mark a Task as Complete', async({page}) =>{
            await page.goto(url);
            await page.fill('#task-input', 'Proba');
            await page.click('#add-task');
            await page.click('.task .task-complete')
            //setting 
            const completedTasks = await page.$('.task-completed')
            expect(completedTasks).not.toBeNull;
        })

        test('User can filter the tests', async ({page}) =>{
            await page.goto(url)
            await page.fill('#task-input', `completedTask`)
            await page.click('#add-task')

            //mark as complete
            await page.click('#task-list .task .task-complete')

            //filter
            await page.selectOption('#filter', `Completed`)

            const incompleteTask = await page.$('.task:not(-completed)')
            expect(incompleteTask).toBeNull;
        })
    })