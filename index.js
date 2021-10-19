// node index.js --url="https://www.hackerrank.com/"  --config="cred.json"




const minimist = require('minimist');
const puppeteer = require("puppeteer");
const fs = require('fs');



let args = minimist(process.argv);


console.log(args.url);
console.log(args.config);


let configJSON = fs.readFileSync(args.config);
// JSON file
let config = JSON.parse(configJSON);

// console.log(config.moderator);

async function run(){
    let browser = await puppeteer.launch({
        headless : false,
        args : [
            '--start-maximized'
        ],
        defaultViewport : null
    })

    let page = await browser.newPage();
    await page.goto(args.url);


    await page.waitForSelector("a[data-event-action='Login']");
    await page.click("a[data-event-action='Login']");  


    await page.waitForSelector("a[href='https://www.hackerrank.com/login']")
    await page.click("a[href='https://www.hackerrank.com/login']");

    await page.waitForSelector("input[name='username']");
    await page.type("input[name='username']",config.username,{delay : 50});
    await page.waitForSelector("input[name='password']");   
    await page.type("input[name='password']",config.password,{delay : 50});


    await page.waitForSelector("button[type='submit']");
    await page.click("button[type='submit']");



    await page.waitForSelector("a[data-analytics='NavBarContests']");
    await page.click("a[data-analytics='NavBarContests']");


    await page.waitForSelector("a[href='/administration/contests/']");
    await page.click("a[href='/administration/contests/']");


    await page.waitForSelector("p.mmT");
    await page.click("p.mmT");

    await page.waitForSelector("li[data-tab='moderators']")
    await page.click("li[data-tab='moderators']");
    // await page.waitForSelector("li[data-tab='moderators']");
    // await page.click("li[data-tab='moderators']");

    await page.waitForSelector("button#cancelBtn");
    await page.click("button#cancelBtn");



    await page.waitForSelector("input#moderator");
    await page.type("input#moderator",config.moderator,{delay : 50});

    await page.waitForSelector("button.moderator-save");
    await page.click("button.moderator-save");

    // await page.waitForSelector("input#moderator");
    // await page.click("input#moderator");

}



run();