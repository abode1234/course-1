# 🔍 فحص البورتات - mian.py

## 📋 نظرة عامة

هذا الملف يوضح كيفية تنفيذ فحص بسيط للبورتات المفتوحة على هدف معين. هذا النوع من الفحص يستخدم في مرحلة الاستكشاف الأولية.

## 🔍 شرح مفصل للكود

### 📦 الاستيرادات
```python
import socket
```
- **socket**: مكتبة Python الأساسية للاتصالات الشبكية

### 🎯 الحصول على معلومات الهدف
```python
target = input("target ip: ")
```

**شرح كل سطر:**
- **target**: متغير لتخزين عنوان IP الهدف
- **input("target ip: ")**: طلب عنوان IP من المستخدم وعرض رسالة توضيحية

### 📋 تعريف البورتات المستهدفة
```python
ports =[21,22,23,80,443, 3306]
```

**شرح كل سطر:**
- **ports**: قائمة تحتوي على أرقام البورتات المهمة للفحص
- **21**: FTP (File Transfer Protocol)
- **22**: SSH (Secure Shell)
- **23**: Telnet
- **80**: HTTP (HyperText Transfer Protocol)
- **443**: HTTPS (HTTP Secure)
- **3306**: MySQL Database

### 📢 رسالة تأكيد
```python
print(f"{target} is up")
```

**شرح كل سطر:**
- **print(f"...")**: طباعة رسالة باستخدام f-string
- **{target}**: إدراج عنوان IP الهدف في الرسالة
- **"is up"**: رسالة تأكيد أن الهدف متاح

### 🔄 حلقة فحص البورتات
```python
for port in ports:
    s = socket.socket()
    s.settimeout(1)
    try:
        s.connect((target, port))
        print(f"port {port} is open")
        s.close()
    except:
        pass
```

**شرح كل سطر:**
- **for port in ports**: التكرار على كل بورت في القائمة
- **s = socket.socket()**: إنشاء socket جديد
- **s.settimeout(1)**: تعيين timeout ثانية واحدة للاتصال
- **try**: بداية معالجة الأخطاء
- **s.connect((target, port))**: محاولة الاتصال بالهدف والبورت
- **print(f"port {port} is open")**: طباعة رسالة نجاح
- **s.close()**: إغلاق الاتصال
- **except**: معالجة أي أخطاء
- **pass**: تجاهل الأخطاء والاستمرار

## 🚀 كيفية التنفيذ

### 1. تشغيل الفحص
```bash
python3 mian.py
```

### 2. إدخال عنوان IP
```
target ip: 192.168.1.100
```

### 3. مراقبة النتائج
```
192.168.1.100 is up
port 22 is open
port 80 is open
port 443 is open
```

## ⚠️ الثغرات في الكود

### 1. خطأ إملائي في اسم الملف
```
mian.py  # يجب أن تكون "main.py"
```

### 2. عدم وجود تحقق من المدخلات
```python
target = input("target ip: ")  # لا يتحقق من صحة عنوان IP
```

### 3. معالجة أخطاء ضعيفة
```python
except:
    pass  # تجاهل جميع الأخطاء بدون تسجيلها
```

### 4. قائمة بورتات محدودة
```python
ports =[21,22,23,80,443, 3306]  # قائمة ثابتة ومحدودة
```

### 5. عدم وجود معلومات تفصيلية
لا يوفر معلومات عن نوع الخدمة أو البورت

## 🛡️ طرق الحماية من فحص البورتات

### 1. جدار الحماية (Firewall)
```bash
# حظر جميع البورتات غير المستخدمة
iptables -A INPUT -p tcp --dport 22 -j DROP
iptables -A INPUT -p tcp --dport 23 -j DROP
```

### 2. تغيير البورتات الافتراضية
```bash
# تغيير بورت SSH
# في ملف /etc/ssh/sshd_config
Port 2222
```

### 3. Port Knocking
```python
# مثال على Port Knocking
import socket
import time

def port_knock(ip, ports):
    for port in ports:
        try:
            s = socket.socket()
            s.connect((ip, port))
            s.close()
            time.sleep(0.1)
        except:
            pass
```

### 4. Honeypots
```python
# إنشاء بورتات مزيفة لجذب المهاجمين
def create_honeypot(port):
    server = socket.socket()
    server.bind(('0.0.0.0', port))
    server.listen(1)
    # تسجيل محاولات الاتصال
```

## 🔍 اكتشاف فحص البورتات

### 1. مراقبة السجلات
```bash
# مراقبة سجلات النظام
tail -f /var/log/syslog | grep "connection"

# مراقبة سجلات SSH
tail -f /var/log/auth.log
```

### 2. أدوات المراقبة
```bash
# مراقبة الاتصالات النشطة
netstat -an | grep ESTABLISHED

# مراقبة استخدام البورتات
lsof -i
```

### 3. برامج الحماية
- Snort
- Suricata
- Fail2ban

## 📊 تحسينات مقترحة

### 1. إضافة تحقق من المدخلات
```python
import re

def validate_ip(ip):
    pattern = r'^(\d{1,3}\.){3}\d{1,3}$'
    if not re.match(pattern, ip):
        return False
    
    parts = ip.split('.')
    return all(0 <= int(part) <= 255 for part in parts)

target = input("target ip: ")
if not validate_ip(target):
    print("Invalid IP address!")
    exit(1)
```

### 2. إضافة معلومات الخدمات
```python
services = {
    21: "FTP",
    22: "SSH", 
    23: "Telnet",
    25: "SMTP",
    53: "DNS",
    80: "HTTP",
    110: "POP3",
    143: "IMAP",
    443: "HTTPS",
    3306: "MySQL",
    5432: "PostgreSQL",
    8080: "HTTP-Proxy"
}

for port in ports:
    s = socket.socket()
    s.settimeout(1)
    try:
        s.connect((target, port))
        service = services.get(port, "Unknown")
        print(f"Port {port} ({service}) is open ✅")
        s.close()
    except:
        pass
```

### 3. تحسين معالجة الأخطاء
```python
for port in ports:
    s = socket.socket()
    s.settimeout(1)
    try:
        s.connect((target, port))
        print(f"Port {port} is open ✅")
        s.close()
    except socket.timeout:
        print(f"Port {port} timeout")
    except ConnectionRefusedError:
        print(f"Port {port} refused")
    except Exception as e:
        print(f"Port {port} error: {e}")
```

### 4. إضافة خيارات متقدمة
```python
import argparse

def main():
    parser = argparse.ArgumentParser(description="Port Scanner")
    parser.add_argument("target", help="Target IP address")
    parser.add_argument("--ports", help="Port range (e.g., 1-1000)")
    parser.add_argument("--timeout", type=float, default=1, help="Connection timeout")
    
    args = parser.parse_args()
    
    if args.ports:
        start, end = map(int, args.ports.split('-'))
        ports = range(start, end + 1)
    else:
        ports = [21, 22, 23, 80, 443, 3306]
    
    scan_ports(args.target, ports, args.timeout)
```

## 📊 أنواع فحص البورتات

### 1. TCP Connect Scan
```python
# النوع المستخدم في الكود الحالي
s.connect((target, port))
```

### 2. SYN Scan
```python
# فحص أسرع وأقل وضوحاً
import struct

def syn_scan(target, port):
    # إنشاء حزمة SYN
    pass
```

### 3. UDP Scan
```python
# فحص البورتات UDP
def udp_scan(target, port):
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.settimeout(1)
    try:
        s.sendto(b"", (target, port))
        s.recvfrom(1024)
        return True
    except:
        return False
```

## ⚖️ الجوانب القانونية

- فحص البورتات على أنظمة أخرى بدون إذن قد يكون غير قانوني
- استخدم فقط على أنظمة خاصة بك
- احصل على إذن مكتوب قبل الاختبار
- بعض البلدان تحظر فحص البورتات

## 🛡️ أفضل الممارسات

### 1. للدفاع
- إغلاق البورتات غير المستخدمة
- استخدام جدار حماية قوي
- مراقبة السجلات بانتظام
- تحديث الأنظمة

### 2. للهجوم الأخلاقي
- احصل على إذن مكتوب
- وثق جميع الأنشطة
- استخدم أدوات موثوقة
- احترم حدود الاختبار 