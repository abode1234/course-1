import socket

target = input("target ip: ")
ports =[21,22,23,80,443, 3306]

print(f"{target} is up")

for port in ports:
    s = socket.socket()
    s.settimeout(1)
    try:
        s.connect((target, port))
        print(f"port {port} is open")
        s.close()
    except:
        pass

