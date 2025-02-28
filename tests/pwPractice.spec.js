const path = require('path')

import {test, expect} from '@playwright/test'

test.beforeEach(async({page})=>{
    await page.goto("https://omayo.blogspot.com/");
})

test("Verify that the 'Button1' is disabled", async({page}) =>{
    const button1 = page.locator("#but1");
    await expect(button1).toBeDisabled();
})

test("Verify that the 'Disabled Text Box' is not editable", async({page})=>{
    const isEditable = await page.locator("#tb2").isEditable();
    expect(isEditable).toBeFalsy();
})

test("Verify alert box appears when clicked on ClickAfterTextDisappears button", async({page})=>{
    await page.locator('#alert2').click();
    page.on('dialog', async dialog =>{
        console.log(`Alert message: ${dialog.message()}`);
        dialog.accept();
    })
})

test("Verify that clicking 'Open a popup window' opens a new popup", async({page})=>{
    const popupLink = page.locator('a', {hasText: "Open a popup window"});
    const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        popupLink.click()
    ]);
    await popup.waitForLoadState();
    expect(popup.url()).toContain("https://the-internet.herokuapp.com/windows/new");
})

test("Verify that file upload works as expected", async({page})=>{
    const filePath = path.resolve(__dirname, '../test.png')
    await page.setInputFiles("#uploadfile", filePath);
    await page.waitForTimeout(5000)
})

test("Verify on clicking My Button alert appears", async({page})=>{
    await page.locator("#timerButton").click();
    page.on('dialog', async dialog =>{
        await dialog.accept();
    })
})

test.only("Verify double click of the button", async({page})=>{
    const dblBut = page.locator("button", {hasText:"Double click Here"});
    await dblBut.dblclick();
    page.on('dialog', async dialog =>{
        const dialogMessage = dialog.message();
        expect.soft(dialogMessage).toBe("Double Click Successfull");
        dialog.accept();
    })
})