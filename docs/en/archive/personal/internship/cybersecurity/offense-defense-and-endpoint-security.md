---
date: 2025-08-19
---

# Offense-Defense and Endpoint Security Study Report

## 1. Overview of Offense and Defense Technology

Cybersecurity offense and defense is a core part of protecting the security of information systems, involving multiple dimensions such as the network layer, the application layer, and the host layer. Modern offense-defense confrontation is characterized by "increasingly complex technology, increasingly covert methods, and increasingly sustained confrontation", which requires security personnel to have the comprehensive ability to "know how to attack and be good at defending".

Learning offense and defense technology should follow the path of "theory as the foundation - practice as reinforcement - application in scenarios", focusing on mastering the technical principles of attack methods, the implementation methods of defense measures, and the handling process for security incidents, so as to build a complete security cognition system.

## 2. Common Attack Methods and Principles

### 2.1 Network Layer Attacks

| Attack Type | Technical Principle | Typical Characteristics | Reproduction Environment |
| --- | --- | --- | --- |
| **DDoS attack** | Uses a large number of bot hosts to send massive requests and exhaust the target's resources | Sudden bandwidth spike, slow server response | Virtual machine cluster, hping3 tool |
| **ARP spoofing** | Forges the mapping between IP and MAC to tamper with the network communication path | Network interruption, data being intercepted | LAN environment, arpspoof tool |
| **DNS hijacking** | Tampering with DNS resolution results to point the domain name to a malicious IP | Access to abnormal websites, data leakage | DNS server, dig command |

### 2.2 Application Layer Attacks

| Attack Type | Technical Principle | Severity | Typical Case |
| --- | --- | --- | --- |
| **SQL injection** | Inserts malicious SQL statements to manipulate the database | High | Unfiltered user input leads to data leakage |
| **XSS attack** | Injects malicious scripts to obtain user information | Medium-high | Steals cookies to achieve session hijacking |
| **CSRF attack** | Uses the user's identity to perform unexpected operations | Medium | Forges a transfer request to complete an unauthorized transaction |

### 2.3 Host Layer Attacks

- **Buffer overflow**
    
    Principle: input data exceeds the buffer capacity, overwrites the adjacent memory area, and rewrites the program's execution flow
    
    Key defense points: input validation, use of safe functions, memory protection mechanisms
    
- **Privilege escalation**
    
    Principle: exploits system vulnerabilities or configuration flaws to gain administrator privileges from a low-privilege account
    
    Common paths: kernel vulnerability exploitation, SUID file abuse, service configuration errors
    

## 3. Mainstream Defense Technologies and Solutions

### 3.1 Network Defense System

```
网络防御层级架构
┌─────────────────┐  边界防护
│  防火墙/下一代防火墙  │  控制网络访问、检测异常流量
└─────────────────┘
┌─────────────────┐  入侵检测
│  IDS/IPS系统    │  识别攻击行为、实时阻断威胁
└─────────────────┘
┌─────────────────┐  流量清洗
│  DDoS防护系统   │  过滤恶意流量、保障服务可用
└─────────────────┘
┌─────────────────┐  应用防护
│  Web应用防火墙  │  拦截SQL注入、XSS等攻击
└─────────────────┘
```

### 3.2 Mainstream Security Vendors and Products

| Defense Area | International Vendors | Domestic Vendors | Core Technical Features |
| --- | --- | --- | --- |
| Network security | Palo Alto, Cisco | Huawei, Hillstone Networks | Deep packet inspection, threat intelligence correlation |
| Endpoint security | CrowdStrike, Symantec | Qi An Xin, VenusTech | Behavior analysis, real-time protection |
| Data security | McAfee, IBM | Sangfor, Topsec | Data encryption, access control |

## 4. Core Points of Endpoint Security

### 4.1 Endpoint Security Threat Map

The security threats that endpoints face mainly include:

- **Malicious code infection**: viruses, worms, ransomware, etc.
- **Account security risks**: weak passwords, brute force attacks, credential theft
- **Data leakage risks**: unencrypted sensitive information, abuse of USB devices
- **System vulnerability exploitation**: unpatched operating system and software vulnerabilities
- **Illegal access risks**: access by unauthorized devices, physical contact attacks

### 4.2 Endpoint Security Protection Goals

Endpoint security protection needs to achieve the "four guarantees":

1. Guarantee trustworthy endpoint identity
2. Guarantee safe system operation
3. Guarantee secure data storage
4. Guarantee controllable operation behavior

## 5. Operating System Security Configuration

### 5.1 Windows System Security Hardening

| Security Dimension | Key Configuration Items | Hardening Recommendation |
| --- | --- | --- |
| Account security | Administrator privileges, password policy | Disable the default administrator, enable a strong password policy |
| System services | Unnecessary services, ports | Turn off non-essential services such as Telnet and FTP |
| Security policy | UAC, firewall | Enable UAC, configure inbound/outbound rules |
| Log auditing | Login logs, operation records | Enable security logs, set a log retention period |

### 5.2 Linux System Security Hardening

```bash
# 基础安全配置示例
# 1. 设置密码策略
sed -i 's/PASS_MAX_DAYS\\t99999/PASS_MAX_DAYS\\t90/' /etc/login.defs

# 2. 禁用root远程登录
sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config

# 3. 配置防火墙
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -A INPUT -j DROP

# 4. 启用日志审计
systemctl start auditd
systemctl enable auditd

```

## 6. Endpoint Protection Technology System

### 6.1 Endpoint Security Technical Architecture

```
终端安全防护体系
┌─────────────────┐  基础防护
│  杀毒软件/EDR   │  恶意代码查杀、行为监测
└─────────────────┘
┌─────────────────┐  身份认证
│  多因素认证     │  密码+令牌/生物特征
└─────────────────┘
┌─────────────────┐  数据保护
│  硬盘加密/文件加密 │  BitLocker、FileVault
└─────────────────┘
┌─────────────────┐  补丁管理
│  漏洞扫描/修复   │  自动化补丁部署
└─────────────────┘

```

### 6.2 Endpoint Detection and Response (EDR)

Core capabilities of EDR technology:

- Real-time behavior monitoring: process activity, network connections, file operations
- Anomalous behavior analysis: baseline-based anomaly detection, AI threat identification
- Rapid response and handling: isolate infected endpoints, terminate malicious processes
- Comprehensive traceability analysis: attack path reconstruction, impact scope assessment
