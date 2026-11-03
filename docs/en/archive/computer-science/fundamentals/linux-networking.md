---
date: 2024-03-30
---

> [!warning] Not strictly revised according to Chinese typography rules
>
> This one is fairly old, and it hasn't been revised for a long time either. So while I'm at it, let me go through the whole thing once.
>
> But the revision is pretty poor, because my level was limited back then and the formatting of this post was crappy. If I really followed Chinese typography strictly, the workload would be enormous and I don't have that much time, so let's leave it as it is.

## Linux Networking Basics 1

### 1.1 How a Computer Gets Online

- Network card - (wired) - (wireless)  
- Router (wifi 2.4g/5.0g) [usually four or five ports (for the external network & the internal network, but there's usually also an optical modem, and it has to be connected to the optical modem)]  
- Switch [basically available with any number of ports] (connects the router and the network cards [if there are too many network cables, chain them through a switch]); divided into the main one and the others — the main one performs better and costs a bit more...  
- Optical modem - the box of equipment that connects to the network service provider; fiber fusion splicer (if you dig up the fiber cable, it's ruined); then it is connected to the provider's data center [the unit of fiber cable is the core] [originally it was telephone lines ( ), consistent with "Computer Networking: A Top-Down Approach"] [telephone line connection (now replaced by the optical modem): the modem converts analog signals, and at a distance you can't hear anything anymore; 6M broadband was the limit for telephone lines] [ZTE, Huawei] [don't mix up the gigabit port and the 100-megabit port; to save money, manufacturers usually provide only one gigabit port] [network operators are also interconnected with each other]  
- WiFi 6 [802.11ax] [maximum rate 9.6 Gbps] (the latest technology)  
- WiFi 5 [802.11ac] [maximum rate 866 Mbps]  
- Older WiFi [802.11b-a-g-n] [maximum rate 1 & 2-11-54-54-600 Mbps]  
- WiFi 7 is on the way; it may slip this year   

### 1.2 The OSI 7-Layer Model

- Computer systems: Windows, Linux, mac-os, UNIX  
 Android (Linux + Java garbage collection mechanism, fragmentation issues; iOS (UNIX + Objective-C); Apple doesn't have one  
- [Network cable standard 568b (orange-white - orange - green-white - blue - blue-white - green - brown-white - brown) ([custom] it still works online if both ends are wired wrong)] [four wires generally only support 100 Mbps, eight wires can do gigabit (the speed also has to be negotiated)] [there's the notion of twisted pair]  
- Communication media [network cable - twisted pair - electrical signal; wifi - electromagnetic wave; fiber - optical signal]  
  - a. Multiple operating systems  
  - b. Multiple media  
  - c. Goals (confidentiality)  
  - d. Multiple pieces of software using the network at the same time  
- What layering does  
  - Physical layer: the signal conversion problem; digital signals; electrical signals  
  - Data link layer: MAC address [every network card has a unique address]; unique; physical address; Ethernet  
  - Network layer: IP address [public IP (IANA allocates IP addresses); private IP]; public IPs are unique; locating  
  - Transport layer: ports; TCP is reliable and slow, for long-distance transmission / UDP is unreliable and fast, for efficiency and real time (live streaming is usually like this)] [every server listens on a port when it starts] [VNC protocol 5900 / http:// 80 / ssh 22] [e.g. 192.168.19.11:5900]  
  - Session layer: sessions [in some protocols the last three layers are just one layer]  
  - Presentation layer: file types  
  - Application layer: http, ftp, smtp [QQ, browsers]  

### 1.3 Models

- The most widely used protocol today: TCP/IP [4 layers & 5 layers (five layers below)]  
  - Physical layer: signal conversion  
  - Data link layer: MAC identifies the identity of each network card  
  - Network layer: source IP and destination IP addresses; public; private network; router  
  - Transport layer: TCP & UDP; port; TCP header + data / UDP header + data (source port and destination port, plus the sequence numbers of countless small packets)  
  - Application layer: all kinds of application software  
  - [analyzed through packet capture]  

### 1.4 Encapsulation and Decapsulation of Data  

- Application layer ---> data 5M  
- Transport layer sends ---> TCP segment + data 1, TCP segment + data 2, TCP segment + data 3 ...    
- Network layer ---> IP packet + TCP header + data 1, IP packet + TCP header + data 2 ...  
- Data link layer ===> data frame + TCP packet + TCP header + data 1, data frame + IP packet + TCP header + data 2 ...  
- Physical layer ===> converts the complete data packet from binary into electrical signals  
.....................................
- Physical layer ===> electrical signals converted into binary  
- Data link layer ===> data frame + IP packet + TCP header + data 1  
- Network layer ---> IP packet + TCP header + data 1, IP packet + TCP header + data 2 ...  
- Transport layer sends ---> TCP segment + data 1, TCP segment + data 2, TCP segment + data 3 ...  
- Application layer ---> data 5M
## Linux Networking Basics 2

### 2.1 Dividing Up IP Addresses  

- IP address range 0.0.0.0~255.255.255.255  
- 00000000 00000000 000000000 000000000 ===> 0.0.0.0
- 11111111 11111111 111111111 111111111 ===> 255.255.255.255  
- [A computer only has 32 bits of space to store an IP address] [the total number of IP addresses is 4,294,967,296, roughly 4.3 billion]  
- Not enough, so nat == network address translation
- Private IP ranges: 10.0.0.0~10.255.255.255 (class a) 16,777,214
- &172.16.0.0~172.16.31.255 (class b) 1,048,576
- &192.168.0.0~192.168.255.255 (class c) 65,536
  - class a 1.0.0.1~126.255.255.254 [128]  
  - class b 128.0.0.1~191.255.255.254 [64]  
  - class c 192.0.0.1~223.255.255.254 [32]  
  - class d multicast, VRRP protocol, keepalive high availability, 224~239 [16]  
  - class e research, 240~255  
- To alleviate the IPv4 address shortage, 32 bits   
  - 1: IPv6, 128 bits, hexadecimal notation  

  - 2: nat, network address translation  
  - a: saves a large number of public IP addresses  
  - b: reduces network attacks  
- 127.0.0.0~127.255.255.255 special address    
### 2.2 Subnet Mask [determines the size of a subnet]

- IP address 192.168.19.11     
- Subnet mask 255.255.255.0 === 192.168.19.11/24  
  $\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad$ 10.0.0/8  
  $\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad$ 172.16.0.0/16  
- The more IPs in a subnet, the larger the subnet range    
- 192.168.19.11/24  
  - 11000000.10101000.00010011.00001011  
  - 11111111.11111111.11111111.00000000=255.255.255.0  
  - {$\qquad$ $\qquad$网 络 位 $\qquad$ $\qquad$}{host bits} [meaning of the 24 bits]  
  - [If two IP addresses have the same network bits, they are in the same subnet]   
  - 11000000.10101000.00010011.00000000 ===> 192.168.19.0 network number    
  - 11000000.10101000.00010011.00000001 ===> 192.168.19.1 starting IP  
  - 11000000.10101000.00010011.11111110 ===> 192.168.19.254   ending IP  
  - 11000000.10101000.00010011.00001111 ===> 192.168.19.255   broadcast address  
  - [In the same subnet, as long as the physical link is up, they can communicate directly! If they are not in the same subnet, even if the physical link is up, they cannot communicate directly!!]
  - 192.168.100.126/25 ===> 192.168.100.126 255.255.255.128  
  - 192.168.100.129/25 ===> 192.168.100.129 255.255.255.128  
  - Not in the same subnet means no connectivity [below is how to calculate the subnet]  
  - 11000000 10101000 01100100 01111110 ===> 192.168.100.126  
  - 11111111 11111111 11111111 10000000 ===> 255.255.255.128  
  - 11000000 10101000 01100100 00000000 ===> 192.168.100.0  
  - 11000000 10101000 01100100 01111111 ===> 255.255.255.127  

  - 11000000 10101000 01100100 10000001 ===> 192.168.100.129  
  - 11111111 11111111 11111111 10000000 ===> 255.255.255.128  
  - 11000000 10101000 01100100 10000000 ===> 192.168.100.128  
  - 11000000 10101000 01100100 11111111 ===> 192.168.100.255  
- Communication between different subnets must be forwarded by a router [you have to be able to calculate subnet masks]  

- Subnet mask values
  - 11111111 255  
  - 11111110 254  
  - 11111100 252  
  - 11111000 248  
  - 11110000 240  
  - 11100000 224  
  - 11000000 192  
  - 10000000 128  
  - 00000000 0  

### 2.3 Hands-On with a Router  

- Software router: soft router + an ordinary PC  
- Hardware router: an ordinary router  
- Enterprise router: enterprise-grade router          

- Network planning [two network cards] 
  - One in nat mode with bridging (external network) ikuai        
  - One in host-only mode (internal network) ikuai  
   $\qquad\qquad\qquad$ [initial password admin; I changed it to my old password myself]  
  - Installing ikuai: - [install the image last] install the image file; remember to give it 1g of memory [the following steps are very simple]  
     - Give the two network cards: the first in host-only mode, the second in nat mode  
     - Set the LAN (internal network) / WAN (external network) addresses  
     - Set up the LAN first (the internal network is the vm1 IPv4 seen on the local win11 machine)  
     - Go to 192.168.198.254 (ikuai) network settings  
     - Manually configure the IPv4 address of the win7 virtual machine; 192.168.198.100 is recommended, the subnet mask automatic, and the gateway must point to the internal network IP address 192.168.198.254  
     - Then the machine can get online  
     - Through behavior control and application protocol control you can control internet access and directly block the 192.168.198.0/24 subnet  

### 2.4 The History and Role of DNS

- Where DNS came from: communication between computers — IP addresses and ports 

- Client ports are not fixed; they are random  
- Server 192.168.198.254:80 (port)  
- Baidu IP: 180.65.33.218  Sina IP: 218.30.13.36  
- Once there were too many IP addresses, they were too hard to remember, and they get changed later on, so someone wrote a program  
- 6. Similar to a phone book: 180.65.33.218 baidu (just an analogy, it doesn't mean this really exists)  
- 7. The hosts file, IP address + note: too much trouble  
- Then came the DNS server & DNS client, entering the information into a database  
- [packet capture software: A record, address]  
- [ping time is round trip; DNS resolution happens before ping]  
- Common DNS servers in China: 
  - Alibaba Cloud 223.5.5.5 223.6.6.6  
  - Baidu 180.76.76.76  
  - Tencent 119.29.29.29  
  - Overseas 8.8.8.8  
  - Nanjing Xinfeng 114.114.114.114 (rogue ads)  
  - 115.115.115.115  
  - After using the 360 disconnection first-aid kit, DNS becomes 114 and that's the end of it  
- The role of DNS is to resolve domain names into IP addresses; if DNS is misconfigured, you can't get online    

---
### 2.5 The DNS Resolution Process  

  - [DNS commands] DNS-related commands on Linux: dig nslookup host  
(There are thirteen root name servers in the world) [nine in the United States, two in Europe located in Sweden and the United Kingdom, one in Asia, in Japan] [only one is the primary root server, located in the United States]  [China is currently pushing IPv6 hard]  
## Linux Networking Basics 3

### 3.1 Character Encoding  

- Why is broadband divided by 8? 1000Mbps == 125Mb/s
- File encoding:   
- One English letter: 1 byte
- One Chinese character: 2 bytes under gbk/gb2312; 256*256 = 65536
- utf-8: 3 bytes
- Computers — converting things in the real world into the computer's world --- modeling
- ASCII code [gb means national standard; gb2312 was released in 1980, gbk in 1995 and is compatible with gb2312]
- Universal code, unicode: 4 bytes, 00000000 00000000 00000000   00000001
- Variable-length encoding utf-8: 00000001, 1 byte, 3 bytes
### 3.2 DNS Resolution Commands on Linux

- DNS: resolves domain names into IP addresses  

- Computer -- server program --- IP address + port, fixed  

- Computer -- client program --- IP address + port, not fixed  

- Opening a website:

   - Resolve the domain name into an IP 
   - Send to the target website's IP + port  

- Linux commands
  
  ```shell
  dig www.oldqiang.com / dig @223.5.5.5 www.oldqiang.com
  nslookup www.oldqiang.com / www.oldqiang.com 119.29.29.29
   host www.oldqiang.com / host www.oldqiang.com 119.29.29.29
   yum install bind-utils
  ```
  
-  http://  80  plaintext  

-  https://  443  encrypted  

### 3.3 DNS Record Types  

- A record [IPv4] www.oldqiang.com 123.xx.xx.xx  
- CNAME alias www.oldqiang.com --> www.qstack.com  -->...... 
- MX exclusively for mail  
- NS nameserver, authoritative DNS resolution  
- AAAA [IPv6]  
- Domain names are divided into international top-level domains and national domains
- International domains: com net org [non-profit organizations, can you bear to?] gov [government] edu [universities] mil [military, but almost nobody does this] [the last three domains require a special institution to register]  
- National-level domains [.cn (China domain) .jp]
- Baidu paid ranking, Meituan paid ranking [both are insanely expensive]
- DNSpod.cn [Tencent's domain sales website]

### 3.4 The ARP Broadcast Protocol

- ARP, data link layer (ADDRESS RESOLUTION PROTOCOL)  
- Resolves IP addresses into mac addresses  
- [Sending a data packet out requires an IP address as well as a mac address]  
- Things to watch out for with ARP  
  - ARP spoofing [on win10 and above, the system's own firewall is enough to deal with spoofing]  
  - If the LAN is too large, broadcast storms [if tens of millions of machines communicate at the same time, broadcasts fly everywhere]  

### 3.5 The TCP Three-Way Handshake  

- [Data packets must be sent to the gateway first] [TCP is related to network attacks] [a reliable protocol]
- [Every data packet sent needs an acknowledgment]  
- TCP probing whether the physical link is connected, the TCP three-way handshake  
- [In the network world, whoever initiates the request first is the client (generally speaking)]  
- TCP data packets, 6 kinds of flags: SYN (handshake packet), FIN (finish, disconnect packet), PSH (data packet)  
- ACK (acknowledgment packet), RESET (retransmission packet)  
- The client sends the first packet flagged SYN with a random sequence number: seq = x, ack = 0  
- The server sends a packet in response, flagged ack, seq = y, ack = x + 1 [a network cable has eight wires, a two-lane road: four for upload, four for download]  
- The server sends another packet, flagged SYN, seq = y, ack = x + 1  
- The client sends a packet in response, flagged ack, seq = x + 1, ack = y + 1  
- [The above is the so-called four-way handshake, but the middle two steps can actually be merged into a three-way handshake]  
- Flagged SYN, ACK, seq = Y, ack = x + 1  
- Home broadband and enterprise-grade broadband  
- As an ordinary user you download a lot and upload little; the speed ratio is generally 10:1 & 5:1
- Enterprise-grade broadband is generally used for servers, upload and download symmetric, 1:1  
- 1000 megabits residential: around 1000 yuan per year  

### 3.6 The TCP Four-Way Teardown [near the end]  

- The client sends FIN, seq = x, ack = y  
- The server sends a packet in response, flagged ACK, seq = y, ack = x  
- Wait for the server to finish sending data.........  
- The server sends a packet flagged FIN, seq = y, ack = x + 1   
- The client responds flagged ACK, seq = x + 1, ack = y + 1   

When you communicate over a network on a computer, your computer has an IP address, and it communicates with other networks through the gateway. When you visit a website using a domain name, the DNS server resolves the domain name into an IP address, and then communicates with the application on the target server through that IP address and a specific port.

## Linux Networking Basics 4

### 4.1 How to Defend Against DDOS [denied of service]

- Attacks formed by exploiting the TCP three-way handshake are called dos attacks (they have a cost)
  - Both TCP and UDP have ports
  - TCP 0-65535; anything within 10000 is a commonly used server port
  - The rest are all clients: 4kb * 5w = 2,000,000kb
- [Almost no solution]
- Defending against DDOS attacks [just throw money at it]
- [client 1g/s, server 10g/s]
- Increase bandwidth; enterprise broadband is too expensive, a total loss (viable for big companies)
- Buy high-defense IPs in advance; buying them after the attack starts is useless...
- DDOS tools [sqlmap — anyway, just search DDOS on GitHub]

### 4.2 Packet Capture with TCPdump

- `TCPdump -i eth0 icmp -nn`
  - -i specifies the network card name
  - -nn does not resolve ports into application layer protocols
  - -c specifies the number of packets to capture
  - -s does not resolve sequence and acknowledgment numbers into absolute values
  - -w specifies where to save the data packets
- Packets captured by TCPdump, analyzed by wireshark
- `TCPdump -i eth0 TCP port 80 -nn -c 10 -w http.cap`
---
### 4.3 Using the Linux Network Commands nmap and tracert

- `yum install nmap`
[filter]
- `nmap -v IP` show the detailed scanning process
- `nmap -p  IP`  scan the specified port
- `nmap -A IP`  comprehensive operating system scan
- `nmap -sP IP`  ping scan for host liveness
- `nmap -Pn/-P0` IP  ping-disabled scan
- `nmap -sS IP`  TCP syn scan, also called half-open scan
- `nmap -sT IP`  TCP connect scan (high accuracy)
- `nmap -sn IP` range
- `nmap -O`
- `tracert -d` windows systems
- `traceroute n` Linux, though all kinds of timeouts will happen and it is all ***

- Both parts above can be learned once we get to the Linux system......... right now I really can't make sense of it [nmd, forced into it: I can only install centos7 in a virtual machine, then connect with xshell, meanwhile download wireshark, then use install commands to install TCPdump and sz] [yum install TCPdump & yum install lrzsz]

### 4.4 Manually Configuring an IP Address

- DHCP server - allocates an IP address range; the DHCP client obtains one automatically
- DHCP dynamically obtains an IP address [on windows, an IP address conflict is detected as a conflict]
  - Statically setting an IP easily leads to what is in the [ ] above [public IPs are generally statically assigned]
  - [centos7 network card configuration path /etc/sysconfig/network-scrIPts/] 
    - `cp ifcfg-ens33 ifcfg-ensa36`
    - `vim ifcfg-ens33`  

      ```
      TYPE="Ethernet"
      BOOTPROTO="static""
      NAME="ens33"               [配IP]
      DEVICE="ens33"
      ONBOOT="yes"
      IPADDR=192.168.10.100
      NETMASK=255.255.255.0
      GETWAY=192.168.10.2
      DNS1=223.5.5.5
      DNS2=180.76.76.76
      systemctl restart network
      ssh root@192.168.10.100
      [root@localhost network-scrIPts]# cat ifcfg-ens36
      TYPE="Ethernet"
      BOOTPROTO="static""
      NAME="ens36"
      DEVICE="ens36"
      ONBOOT="yes"
      IPADDR=192.168.8.4
      NETMASK=255.255.255.0
      GETWAY=192.168.8.1
      DNS1=223.5.5.5  
      [root@localhost network-scrIPts]# cat ifcfg-ens33
      TYPE="Ethernet"
      BOOTPROTO="static""
      NAME="ens33"
      DEVICE="ens33"
      ONBOOT="yes"
      IPADDR=192.168.10.100
      NETMASK=255.255.255.0
      GETWAY=192.168.10.2
      DNS1=223.5.5.5
      ```

### 4.5 Troubleshooting "Can't Get Online"

- Reasons xshell cannot connect
  - Check the virtual machine's network adapter: whether it is connected, whether it is in nat mode
  - Check whether vmware network adapter vmnet8 is in a disabled state
  - Whether the vmnet8 network card's IP address is in the same subnet as the virtual machine
  - Check whether the virtual machine's IP is normal
    - [IP addr show] [delete command rm ]
    - [Bridged mode: in bridged mode, the host machine and the virtual machine share the same physical network interface, and they can connect to the external network (such as the Internet) through the host's physical network interface. Both the host machine and the virtual machine can have their own IP addresses, they are in the same subnet, and they can communicate with each other. Bridged mode enables the virtual machine to communicate directly with the external network just like a physical host.
    - [NAT mode: in NAT mode, the virtual machine communicates with the external network through the host machine's network interface. The host machine acts as a network address translation (NAT), providing the virtual machine with a private IP address and forwarding the virtual machine's network traffic to the external network. The virtual machine can use the host machine as a gateway to access the external network, but the external network cannot directly access the virtual machine. NAT mode is usually used in scenarios where the virtual machine needs to be isolated from the external network.]
    - [Damn it, I have to say this part really messes with your head]
    - [nat network card]
    The virtual network in the virtual machine is set to 192.168.10.0
    vm8 in the host machine is set to 192.168.10.1
    The gateway is 192.168.10.2
    The broadcast address is 192.168.10.255
    DHCP automatically allocates 192.168.10.3~254
    The first centos7 IP 192.168.10.3
    The second centos7 IP 192.168.10.100
    [The address in the first one is automatically allocated by DHCP; the address in the second one is allocated by myself]
- xshell can connect, but there is no internet access
  - Can ping public IPs but cannot ping domain names: there is a problem with the DNS address
  - The physical machine cannot get online
    - Step 1: check whether the physical connection is normal
    Step 2: ping the gateway
    Step 3: ping the public IP
    Step 4: `ping www.baidu.com`
    $\qquad\quad$ `tracert -d www.qq.com`
    Step 5: ping your own server
    Computer - ordinary switch - core switch - enterprise-grade router - optical modem - carrier isp
- Good grief, this is a bit absurd...
I spent nearly two full days on this day4; the amount of material involved suddenly became huge, good thing I stuck with it
Also, the reason I accidentally typed traditional characters is that ctrl + shift + f has a quick-switch function; don't be silly next time — in vscode, using the search function is just ctrl + f
---
## Linux Networking Basics 5

### 5.1 Preparing the Environment for Static Routing

- The world internet layout is a ring structure, so network cost is low
- The reason a star-structure network cannot be the main layout of the world internet is that the cabling cost is too high
- But locally everything is a star structure

- Static routing: requires manual configuration
  - Dynamic routing: configure some instructions in advance, and the routers learn by themselves
  [I knew it would get me again, making me download a Cisco simulator, boohoo boohoo, I'm truly done]
  The gateway is the static route with the lowest priority 

### 5.2 Static Routing

- Directly connected routes that ARP can reach
  [1:192.168.20.11  2:192.168.20.12&172.16.1.12  3:172.16.1.13]
  [route -n]
  [route add -net 172.16.1.0/24 gw 192.168.20.12 ]

- The command you provided, route add -net 172.16.1.0/24 gw 192.168.20.12, is used to add a static routing rule to the routing table. This command means sending the traffic of the target network 172.16.1.0/24 out through the gateway 192.168.20.12.
- An explanation of each part of the command:
  - ```route add：添加静态路由的命令。```
  - ```net 172.16.1.0/24```: specifies the subnet address and subnet mask of the target network. In this case the target network is 172.16.1.0/24.
  - ```gw 192.168.20.12```: specifies the gateway's IP address. In this case the gateway is 192.168.20.12.
  - The purpose of this command is to tell the operating system that when the target IP address to be accessed belongs to the 172.16.1.0/24 network, the traffic should be sent to the gateway 192.168.20.12 for forwarding.

- Note that this is an example command, and the specific configuration may differ depending on the network environment and requirements. In actual use, adjust the target network and gateway values according to your network configuration and needs. Also, this command may differ for different operating systems, so make sure to use the correct command and syntax for your operating system.

- ```TCPdump -i ens33 icmp -nn```
After configuring the above command, packets can only go from machine 1 to machine 2's second network card and cannot reach machine 3
So the following commands are needed [a router connecting subnets must have forwarding capability; a computer discards packets that don't belong to it]
`转发命令:echo 'net.IPv4.IP_forward = 1' >> /etc/sysctl.conf`
`cat /etc/sysctl.conf`
`TCPdump -i ens36 -nn`
At this point packets can be sent to machine 3, but machine 3 cannot send packets back because no route is configured
`route add -net 192.168.20.0/24 gw 172.16.1.12`
Add another network card to the right end of machine 3 and assign it 172.16.2.13
Add router5 to the right end of machine 3 and configure it as 172.16.2.14
The static route just configured is restored simply by entering ```systemctl restart network```

### 5.3 How Packets Are Sent

- Source mac [your own] destination mac
- Source IP [write your own] destination IP
Anyway, mac addresses keep changing [only used for communication within your own subnet]; the important thing is understanding how mac addresses change

### 5.4 Turning Linux into a Router

- The route configured above only forwards data; it does not provide shared internet access
  Router: nat address translation, the ability to share internet access
  `route add -net 0.0.0.0/0 gw 192.168.20.2（看虚拟机的网关）`
  Clear the at address rules ```IPtables -t nat -F```
  `IPtables -t nat -A POSTROUTING -s 172.16.1.0/24 -j MASQUERADE`
  `route add -net 0.0.0.0/0 gw 172.16.1.12`
  `vim /etc/resolv.conf`
  `nameserver 223.5.5.5`
  ttl is short for time to live; this field specifies the maximum number of subnets an IP packet is allowed to pass through before being dropped by a router [it can be modified through the registry]

### 5.5 Configuring DHCP Service for the Linux Router

- Install DHCP
  - `yum install DHCP -y`
  - Modify the DHCP server's configuration file
  - `vim /etc/DHCP/DHCPd.conf`

    ```
    subnet 172.16.0.0 netmask 255.255.255.0 {
    range 172.16.0.100 172.16.0.250;
    option domain-name-servers 180.76.76.76;
    option drouters 172.16.0.12;
    default-lease-time 600;
    max-lease-time 7200;
    }
    ```
- No internet behavior management features
  - Start the DHCP server
  - `systemctl start DHCP.service`
  - `systemctl enable DHCPd.service`
---
### 5.6 The Linux System Firewall firewalld

- Layer 4 system firewall [enable with systemctl start firewalld.service]
- Check firewall status`systemctl status firewalld.service`
- View services`netstat -lntup`
- firewalld: view open ports 
  - `firewall -cmd --list-ports`   
  - `firewalld -cmd --list-services`
  All services are defined in
  - `/usr/lib/firewalld/services/`
- Below are some commonly used CentOS 7 firewall (Firewall) commands:
  - Start the firewall:
   ```
   sudo systemctl start firewalld
   ```
  - Stop the firewall:
   ```
   sudo systemctl stop firewalld
   ```
  - Restart the firewall:
   ```
  sudo systemctl restart firewalld
   ```
  - Check firewall status:
   ```
   sudo systemctl status firewalld
   ```
  - Enable the firewall at boot:
   ```
   sudo systemctl enable firewalld
   ```
  - Disable the firewall at boot:
   ```
   sudo systemctl disable firewalld
   ```
  -   Open a port (temporary):
   ```
   sudo firewall-cmd --zone=public --add-port=端口号/协议
   ```

  - Open a port persistently (permanent):
   ```
   sudo firewall-cmd --zone=public --add-port=端口号/协议 --permanent
   ```
  - Close a port:
   ```
   sudo firewall-cmd --zone=public --remove-port=端口号/协议
   ```
  - List open ports:
    ```
    sudo firewall-cmd --zone=public --list-ports
    ```
  - Allow a service:
    ```
    sudo firewall-cmd --zone=public --add-service=服务名称
    ```
  - Deny a service:
    ```
    sudo firewall-cmd --zone=public --remove-service=服务名称
    ```
  - List allowed services:
    ```
    sudo firewall-cmd --zone=public --list-services
    ```

- These are some commonly used CentOS 7 firewall commands, used to configure and manage firewall rules. Make sure to run these commands as root or as a user with sudo privileges.

## Linux Networking Basics 6

### 6.1 Port Mapping

- Optical modems and routers generally have their rom hard-coded
- Accessing services on the internal network from the external network

### 6.2 All About ikuai

- 32-bit operating system: maximum memory 4gb
- 64-bit operating system: the limit is much larger, 17,179,869,184 GB — in your dreams...
- Large wireless networks, such as the Bird's Nest
- [WiFi]
- [ssid: xxxx]
- [password: 11111111]
- The ac controls the ap; all aps connect to the ac through a switch, and the ac schedules them automatically — awesome
- The ac is similar to mobile phone roaming
- [Dual-machine hot standby] two ikuai routers connected by a dedicated line in the middle, so that when one fails it quickly switches to the second
- RAID disk arrays are generally not used in ordinary homes; they are usually for servers, to improve write speed
- There are risks too: if one hard disk fails, everything is lost. raid 0 15m 5m 5m 5m [a speed-boost mode that also increases capacity]
  - raid 1 writes two copies for safety: 15m 15m; if one fails you swap in another and data synchronization still happens
  - raid 5 can support n disks and only wastes one disk's worth; it wastes cpu performance, so it counts as a compromise
  - raid 1 + 0, for the wealthy: both performance and safety, at the cost of wasting hard disks
- For looking at servers, generally go to Zhongguancun
  - upnp automatic port mapping
  - vlan virtual local area network

### 6.3 All About vlan

- Dumb (unmanaged) switch
- Managed switch 
- Program-controlled switchboard
- Layer 2 switch: mac addresses
- Layer 3 switch: network layer, IP addresses, with routing capability
- vlan logical isolation [usually physical isolation] can avoid ARP spoofing

### 6.4 VPN Demo
Tunnel through to access the internal network
Below is a simple example diagram of how a VPN (Virtual Private Network) works:

```
          ┌───────────────┐               ┌───────────────┐
          │    Internet   │               │    Internet   │
          └───────────────┘               └───────────────┘
                  │                               │
                  │                               │
          ┌───────────────┐               ┌───────────────┐
          │    VPN 客户端   │               │    VPN 服务器   │
          └───────────────┘               └───────────────┘
                  │                               │
                  │                               │
          ┌───────────────┐               ┌───────────────┐
          │  客户端设备   │               │  目标服务器    │
          └───────────────┘               └───────────────┘

```

How it works:
- VPN client: the VPN client software the user runs on their own device, used to establish a connection with the VPN server.

- VPN server: a server managed by the VPN service provider, used to handle communication between the client and the target server.

- Internet: the public internet, serving as the medium for data transmission.

- Client device: the user's computer, phone, or other device that needs to access the target server through the VPN.

- Target server: the server hosting the specific resource or service the user wants to access.

A VPN works as follows:

- The user runs VPN client software on their local device and enters the required connection parameters, such as the server address, username, and password.
- The VPN client connects to the VPN server over the Internet. This usually uses an encrypted communication protocol (such as OpenVPN, IPsec, etc.) to ensure the security of the connection.
- Once the VPN connection is established, all traffic going through the VPN client is encrypted and transmitted to the VPN server over the Internet.
- The VPN server decrypts the received data and forwards it to the target server.
- The target server returns the requested data to the VPN server.
- The VPN server encrypts the response data again and transmits it back to the VPN client over the Internet.
- The VPN client decrypts the response data and sends it to the user's local device for processing and display.
By establishing a VPN connection, users can create a secure tunnel on the public network, so that their network traffic is encrypted and protected during transmission. This enables functions such as remote access to internal network resources, privacy protection, and bypassing geographical restrictions.
Note that the specific VPN implementation and working principles may differ depending on the protocol and technology used. The diagram above is only a simple example; a real VPN architecture may be more complex.

### 6.5 How to Protect Your WiFi Password

First you need to use the kali system [dedicated to penetration testing]

- Enable wireless monitor mode`airmon-ng start wlan0`[airmon-ng checks the network card's monitor status][monitor][if the signal value is above 65, stop connecting]
[WiFi has ch channels][wpa2 is a wireless network encryption type]
- Scan range `airodump-ng wlan0mon`
- Capture the WiFi handshake packet`airodump-ng --bssid 52:02:05:9D:62:F9 -c 6 -w sxny wlan0mon`( the wifi password is inside the handshake packet)
Manually add the ssid
- Crack the password`aircrack-ng -w top100.txt sxny-02.cap`
- wifi attack`airplay-ng -0 8 -c mac地址 -a mac地址 wlan0mon`

- And that is finally a wrap. The current time is 2024/3/11 0:34:57 
