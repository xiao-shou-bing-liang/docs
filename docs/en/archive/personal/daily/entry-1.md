---
date: 2024-07-10
---

## Sunday, July 7, 2024

### Assembly Language

   I read three chapters of the content, noting the new instructions and the points to remember

   1. Flag register  PSW
      
       - abc and sbb are used for operations on larger bit widths
       
       - cmp is equivalent to subtraction; it does not keep the value, it compares magnitudes
       
       - Six conditional jump instructions: when the condition is met, jmp is taken
       
       - String transfer instructions movsb and movsw + two df-setting instructions cld (forward) and std (backward)
         
         rep repeats a number of times determined by the value in the cx register
       
       - pushf and popf push the value of the flag register onto the stack
    
   2. Internal interrupts
      
       - The 8086 CPU interrupt vector table is stored at 0000:03FF, and the last 256 bytes are empty
       
       - Writing an interrupt handler & the iret instruction
       
         Pops the CS:IP value from the stack as well as the register values
       
         1. Save the registers that will be used
       
         2. Handle the interrupt
       
         3. Restore the registers that were used
       
         4. Return with the iret instruction
       
       - Special interrupt case: ss and sp are best set consecutively
    
   3. int instruction
      
       - The instruction format is: int n, where n is the interrupt type code
       - BIOS interrupt routines
       - DOS interrupt routines

### CTF

   I have always wanted to step through the gate of CTF, and today I finally really read the [Wiki](https://ctf-wiki.org/) and learned about the competition formats and directions. Most importantly, this platform provides a lot of learning resources that can fill in my skill tree

### Blog Modifications

   The previous blog file structure had some problems, so I reconfigured the file paths and beautified it a little. But to truly make my own modifications I still need to learn frontend development; I will deal with that when I have time

## Monday, July 8, 2024

### Assembly Language

   - Ports
     1. In a PC system, the CPU can address at most 64KB different ports, with addresses ranging from 0 to 65535
     2. Ports cannot be read or written with memory access instructions such as mov, push, and pop; only in and out can be used
        > [!WARNING]
        > Only ax or al can be used to hold the data read from a port or the data to be sent to a port. Use al when accessing an 8-bit port and ax when accessing a 16-bit port.
     
     3. CMOS RAM chip
     
        - Contains a real-time clock and a RAM memory of 128 storage units
        - Powered by a battery, so the information in the RAM is not lost
        - The internal clock occupies units 0~0dh to hold time information, while most of the remaining units hold system configuration information for the BIOS program to read at system startup
        - The CPU reads and writes CMOS RAM through two ports inside the chip: 70h (address port) and 71h (data port)
     
     4. shl and shr instructions
       
        If the number of bits to shift is greater than 1, the shift count must be placed in cl
        - shl: logical left shift instruction
        - shr: logical right shift instruction

### Blog Modifications

Today I took a careful look at the rules of Chinese typesetting and found them inspiring, so I spent time re-typesetting what I had written nearly four months ago, when I was not yet proficient with markdown. After that I fixed a few small mistakes. Previously I had only read the parts of the VitePress official documentation that I needed; today I went through everything I could understand, installed a theme style that someone else had made, and used some new Markdown extension syntax. Compared with the very plain look before, it is now much richer


## Tuesday, July 9, 2024

Today the assembly language material finally came to an end. Today I read the official documentation and added a friendly-links feature along with a few links; I feel a bit silly, having spent another hour and a half on it back and forth. Then I worked on the article formatting. I am still torn about whether to give the weekly journal its own separate column, split week by week, adding md files one at a time starting from the first week.

### Assembly Language

1. External interrupts

    - The CPU communicates with external devices through ports

      - Two kinds of external interrupts

        - Maskable interrupts

          When IF=1, the CPU responds to the interrupt after finishing the current instruction; when IF=0, it does not respond to maskable interrupts

          - sti: sets IF=1
          
          - cli: sets IF=0
          
        - Non-maskable interrupts

           > [!IMPORTANT] Note
           >
           > A non-maskable interrupt is an external interrupt that the CPU must respond to.
           >
           > For the 8086 CPU, the interrupt type code of a non-maskable interrupt is fixed at 2.

2. PC keyboard handling

    - Input

      The scan code is sent to port 60h. Releasing a key produces another scan code. Break code = make code + 80h.

      - Make code: produced when a key is pressed

      - Break code: produced when the key is released

      - Triggers interrupt 9: the interrupt type code is 9

      - Executing interrupt 9

        In the BIOS keyboard buffer, one input is stored in one word unit: the high byte is the scan code and the low byte is the character code

        Unit 0040:17 stores the keyboard status byte

   - Direct addressing table
     
     - The beginning introduced a new, simpler way of defining a segment

       ```
       data segment
          a db 1,2,3,4,5,6,7,8
          b dw 0
       data ends
       ```

      - Trading space for time

3. Using the BIOS for keyboard input and disk read/write
    - int 9 and int 16h work in coordination with each other
      
    - How the int 9 interrupt routine handles keyboard input
      - I/O interface
      - Port 60h
      - Data buffer register
      - Memory - keyboard buffer
      
    - The int 16h interrupt routine reads the keyboard buffer. Function 0 is given below:
      
      1. Check whether there is data in the keyboard buffer
      2. If not, keep doing step 1
      3. Read the keyboard input in the first word unit of the buffer
      4. Put the scan code read into ah and the ASCII code into al
      5. Delete the keyboard input that was read from the buffer
      
    - String input
      1. Entering and deleting characters — the stack
      2. After Enter is pressed, string input ends
      3. The string must be displayed while it is being entered
      4. The processing flow of the program
         - Call int 16h to read keyboard input
         - If it is a character, push it onto the character stack and display all the characters in the character stack; then continue with the call
         - If it is the Backspace key, pop one character from the character stack and display all the characters in the character stack; then continue with the call
         - If it is the Enter key, push 0 onto the character stack and return
      
    - Applying the int 13h interrupt routine to read and write disks
      
      There are quite a few entry parameters, so I plan to just get a general understanding of this part and use it later

### ***Blog Modifications***

> [!TIP]  After Painful Reflection
>
> In the end, after careful thought, for better management and easier document lookup, the consideration above was completely necessary, so I spent another hour and a half adding several file structures and rewriting the navigation bar and sidebar to make things clearer

## Wednesday, July 10, 2024

### "The Road to Security: Avoiding Router Traps"

Reading it with a mix of Google Translate and the original English

#### Concepts

The concepts listed here are all ones I am not very familiar with

1. Botnet: a distributed network system composed of a large number of infected computers controlled by hackers. These infected computers are called "bots".
2. Hardcoded credentials: sensitive information such as usernames and passwords is written directly into program code or configuration files rather than obtained dynamically from secure storage. What matters here is mainly understanding the word "hardcoded".
3. UPnP (Universal Plug and Play): a network protocol that allows devices on a local network to discover and connect to each other automatically, without manual intervention. ***UPnP actively exposes device information and may itself contain security vulnerabilities***
4. RCE (Remote Code Execution): a serious security vulnerability that allows an attacker to execute arbitrary code on a remote system. ***RCE vulnerabilities are usually caused by insecure coding practices in software development.***
5. Telnet: a text-based remote login protocol that allows a user to connect to a remote computer over the network and perform interactive operations. ***Communication is not encrypted.***
6. NVRAM: non-volatile random access memory, referring to ***a type of RAM that retains data even after power is removed***
7. HNAP (Home Network Administration Protocol): a protocol used to manage home network devices. It lets administrators or users easily configure and manage home network devices through a web browser or a dedicated application. ***An outdated proprietary protocol***
8. SOAP (Simple Object Access Protocol): an XML-based message transport protocol used for information exchange in distributed environments. It is mainly used to enable communication between applications based on Web services.
9. XML (Extensible Markup Language): a markup language used to describe the structure of data. It is designed for transmitting and storing data, and it is easy for both humans and machines to read and understand.
10. Lua: a lightweight, embeddable scripting language. A scripting language suited to embedded devices, it has broad application prospects in custom network devices and IoT devices.

#### Commands & Functions

1. iptables command: a powerful network firewall and packet filtering tool in the Linux operating system. It allows administrators to control the network traffic entering and leaving the system, and to filter and forward packets according to predefined rules.

2. system function:

   ``` c
   int main(int argc, char** argv)
   {
     setuid(geteuid());//将程序的有效用户ID设置为当前进程的有效用户ID
     system(argv[1]);//接收参数为字符串指针。如果发生错误，则返回值为 -1，否则返回命令的状态。
     return 0;
   }
   ```

   

3. snprintf function:

   ``` c
   int snprintf ( char * str, size_t size, const char * format, ... );
   //str：目标字符串，用于存储格式化后的字符串的字符数组的指针。
   //size：字符数组的大小。
   //format：格式化字符串。
   //...：可变参数，可变数量的参数根据 format 中的格式化指令进行格式化
   //返回值是输出到 str 缓冲区中的字符数，不包括字符串结尾的空字符 \0
   ```

4. execve function: system calls in the exec family replace the current program with the program to be executed, while fork is used to create a process identical to the current one (although it usually executes a different code path). The usual way to run another program while keeping the original program running is fork + exec.

   ``` c
   int execve(const char *filename, char *const argv[ ], char *const envp[ ]);
   //filename：文件路径程+序名
   //argv[ ]：利用数组指针来传递执行文件，并且需要以空指针(NULL)结束
   //envp[ ]：传递给执行文件的新环境变量数组
   ```

   > [!IMPORTANT] Note
   >
   > In the second parameter argv here, argv[0] is usually the path or filename of the executable program, and argv[1] onward are the parameters passed to the executable program. The last element of the parameter array must be NULL (or 0), which marks the end of the parameter array.
   >
   > ```c
   > execve("/bin/iptables", { "/bin/iptables", "-A", "INPUT", "-s", ip_addr_to_block, "-j", "DROP", 0 }, 0);
   > ```
   >
   > A call of this form, with no space-separated commands, can also be executed on Linux

5. strncmp function: used to compare whether the first **n** characters of two strings are equal

   ``` c
   int strncmp(const char *str1, const char *str2, size_t n)
   //str1：要进行比较的第一个字符串。
   //str2：要进行比较的第二个字符串
   //n：要比较的最大字符数
   ```

6. argc and argv: using argc and argv is the standard way to handle command-line arguments in C, and it gives a program a simple yet powerful way to obtain user input

7. sprintf function: sends formatted output to the string pointed to by str

   ``` c
   int sprintf(char *str, const char *format, ...)；
   sprintf(cmd, "ping %s", ip_addr);//这个直接上实例
   //将字符串 ping %s 格式化，将 ip_addr 变量的值替换到格式化字符串中
   //最后用字符串 cmd 来存储格式化的字符串 ping %s
   ```

8. os.system function:

   > [!warning] This is a function in Python
   >
   > It is similar to the system function in C above

9. eval: a function that ***executes a string as an expression and returns*** a result

#### Vulnerability Categories

##### Authentication Bypass

Authentication bypass vulnerabilities are very valuable to an attacker because of the attack surface they open up.

1. ***CVE-2021-32030***: reported an authentication bypass issue on the ASUS GT-AC2900 router

   - Problem

     When you want to log in to the admin panel, the client sends asus_token to the backend server. After receiving the request, the backend server reads ifttt_token from the router's NVRAM and compares it to verify the administrator's identity. But if ifttt_token is empty and asus_token is also empty, verification succeeds directly.

   - Solution

     This was caused by the programmer failing to consider the edge case; there should be a function that ensures ifttt_token is not empty, first ensuring that ifttt_token is not empty before comparing it with the asus-token provided by the client. To be safer, a check for whether asus_token is empty could also be added.

2. ***CVE-2020-8864***: reported an authentication bypass vulnerability on the D-Link DIR-882, DIR-878, and DIR-867 routers

   - Problem

     The function below is used for comparison and verification. If the attacker's input is empty, then strlen returns 0, and this compares the first 0 characters — there is no comparison at all, the strncmp function automatically returns 0, and authentication succeeds immediately.

     ``` c
     strncmp(db_password, attacker_provided_password, strlen(attacker_provided_password));
     ```

   - Solution

     Pass db_password as the strlen argument to the strncmp function.

3. ***CVE-2020-8863***: incorrect implementation of the HNAP PrivateLogin authentication algorithm on multiple D-Link routers leads to an authentication bypass vulnerability.

   - Problem

     When authenticating through HNAP, the server usually generates a PrivateKey from the user's password. However, when an attacker provides an extra PrivateLogin element in the login request, something different happens. The server uses the value of the Username element to generate the PrivateKey instead of the user's password. So any password at all will pass.

##### Command Injection

1. Root cause

   Attacks exploit command syntax and design flaws.

2. Reason for using a shell: convenience.

3. Prevention

   Not all operations need to be executed through shell commands, so avoid doing so unless necessary.

   - Avoid system commands

     Do not use this class of functions at all: system, popen, os.system, subprocess.Popen, etc.

   - Run executables using an argument list

     Use this class of functions: execve, subprocess.Popen, subprocess.run, subprocess.call, etc.

     > [!important] Note
     >
     > fork + exec

   - Lua

     To prevent developers from creating command strings that are easily vulnerable to command injection attacks, the development team can create an execve-like function, but:

     > [!important] Note
     >
     > 1. **Enclose each argument in single quotes**: to prevent command substitution
     >
     > 2. **Escape single quotes within each argument**: so they do not close the single quote before the argument

   - Avoid using eval in shell scripts

     Even if the external calling process is safe, the script code that is ultimately executed may still be exploited, causing security problems such as the system being attacked or information being leaked

### Shell Scripts

I never studied it specifically; when I used Linux before I always learned on the fly. But the article above was getting a bit hard to understand, so I chose to go through the shell content properly on the Rookie Tutorial :joy::joy::joy:

## Friday, July 12, 2024

Yesterday I had a small errand and only studied for two hours; since the time was too short I will not write it up.

### "The Road to Security: Avoiding Router Traps"

#### Concepts

1. ASLR (Address Space Layout Randomization): an operating system security technique used to enhance a system's resistance to attacks
2. PIE (Position Independent Executable): a code compilation technique, usually combined with ASLR (Address Space Layout Randomization) to improve system security.
3. RELRO (Relocation Read-Only): a security hardening technique for ELF executables and dynamic link libraries. Its main purpose is to reduce the attack surface in a program that an attacker can exploit.
4. Stack Canary: a security technique used to detect and prevent stack overflow attacks.
5. NX (No-eXecute): a memory protection technique used to prevent buffer overflow attacks.
6. ASLR  (Address Space Layout Randomization) : a computer security technique used to randomize the layout of a process's address space when a program is loaded, in order to reduce the risk of attacks that exploit vulnerabilities in memory.

#### Functions

1. strcat function:

   ``` c 
   char *strcat(char *dest, const char *src)
   //dest：指向目标数组，该数组包含了一个 C 字符串，且足够容纳追加后的字符串。
   //src：指向要追加的字符串，该字符串不会覆盖目标字符串。
   ```

2. memcpy function:

   ```c
   void *memcpy(void *str1, const void *str2, size_t n)
   //str1：指向用于存储复制内容的目标数组，类型强制转换为 void* 指针。
   //str2：指向要复制的数据源，类型强制转换为 void* 指针。
   //n：要被复制的字节数。
   ```

3. memset function:

   ```c
   void *memset(void *str, int c, size_t n)
   //str：指向要填充的内存区域的指针。
   //c：要设置的值，通常是一个无符号字符。
   //n：要被设置为该值的字节数。
   ```

   

#### Vulnerability Categories (continued)

##### Buffer Overflow

1. Cause

   A common problem when programming in C: stack overflow overwrite. In routers, this error is usually observed when functions that copy memory contents are used.

2. Prevention

   - Use bounded functions for copying

     > [!important] Note
     >
     > When using functions like strncpy or memcpy, a length parameter based on the user's own input should be introduced to determine the length to copy, and the value of length should be decided based on the size allocated for the destination buffer.

   - Pass the buffer size as a function parameter

     When there are multiple levels of function calls, tracking and managing buffer sizes becomes very complicated (especially when they are dynamically allocated).

     > [!important] Note
     >
     > When using the strncpy function, you need to pay special attention to the size of the destination buffer, and make sure to manually add a null character after the copy operation to ensure the string is correctly terminated while avoiding out-of-bounds access.
     >
     > When appending with the strncat function, make sure the destination buffer has enough space to hold the string to be appended and its terminator.

   - Avoid library functions and create and use your own commonly used library functions

##### Format String Errors

printf function, modern C compilers do not use

```c
printf("%s", username);
```

forms like this, they will all report an error, so there is no need to worry

### Shell Scripts

I had class this morning and a small exam this afternoon, so I have not actually finished today's material; this is all I have so far, and I will submit it first
