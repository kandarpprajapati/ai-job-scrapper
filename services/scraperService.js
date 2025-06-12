const scrapeLinkedInJobs = require("../scrapers/linkedinScraper");
const scrapeIndeedJobs = require("../scrapers/indeedScraper");
const scrapeNaukriJobs = require("../scrapers/naukriScraper");
const fs = require("fs");

async function runAllScrapers() {
  const [linkedin, indeed, naukri] = await Promise.all([
    scrapeLinkedInJobs(),
    scrapeIndeedJobs(),
    scrapeNaukriJobs(),
  ]);

  const allJobs = [...linkedin, ...indeed, ...naukri];
  fs.writeFileSync("allJobs.json", JSON.stringify(allJobs, null, 2));
  console.log(`Scraped total ${allJobs.length} jobs from 3 platforms.`);
}

runAllScrapers();
