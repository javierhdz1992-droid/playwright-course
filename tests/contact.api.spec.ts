import { test, expect, APIRequestContext, APIResponse } from '@playwright/test';
import ContactPage from '../pages/contact.page';
import apiController from '../controller/api.controller';


test.describe('Contact', () => {
    let contactPage: ContactPage;
    let fakerApi: APIRequestContext;
    let randomPerson: APIResponse;

    test.beforeAll(async ({ playwright }) => {
        await apiController.init();
        randomPerson = await apiController.getUsers();
        const newUserTodo = await apiController.createUserTodo();
        console.log(newUserTodo);
    });

    test('Fill contact Form and verify success message', async ({ page }) => {
        contactPage = new ContactPage(page);
        // Open url
        //await page.goto('https://practice.sdetunicorns.com/contact/')

        await contactPage.navigate();

        await page.pause();


        //await page.pause();

        /*
        // Fill out the input fields
        await page.locator('.contact-name input').fill('Test Name')
        await page.locator('.contact-email input').fill('test@mail.com')
        await page.locator('.contact-phone input').fill('134567864')
        await page.locator('.contact-message textarea').fill('This is a text message')

        // Add a soft assertion
        //await expect.soft(page.locator('.contact-message textarea')).toHaveText('Fail test message')

        // Click submit
        await page.locator('button[type=submit]').click()
        */

        //fill out the input fields and submit
        //await contactPage.submitForm('Test Name', 'test@mail.com', '134567864', 'Hello!, this is taking advantage of POM');
        //await contactPage.submitForm(faker.name.findName(), faker.internet.email(), faker.phone.number(), faker.lorem.paragraphs(2));
        //Even It shows error message, code is working fine using randomPerson.
        await contactPage.submitForm(randomPerson['name'], randomPerson['email'], randomPerson['phone'], randomPerson['website']);

        //expect(test.info().errors.length).toBeLessThan(1)

        // Verify success message
        await expect(contactPage.successTxt).toHaveText('Thanks for contacting us! We will be in touch with you shortly')
        console.log(await contactPage.successTxt.textContent())
    });
    
});


