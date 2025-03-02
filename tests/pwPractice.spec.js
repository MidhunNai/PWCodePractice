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

test("Verify double click of the button", async({page})=>{
    const dblBut = page.locator("button", {hasText:"Double click Here"});
    await dblBut.dblclick();
    page.on('dialog', async dialog =>{
        const dialogMessage = dialog.message();
        expect.soft(dialogMessage).toBe("Double Click Successfull");
        dialog.accept();
    })
})

test("Verify that button in iFrame", async({page, context})=>{
    const iframe = page.frameLocator("#iframe1");
    const [newTab] = await Promise.all([
        context.waitForEvent('page'),
        iframe.locator('a', {hasText: "Jason Morrow"}).click()
    ])
    await newTab.waitForLoadState('domcontentloaded');
    const newTabUrl = newTab.url();
    expect(newTabUrl).toBe("https://www.etsy.com/shop/jasonmorrow/?etsrc=sdt");
})

test("Test all elements", async({page})=>{
    await page.locator("#ta1").fill("I am watching cricket match.");
    await page.locator('textarea', { hasText: "The cat was playing in the garden." }).fill("On hotstar");
    await page.locator("//form[@name='form1']/input[@type='text']").fill("kerala");
    await page.locator("#radio1").click();
    await page.locator("#checkbox1").uncheck();
    await page.locator("#checkbox2").check();

    await page.locator("#prompt").click();
    page.on('dialog', async dialog =>{
        dialog.accept("Hello QAFox");
    })
    await page.locator("#testdoubleclick").dblclick();
    await page.waitForTimeout(5000);
})

test("Test tab switching", async({page, context})=>{
    const bloggerButton = page.locator('a', {hasText: "Blogger"});
    const [newTab] = await Promise.all([
        context.waitForEvent('page'),
        bloggerButton.click()
    ])
    const newUrl = newTab.url();
    expect.soft(newUrl).toBe("https://www.blogger.com/about/?bpli=1")
    await page.bringToFront();
    await page.locator("#ta1").fill("I am watching cricket match.");
})