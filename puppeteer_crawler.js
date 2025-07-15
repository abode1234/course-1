const puppeteer = require('puppeteer');
const { URL } = require('url');

(async () => {
  const foundDomains = new Set();
  const foundSubdomains = new Set();
  const foundParams = new Set();

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(process.argv[2] || 'https://example.com', { waitUntil: 'networkidle2', timeout: 60000 });

  const links = await page.$$eval('a[href]', as => as.map(a => a.href));
  for (const link of links) {
    try {
      const u = new URL(link);
      const hostnameParts = u.hostname.split('.');
      if (hostnameParts.length >= 2) foundDomains.add(hostnameParts.slice(-2).join('.'));
      if (hostnameParts.length > 2) foundSubdomains.add(hostnameParts.slice(0, -2).join('.'));
      for (const [key] of u.searchParams.entries()) foundParams.add(key);
    } catch {}
  }

  console.log('Domains:', [...foundDomains]);
  console.log('Subdomains:', [...foundSubdomains]);
  console.log('Parameters:', [...foundParams]);
  await browser.close();
})(); 