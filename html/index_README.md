# 🚨 صفحة متعددة الثغرات - index.html

## 📋 نظرة عامة

هذه الصفحة تحتوي على عدة ثغرات أمنية خطيرة مصممة للتعليم. الصفحة تظهر كيفية عدم تطبيق ممارسات الأمان الأساسية في تطوير الويب.

## 🔍 شرح مفصل للكود

### 📄 هيكل HTML الأساسي
```html
<!DOCTYPE html>
<html>
<head>
  <title>Vulnerable Page</title>
</head>
<body>
  <h1>Welcome to Vulnerable Page</h1>
```

**شرح كل سطر:**
- **<!DOCTYPE html>**: إعلان نوع المستند
- **<html>**: بداية عنصر HTML الجذر
- **<head>**: قسم رأس الصفحة
- **<title>Vulnerable Page</title>**: عنوان الصفحة
- **<body>**: بداية جسم الصفحة
- **<h1>Welcome to Vulnerable Page</h1>**: عنوان رئيسي

### 🔍 الثغرة الأولى: XSS (Cross-Site Scripting)
```html
<form action="" method="GET">
  <label>Search: <input type="text" name="q"></label>
  <input type="submit" value="Search">
</form>

<p>Results for: <strong id="output">
  <script>
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById("output").innerHTML = urlParams.get("q");
  </script>
</strong></p>
```

**شرح الثغرة:**
- **<form action="" method="GET">**: نموذج يرسل البيانات عبر GET
- **<input type="text" name="q">**: حقل إدخال للبحث
- **const urlParams = new URLSearchParams(window.location.search)**: قراءة معاملات URL
- **urlParams.get("q")**: الحصول على قيمة المعامل "q"
- **innerHTML = urlParams.get("q")**: إدراج القيمة مباشرة في HTML

**مثال على الاستغلال:**
```
http://localhost:8000/index.html?q=<script>alert('XSS')</script>
```

### 🎯 الثغرة الثانية: CSRF (Cross-Site Request Forgery)
```html
<form action="http://example.com/change-email" method="POST">
  <input type="hidden" name="email" value="attacker@example.com">
  <input type="submit" value="Change Email (CSRF)">
</form>
```

**شرح الثغرة:**
- **action="http://example.com/change-email"**: إرسال إلى موقع خارجي
- **method="POST"**: استخدام طريقة POST
- **<input type="hidden" name="email" value="attacker@example.com">**: حقل مخفي يحتوي على بريد المهاجم
- **<input type="submit" value="Change Email (CSRF)">**: زر لتغيير البريد الإلكتروني

**كيفية الاستغلال:**
1. المهاجم ينشئ صفحة تحتوي على هذا النموذج
2. يخدع المستخدم للنقر على الزر
3. يتم إرسال طلب POST لتغيير البريد الإلكتروني

### 🖼️ الثغرة الثالثة: Clickjacking
```html
<br>
<iframe src="https://blog-website-liard-eta.vercel.app/" width="500" height="300"></iframe>
<br>
```

**شرح الثغرة:**
- **<iframe src="...">**: إطار مضمن لموقع خارجي
- **width="500" height="300"**: أبعاد الإطار
- **src="https://blog-website-liard-eta.vercel.app/"**: موقع خارجي

**كيفية الاستغلال:**
1. المهاجم يضع الإطار فوق عناصر أخرى
2. يخدع المستخدم للنقر على عناصر مخفية
3. يؤدي إلى إجراءات غير مقصودة

### ⚠️ الثغرة الرابعة: JavaScript Errors
```html
<script>
const x = elmine('iframe');
</script>
```

**شرح الثغرة:**
- **const x = elmine('iframe')**: استدعاء دالة غير موجودة
- **elmine**: خطأ إملائي (يجب أن تكون `getElementById`)
- **'iframe'**: معامل الدالة

**مشاكل هذا الكود:**
1. دالة غير موجودة تسبب خطأ JavaScript
2. قد يكشف معلومات عن التطبيق
3. يؤثر على أداء الصفحة

### 🔗 الثغرة الخامسة: رابط غير آمن
```html
<a href="https://blog-website-liard-eta.vercel.app/">
```

**شرح الثغرة:**
- **<a href="...">**: رابط لموقع خارجي
- لا يوجد تحقق من صحة الرابط
- قد يؤدي إلى التوجيه لمواقع ضارة

## 🚀 كيفية التنفيذ

### 1. تشغيل الخادم المحلي
```bash
cd html/
python3 -m http.server 8000
```

### 2. فتح المتصفح
```
http://localhost:8000/index.html
```

### 3. اختبار الثغرات

#### اختبار XSS:
```
http://localhost:8000/index.html?q=<script>alert('XSS Attack!')</script>
```

#### اختبار CSRF:
1. انقر على زر "Change Email (CSRF)"
2. راقب طلبات الشبكة في Developer Tools

#### اختبار Clickjacking:
1. راقب الإطار المضمن
2. تحقق من إعدادات الأمان

## ⚠️ الثغرات في الكود

### 1. عدم وجود Input Validation
```javascript
// الكود الحالي - غير آمن
document.getElementById("output").innerHTML = urlParams.get("q");

// الكود الآمن
function sanitizeInput(input) {
    return input.replace(/[<>]/g, '');
}
document.getElementById("output").textContent = sanitizeInput(urlParams.get("q"));
```

### 2. عدم وجود CSRF Protection
```html
<!-- الكود الحالي - غير آمن -->
<form action="http://example.com/change-email" method="POST">

<!-- الكود الآمن -->
<form action="http://example.com/change-email" method="POST">
    <input type="hidden" name="csrf_token" value="random_token_here">
```

### 3. عدم وجود Content Security Policy
```html
<!-- إضافة CSP -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; frame-src 'none';">
```

### 4. أخطاء JavaScript
```javascript
// الكود الحالي - خطأ
const x = elmine('iframe');

// الكود الصحيح
const x = document.getElementById('iframe');
```

## 🛡️ طرق الحماية

### 1. حماية من XSS
```javascript
// تشفير المخرجات
function encodeHTML(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
}

// استخدام textContent بدلاً من innerHTML
document.getElementById("output").textContent = urlParams.get("q");
```

### 2. حماية من CSRF
```html
<!-- إضافة CSRF Token -->
<form action="http://example.com/change-email" method="POST">
    <input type="hidden" name="csrf_token" value="<?php echo generateCSRFToken(); ?>">
    <input type="hidden" name="email" value="attacker@example.com">
    <input type="submit" value="Change Email (CSRF)">
</form>
```

### 3. حماية من Clickjacking
```html
<!-- إضافة X-Frame-Options -->
<meta http-equiv="X-Frame-Options" content="DENY">

<!-- أو استخدام CSP -->
<meta http-equiv="Content-Security-Policy" 
      content="frame-ancestors 'none';">
```

### 4. إصلاح أخطاء JavaScript
```javascript
// التحقق من وجود العنصر
const iframeElement = document.getElementById('iframe');
if (iframeElement) {
    // التعامل مع العنصر
    console.log('iframe found');
} else {
    console.log('iframe not found');
}
```

### 5. التحقق من الروابط
```javascript
// التحقق من صحة الروابط
function validateURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// استخدام الروابط الآمنة
const links = document.querySelectorAll('a');
links.forEach(link => {
    if (!validateURL(link.href)) {
        link.style.display = 'none';
    }
});
```

## 🔍 اكتشاف الثغرات

### 1. أدوات الفحص التلقائي
```bash
# استخدام OWASP ZAP
zap-cli quick-scan --self-contained http://localhost:8000

# استخدام Nikto
nikto -h http://localhost:8000
```

### 2. الفحص اليدوي
```javascript
// فحص XSS
console.log('Testing XSS...');
const testPayload = '<script>alert("XSS")</script>';
// إدراج في حقل البحث

// فحص CSRF
console.log('Testing CSRF...');
// مراقبة طلبات الشبكة
```

### 3. مراقبة السجلات
```bash
# مراقبة سجلات الخادم
tail -f /var/log/apache2/access.log

# مراقبة سجلات الأخطاء
tail -f /var/log/apache2/error.log
```

## 📊 تأثير الثغرات

### 1. XSS
- سرقة الكوكيز
- سرقة الجلسات
- تنفيذ كود ضار
- سرقة البيانات الشخصية

### 2. CSRF
- تغيير إعدادات الحساب
- إجراء عمليات غير مقصودة
- سرقة البيانات
- حذف المحتوى

### 3. Clickjacking
- إجراء إجراءات غير مقصودة
- سرقة النقرات
- التلاعب بالواجهة

## ⚖️ الجوانب القانونية

- استخدام هذه الثغرات ضد مواقع أخرى غير قانوني
- استخدم فقط على أنظمة خاصة بك
- احصل على إذن مكتوب قبل الاختبار
- قد تؤدي إلى عواقب قانونية خطيرة

## 🛡️ أفضل الممارسات

### 1. للدفاع
- تطبيق Input Validation
- استخدام Output Encoding
- إضافة CSRF Tokens
- تطبيق Content Security Policy
- مراقبة السجلات بانتظام

### 2. للاختبار
- احصل على إذن مكتوب
- استخدم بيئة معزولة
- وثق جميع الأنشطة
- احترم حدود الاختبار 