const { generateText, checkAndGenerate } = require("./util");
const puppeteer = require("puppeteer");

test('should output name and age', () => {
    const text = generateText('Max', 29)
    expect(text).toBe('Max (29 years old)');

    const text2 = generateText('Anna', 28)
    expect(text2).toBe('Anna (28 years old)');
})

test('should output data-less text', () => {
    const text = generateText('', null)
    expect(text).toBe(` (null years old)`)

    const text2 = generateText();
    expect(text2).toBe(`undefined (undefined years old)`)
})


//integation test
test('should generate a valid text output', () => {
    const text = checkAndGenerate('Max', 29)
    expect(text).toBe('Max (29 years old)')
})

test('should click around', async() => {
    const browser = await puppeteer.launch({
        headless: true,
        // slowMo: 50,
        // args: ['--window-size=1200,500']
    });

    const page = await browser.newPage();
    await page.goto('file:///D:/thong/Coding/javascript/udemy-js/testing/testing-01-starting-setup/index.html')
    await page.click('input#name')
    await page.type('input#name', 'Anna')
    await page.click('input#age')
    await page.type('input#age', '28')
    await page.click('#btnAddUser')
    const finalText = await page.$eval('.user-item', (el) => el.textContent)
    expect(finalText).toBe('Anna (28 years old)')
    // page.close();
    // browser.close();
}, 10000) //setTimeout เพราะว่า jest default 5000ms