# 🌐 ثغرات الويب - html/

## 📋 نظرة عامة

هذا المجلد يحتوي على صفحات HTML تحتوي على ثغرات أمنية مختلفة. هذه الصفحات مخصصة للتعليم والاختبار على أنظمة خاصة بك فقط.

## 📁 الملفات الموجودة

### 1. index.html - صفحة متعددة الثغرات
- **الوصف**: صفحة تحتوي على عدة ثغرات أمنية
- **الثغرات**: XSS, CSRF, Clickjacking, JavaScript Errors
- **الخطر**: عالي - يمكن استغلالها لسرقة البيانات

### 2. index3.html - صفحة XSS
- **الوصف**: صفحة تحتوي على ثغرة Cross-Site Scripting
- **الثغرات**: XSS (Reflected)
- **الخطر**: متوسط - يمكن تنفيذ كود JavaScript ضار

## ⚠️ تحذيرات مهمة

1. **استخدم هذه الصفحات على أنظمة خاصة بك فقط**
2. **لا تستخدم ضد مواقع أخرى بدون إذن**
3. **هذه الصفحات للتعليم فقط**
4. **قد تحتاج خادم ويب محلي للتشغيل**

## 🔧 المتطلبات

### 1. خادم ويب محلي
```bash
# باستخدام Python
python3 -m http.server 8000

# باستخدام Node.js
npx http-server

# باستخدام PHP
php -S localhost:8000
```

### 2. متصفح ويب حديث
- Chrome
- Firefox
- Safari
- Edge

## 📖 كيفية الاستخدام

### 1. تشغيل الخادم المحلي
```bash
cd html/
python3 -m http.server 8000
```

### 2. فتح المتصفح
```
http://localhost:8000/index.html
http://localhost:8000/index3.html
```

### 3. اختبار الثغرات
راجع README الخاص بكل ملف للحصول على تعليمات مفصلة.

## 🛡️ طرق الحماية من ثغرات الويب

### 1. Input Validation
```javascript
// التحقق من المدخلات
function validateInput(input) {
    return input.replace(/[<>]/g, '');
}
```

### 2. Output Encoding
```javascript
// تشفير المخرجات
function encodeOutput(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
}
```

### 3. Content Security Policy (CSP)
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self'">
```

### 4. CSRF Tokens
```html
<form method="POST">
    <input type="hidden" name="csrf_token" value="random_token">
    <!-- باقي الحقول -->
</form>
```

### 5. X-Frame-Options
```html
<meta http-equiv="X-Frame-Options" content="DENY">
```

## 🔍 أدوات اكتشاف الثغرات

### 1. أدوات الفحص التلقائي
- OWASP ZAP
- Burp Suite
- Nikto
- Acunetix

### 2. أدوات الفحص اليدوي
- Browser Developer Tools
- Wireshark
- Fiddler

### 3. أدوات اختبار الأمان
- SQLMap
- XSSer
- CSRF Tester

## 📊 أنواع ثغرات الويب

### 1. Injection Attacks
- SQL Injection
- NoSQL Injection
- Command Injection
- LDAP Injection

### 2. Cross-Site Scripting (XSS)
- Reflected XSS
- Stored XSS
- DOM-based XSS

### 3. Cross-Site Request Forgery (CSRF)
- GET-based CSRF
- POST-based CSRF
- JSON-based CSRF

### 4. Clickjacking
- UI Redressing
- Likejacking
- Cursorjacking

### 5. Security Misconfiguration
- Default Passwords
- Open Ports
- Debug Mode Enabled

## 🛡️ أفضل الممارسات

### 1. للدفاع
- تحديث البرامج بانتظام
- استخدام HTTPS
- تشفير البيانات الحساسة
- مراقبة السجلات

### 2. للاختبار
- احصل على إذن مكتوب
- استخدم بيئة معزولة
- وثق جميع الأنشطة
- احترم حدود الاختبار

## 📚 موارد إضافية

### 1. معايير الأمان
- OWASP Top 10
- SANS Top 25
- CWE/SANS Top 25

### 2. أدوات الحماية
- ModSecurity
- Fail2ban
- Snort

### 3. منصات التعلم
- OWASP WebGoat
- DVWA
- bWAPP 