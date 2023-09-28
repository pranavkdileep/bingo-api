const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
	const browser = await puppeteer.launch({headless : "new"});
	const page = await browser.newPage();
    const filename = 'cookies.json'; // Replace with your file path

    fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }

    try {
        const cookies = JSON.parse(data);
        // Now you can work with the 'cookies' array.
        console.log(cookies);
    } catch (error) {
    c   onsole.error(`Error parsing JSON: ${error}`);
  }
});
    await page.setCookie(...cookies);
	await page.goto('https://bing.github1s.tk');
    await page.waitForSelector(".main-container");
    await page.waitForXPath('//*[@id="tone-options"]/li[3]/button');
    const [buttonElement] = await page.$x('//*[@id="tone-options"]/li[3]/button');
    if (buttonElement) {
        await buttonElement.click();
    } else {
        console.error('Element not found');
    }
    await page.waitForSelector("body > div.flex.flex-col.min-h-screen > main > div > div.chat-panel.relative.pt-24.z-10 > div > div > div.main-container > div.main-bar > textarea")
    await page.type("body > div.flex.flex-col.min-h-screen > main > div > div.chat-panel.relative.pt-24.z-10 > div > div > div.main-container > div.main-bar > textarea", "python hello world program");
    await page.click("body > div.flex.flex-col.min-h-screen > main > div > div.chat-panel.relative.pt-24.z-10 > div > div > div.main-container > div.body-1.bottom-bar > div.flex.gap-2.items-center > button")
    await new Promise((resolve) => setTimeout(resolve, 20000));
    const htmlContent = await page.content();
    fs.writeFileSync('output.html', htmlContent, 'utf-8');
    try {
        await page.waitForSelector('body > div.flex.flex-col.min-h-screen > main > div > div.flex.justify-center.left-0.w-full > div > div > div.chat-container.relative.flex.flex-col > div:nth-child(3) > div > div.text-message-content');
        const content = await page.evaluate(() => {
            const selector = 'body > div.flex.flex-col.min-h-screen > main > div > div.flex.justify-center.left-0.w-full > div > div > div.chat-container.relative.flex.flex-col > div:nth-child(3) > div > div.text-message-content';
            const elements = document.querySelectorAll(selector);
            const contentArray = [];
            elements.forEach((element) => {
                contentArray.push(element.textContent.trim());
            });
            return contentArray;
        });
        console.log('Content inside the selector:');
        content.forEach((text) => {

            console.log(text);
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
	await page.screenshot({path: 'example.png'});
	await browser.close();
})();