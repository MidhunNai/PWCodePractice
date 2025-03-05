import {test, expect} from '@playwright/test'

test("Test dropdown which appears on hover", async({page})=>{
    await page.goto("https://ultimateqa.com/complicated-page#");
    await page.locator('a', {hasText: "Education"}).click();
    const seleniumResourcesLink = page.locator('nav.et-menu-nav a').filter({ hasText: 'Selenium Resources' }).first();
    await seleniumResourcesLink.click();
    const title = await page.locator("h1.entry-title").textContent();
    expect.soft(title).toBe("Top 57 Resources to Learn Selenium Webdriver [2020]");
})

test("Test content hide functionality", async({page})=>{
    await page.goto("https://ultimateqa.com/complicated-page#");
    const hideButton = page.locator('a', {hasText:"hide"}).first();
    await hideButton.scrollIntoViewIfNeeded();
    await hideButton.click();
    expect(page.locator('a', {hasText:"Skills Improved:"}).first()).toBeHidden();
    await page.waitForTimeout(2000);
})

test("Fill form", async({page})=>{
    await page.goto("https://ultimateqa.com/complicated-page#");
    const name = page.locator("//div[@id='et_pb_contact_form_0']//input[@placeholder='Name']");
    await name.fill("Iris");
    const email = page.locator("//div[@id='et_pb_contact_form_0']//input[@placeholder='Email Address']");
    await email.fill("iris.nair@gmail.com");
    const message = page.locator("//div[@id='et_pb_contact_form_0']//textarea[@placeholder='Message']");
    await message.fill("Hello this is Iris from Kerala.");
    const calculateText = await page.locator("#et_pb_contact_form_0 p.clearfix span").textContent();
    console.log(calculateText)
    let textArr = calculateText.split("+");
    console.log(textArr)
    let sum = String(Number(textArr[0].trim()) + Number(textArr[1].trim()));
    console.log(sum)
    await page.locator("//div[@id='et_pb_contact_form_0']//p[@class='clearfix']//input").fill(sum);
    await page.locator("//div[@id='et_pb_contact_form_0']//button[@type='submit']").click();
    const thanksMessage = page.locator('p', {hasText: "Thanks for contacting us"});
    expect(thanksMessage).toBeVisible();
})


test.only("Verify toggle", async({page})=>{
    await page.goto("https://ultimateqa.com/complicated-page#");
    await page.locator("h5.et_pb_toggle_title").click();
    const successMessage = page.locator("div.et_pb_module div.et_pb_toggle_content");
    await page.waitForSelector("div.et_pb_module div.et_pb_toggle_content");
    expect(successMessage).toBeVisible();
})