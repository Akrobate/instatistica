const puppeteer = require('puppeteer');

const auth = require('./auth');




(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/');

  await page.screenshot({path: './screenshots/buddy-screenshot-0.png'});
  await page.waitForSelector('.bIiDR');
  await page.screenshot({path: './screenshots/buddy-screenshot-1.png'});
  await page.click('.bIiDR');

  await page.waitForSelector('.bIiDR', { hidden: true })
  await page.screenshot({path: './screenshots/buddy-screenshot-2.png'});


  await page.type('input[name="username"]', auth.username);
  await page.type('input[name="password"]', auth.password);

  await page.screenshot({path: './screenshots/buddy-screenshot-3.png'});
  
  await page.waitForSelector('button[type="submit"]:not([disabled])')
  await page.screenshot({path: './screenshots/buddy-screenshot-4.png'});
  
  await page.click('button[type="submit"]');
  await page.screenshot({path: './screenshots/buddy-screenshot-5.png'});
  
  await page.waitForTimeout(3000)
  await page.screenshot({path: './screenshots/buddy-screenshot-6.png'});
  
  await page.waitForTimeout(13000)
  await page.screenshot({path: './screenshots/buddy-screenshot-7.png'});


  await browser.close();
})();

