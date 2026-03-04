import  { chromium, FullConfig } from '@playwright/test'

async function globalSetup(_config: FullConfig){
    // Open browser
    const browser = await chromium.launch()
    const page = await browser.newPage();

    // Login
    await page.goto('https://practice.sdetunicorns.com/my-account')

    // Store a file with Not Login
    await page.context().storageState({ path: 'notLoggedInState.json'});

    //Login
    await page.locator('#username').fill('practiceuser1')
    await page.locator('#password').fill('PracticePass1!')
    await page.locator('[value="Log in"]').click()

    // Save signed-in state to 'loggedInState.json'
    await page.context().storageState({ path: 'loggedInState.json'});

    // Close browser
    await browser.close();
}

export default globalSetup;