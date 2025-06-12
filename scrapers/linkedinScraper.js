// scrapers/linkedinScraper.js
const { launchBrowser } = require("../utils/puppeteer");

async function scrapeLinkedInJobs() {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.goto(
    "https://www.linkedin.com/jobs/search/?keywords=Software%20Developer"
  );

  await page.waitForSelector(".jobs-search-results__list-item");

  const jobs = await page.evaluate(() => {
    const jobNodes = document.querySelectorAll(
      ".jobs-search-results__list-item"
    );
    return Array.from(jobNodes).map((el) => {
      const title = el.querySelector("h3")?.innerText.trim();
      const company = el.querySelector("h4")?.innerText.trim();
      const location = el
        .querySelector(".job-search-card__location")
        ?.innerText.trim();
      const url = el.querySelector("a")?.href;
      return { title, company, location, url, source: "LinkedIn" };
    });
  });

  await browser.close();
  return jobs;
}

module.exports = scrapeLinkedInJobs;
