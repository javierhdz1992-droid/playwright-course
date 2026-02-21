import { test, expect} from '@playwright/test';
import CartPage from '../pages/cart.page';
const path = require('path');

test.describe('Upload File', () => {
    let cartPage: CartPage;

    const fileName = ['Automation_Logo.png', 'Test.pdf'];

    for (const name of fileName) {
      test(`should upload a ${name} file`, async ({ page }) => {

        // Open url
        await page.goto('https://practice.sdetunicorns.com/cart/');

        // Store test file path
        const filePath = path.join(__dirname, `../data/${name}`);

        // Upload test file
        await page.setInputFiles('input#upfile_1', filePath);

        // Click the submit button
        await page.locator('#upload_1').click();

        // Assertion
        await expect(page.locator('#wfu_messageblock_header_1_1')).toContainText('uploaded successfully', {timeout: 10000});
      })
    }

    test('Should upload a test file', async ({ page }) => {
      cartPage = new CartPage(page);
      
      //Open URL
      await page.goto('https://practice.sdetunicorns.com/cart/');
      
      // Store test file path
      const filePath = path.join(__dirname, '../data/Automation_Logo.png');

      /*
      // Upload test file
      await page.setInputFiles('input#upfile_1', filePath);

      // Click the submit button
      await page.locator('#upload_1').click();
      */

      cartPage.uploadComponment().uploadFile(filePath);

      // Assertion
      await expect(cartPage.uploadComponment().successTxt).toContainText('uploaded successfully');
    })
})

test.describe('Upload File', () => {
    test('Should upload a test file on a hidden input field', async ({ page }) => {
      // Open url
      await page.goto('https://practice.sdetunicorns.com/cart/');

      // Store test file path
      const filePath = path.join(__dirname, '../data/Automation_Logo.png');

      //DOM manipulation
      await page.evaluate(() => {
        const selector = document.querySelector('input#upfile_1');
        if(selector){
            selector.className = ''
        }
      })

      // Upload test file
      await page.setInputFiles('input#upfile_1', filePath); // throws error

      // Click the submit button
      await page.locator('#upload_1').click();

      // Assertion
      await expect(page.locator('#wfu_messageblock_header_1_1')).toContainText('uploaded successfully');
    })
})

test.describe('Upload File using hardcoded sleep', () => {
    test('Should upload a test file', async ({ page }) => {
      // Open url
      await page.goto('https://practice.sdetunicorns.com/cart/');

      // Store test file path
      const filePath = path.join(__dirname, '../data/Test.pdf');

      // Upload test file
      await page.setInputFiles('input#upfile_1', filePath);

      // Click the submit button
      await page.locator('#upload_1').click();

      // Hardcoded sleep - WRONG WAY
      await page.waitForTimeout(5000);

      // Assertion
      await expect(page.locator('#wfu_messageblock_header_1_1')).toContainText('uploaded successfully');
    })
})

test.describe('Upload File using Wait For State', () => {
    test('Should upload a test file', async ({ page }) => {
      // Open url
      await page.goto('https://practice.sdetunicorns.com/cart/');

      // Store test file path
      const filePath = path.join(__dirname, '../data/Test.pdf');

      // Upload test file
      await page.setInputFiles('input#upfile_1', filePath);

      // Click the submit button
      await page.locator('#upload_1').click();

      // Wait For condition
      await page.locator('#wfu_messageblock_header_1_1').waitFor({ state: 'visible', timeout: 10000});

      // Assertion
      await expect(page.locator('#wfu_messageblock_header_1_1')).toContainText('uploaded successfully');
    })
})

test.describe('Upload File using Assertion Wait', () => {
    test('Should upload a test file', async ({ page }) => {
      // Open url
      await page.goto('https://practice.sdetunicorns.com/cart/');

      // Store test file path
      const filePath = path.join(__dirname, '../data/Test.pdf');

      // Upload test file
      await page.setInputFiles('input#upfile_1', filePath);

      // Click the submit button
      await page.locator('#upload_1').click();

      // Assertion
      await expect(page.locator('#wfu_messageblock_header_1_1')).toContainText('uploaded successfully', {timeout: 10000});
    })
})