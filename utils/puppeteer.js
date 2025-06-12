// puppeteerUtils.js
const puppeteer = require("puppeteer-core");

async function launchBrowser() {
  return await puppeteer.launch({
    executablePath: process.env.CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
}

module.exports = { launchBrowser };
