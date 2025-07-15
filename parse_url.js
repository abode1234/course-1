// كود استخراج الدومين، السب دومين، والبراميترز من رابط

function parseURL(url) {
  try {
    // إذا لم يبدأ الرابط بـ http أو https أضف https:// تلقائياً
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
    const u = new URL(url);

    // استخراج الدومين الرئيسي (مثلاً: example.com)
    const hostnameParts = u.hostname.split('.');
    let domain = '';
    if (hostnameParts.length >= 2) {
      domain = hostnameParts.slice(-2).join('.');
    } else {
      domain = u.hostname;
    }

    // استخراج كل السب دومين (مثلاً: api.blog في api.blog.example.com)
    const subdomains = hostnameParts.length > 2
      ? hostnameParts.slice(0, -2)
      : [];

    // استخراج البراميترز (Query Parameters)
    const params = {};
    for (const [key, value] of u.searchParams.entries()) {
      params[key] = value;
    }

    return {
      fullDomain: u.hostname,
      domain: domain,
      subdomains: subdomains,
      parameters: params
    };
  } catch (e) {
    return { error: "رابط غير صالح" };
  }
}

// واجهة تفاعلية للمتصفح (prompt)
if (typeof window !== 'undefined') {
  const url = prompt("أدخل الرابط:");
  const result = parseURL(url);
  if (!result.error) {
    alert(
      "الدومين الرئيسي: " + result.domain +
      "\nكل السب دومين: " + (result.subdomains.length ? result.subdomains.join('.') : 'لا يوجد') +
      "\nكل البراميترز: " + (Object.keys(result.parameters).length ? JSON.stringify(result.parameters) : 'لا يوجد')
    );
    console.log(result);
  } else {
    alert(result.error);
  }
}

// دعم التشغيل في Node.js
if (typeof require !== 'undefined' && typeof module !== 'undefined' && require.main === module) {
  const readline = require('readline');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('أدخل الرابط: ', (url) => {
    const result = parseURL(url);
    if (!result.error) {
      console.log('الدومين الرئيسي:', result.domain);
      console.log('كل السب دومين:', result.subdomains.length ? result.subdomains.join('.') : 'لا يوجد');
      console.log('كل البراميترز:', Object.keys(result.parameters).length ? result.parameters : 'لا يوجد');
    } else {
      console.log(result.error);
    }
    rl.close();
  });
} 