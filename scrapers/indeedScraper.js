// scrapers/indeedScraper.js
const { launchBrowser } = require("../utils/puppeteer");

async function scrapeIndeedJobs() {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.goto("https://in.indeed.com/jobs?q=Software+Developer&l=India");

  await page.waitForSelector(".result");

  const jobs = await page.evaluate(() => {
    const jobNodes = document.querySelectorAll(".result");
    return Array.from(jobNodes).map((el) => {
      const title = el.querySelector("h2")?.innerText.trim();
      const company = el.querySelector(".companyName")?.innerText.trim();
      const location = el.querySelector(".companyLocation")?.innerText.trim();
      const url =
        "https://in.indeed.com" +
        (el.querySelector("a")?.getAttribute("href") || "");
      return { title, company, location, url, source: "Indeed" };
    });
  });

  await browser.close();
  return jobs;
}

module.exports = scrapeIndeedJobs;
