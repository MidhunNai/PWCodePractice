import {test, expect} from '@playwright/test'

test.only("Test dropdown which appears on hover", async({page})=>{
    await page.goto("https://ultimateqa.com/complicated-page#");
    
})