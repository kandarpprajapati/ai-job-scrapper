// scrapers/naukriScraper.js
const { launchBrowser } = require("../utils/puppeteer");

async function scrapeNaukriJobs() {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.goto("https://www.naukri.com/software-developer-jobs");

  await page.waitForSelector(".jobTuple");

  const jobs = await page.evaluate(() => {
    const jobNodes = document.querySelectorAll(".jobTuple");
    return Array.from(jobNodes).map((el) => {
      const title = el.querySelector(".title")?.innerText.trim();
      const company = el.querySelector(".subTitle")?.innerText.trim();
      const location = el.querySelector(".location")?.innerText.trim();
      const url = el.querySelector("a.title")?.href;
      return { title, company, location, url, source: "Naukri" };
    });
  });

  await browser.close();
  return jobs;
}

module.exports = scrapeNaukriJobs;
