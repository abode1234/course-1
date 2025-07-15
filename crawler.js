const axios = require('axios');
const cheerio = require('cheerio');
const { URL } = require('url');

const visited = new Set();
const foundDomains = new Set();
const foundSubdomains = new Set();
const foundParams = new Set();

async function crawl(url, depth = 1) {
  if (visited.has(url) || depth < 1) return;
  visited.add(url);

  try {
    const res = await axios.get(url, { timeout: 10000 });
    const $ = cheerio.load(res.data);

    $('a[href]').each((_, el) => {
      let link = $(el).attr('href');
      if (!link) return;

      // تجاهل الروابط البريدية أو الجافاسكريبت
      if (link.startsWith('mailto:') || link.startsWith('javascript:')) return;

      // تحويل الرابط النسبي إلى مطلق
      try {
        link = new URL(link, url).href;
      } catch { return; }

      // تحليل الرابط
      try {
        const u = new URL(link);
        const hostnameParts = u.hostname.split('.');
        // الدومين الرئيسي
        if (hostnameParts.length >= 2) {
          foundDomains.add(hostnameParts.slice(-2).join('.'));
        }
        // السب دومين
        if (hostnameParts.length > 2) {
          foundSubdomains.add(hostnameParts.slice(0, -2).join('.'));
        }
        // البراميترز
        for (const [key] of u.searchParams.entries()) {
          foundParams.add(key);
        }
      } catch {}

      // زحف لروابط نفس الدومين فقط (اختياري)
      if (link.startsWith('http') && link.includes(new URL(url).hostname)) {
        crawl(link, depth - 1);
      }
    });
  } catch (e) {
    // تجاهل الأخطاء
  }
}

// مثال للاستخدام:
(async () => {
  const startUrl = process.argv[2] || 'https://example.com';
  const depth = Number(process.argv[3]) || 1;
  await crawl(startUrl, depth);

  // انتظر قليلاً لإكمال الزحف المتوازي
  setTimeout(() => {
    console.log('الدومينات:', [...foundDomains]);
    console.log('السب دومين:', [...foundSubdomains]);
    console.log('البراميترز:', [...foundParams]);
  }, 3000);
})(); 