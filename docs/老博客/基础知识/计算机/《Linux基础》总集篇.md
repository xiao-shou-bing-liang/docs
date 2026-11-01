> [!warning] 未严格按照中文排版修订
>
> 这篇属于是比较久远的了，很久也没有所谓的修订过了，趁热打铁就把这篇全部修一遍
>
> 不过修的比较烂，因为当时水平有限，这篇写的格式就比较狗屎，如果真的严格按照中文排版，那工程量相当大，没什么时间，所以就这样吧

## Linux基础 1

终于要开新坑了！争取在这周就把他全部搞完但仔细想想不太现实因为还有数学课 和 数据结构 数据结构真给我整吐了，我是真的！！！！不过接下来几天硬着头皮也得给他啃下来！！！！！！！！！！！

### 1.1 网络安全介绍

- 重心在服务端【windows Linux】
  - 系统层面
  - 软件层面
  - 代码漏洞（web漏洞）
- 护网行动

### 1.2 Linux 系统的由来和介绍

- 操作系统介绍                驱动
用户--》软件————操作系统内核--硬件
  系统软件 应用软件
【系统内核windows nt内核】
- 操作系统：
  - unix（1969年诞生于贝尔实验室）【肯汤普森】
  - 1970年 unix元年
  - 苹果系统 1984
  - windows 1985
  - Linux 1991 林纳斯托瓦兹 Linux内核 1.0/gpl【可以兼容unix软件】
    - uos 基于Linux
    - Linux被称为类unix（开源的 遵循开源协议）
    - 红帽 redhat fedora centos去掉了红帽的商店软件，改用开源软件去代替 最稳定企业服务器操作系统 centos 7 centos 8
    - debian debian ubuntu(乌班图) kali

### 1.3 Linux 安装

- 清华大学开源软件镜像站
老生常谈，配置完了在选择ios镜像文件

### 1.4 远程连接Linux
Linux命令：

- 查看ip地址`ip addr`
- 远程连接Linux：`ssh root@192.168.10.100`
- 退出登录 `exit`

### 1.5 Linux系统的关机和重启

- `shutdown -h now`（时间）
- `reboot`

### 1.6 Linux文件的操作

- 查看目录下有哪些文件：`ls` == list
- 新建文件：touch 文件名 such as：`touch dms.txt`
- `touch {1..10}.txt`创建十个文件。。。
- 删除文件 `rm` 文件名后面能一直叠【`rm b.txt c.txt`以此类推】可以在rm与文件名中间加-f就不问yes/no了（force缩写）
- `ctrl + c`打断命令
- 复制文件：`cp`(只能复制文件) == copy / cp 老文件名 新文件名
- 重命名文件：`mv` == move `mv 老文件名 新文件名`

### 1.7 Linux目录的操作

- 新建目录(文件夹)：`mkdir 目录名`
- 删除目录：rm删不得 `rm -f -r 目录` `rm -rf 目录`
- `cd 目录` 进入目录 / `cd dms`
  - 去上级目录 `cd ..`
- 重命名目录 `mv 老文件名 新文件名`
- 复制目录：`cp -a 老文件名 新文件名`

### 1.8 文件和目录的操作回顾

- `pwd`打印当前完整目录
- windows有好几个磁盘微软估计搞反c:\windows\admins
- 其它系统/（顶级目录）`/root/dms`
  - `touch /root/4.txt`
  - `ls test09.txt`[查看test09.txt是否存在]
  - `ls *.txt`[查看以txt结尾的所有文件]
  - `ls -1`【以一行一个文件的方式显示】
  - `ls -a`（all）【查看所有文件，包括隐藏文件】
  - `ls -a -1`【查看所有文件，以一行一个来显示】
    - .开头是隐藏文件
  - `mv 123.txt /opt`
  - `cp 文件 /opt/`
  - `cp -a dev04 /opt/`
  - `rm /opt/123.txt`
  - `rm -f /opt/test01.txt`
  Linux参数大部分没有先后顺序
  - `mkdir dev{1..100}`
  - `mkdir -p 1/2/3/4/5/6` [创建多级目录]

### 1.9 vi文件编辑器

- 修改文件内容
  - vi三种模式
    - vi 1.txt是常规模式 可以使用大量的快捷键
    - 编辑模式 插入模式 i/a/o 按esc回去
    - 命令模式:wq保存并退出 :q!强制退出【set number 可以看行号】

## Linux基础 2

### 2.1 centos7的图形化界面

- 图形化界面：gui Graphics user interface
- 命令行：   cli  command line interface
- 安装gnome桌面 软件直接全选
- 要会进入root模式

### 2.2 Linux的目录结构

- 目录的分隔符 `/`
- `-/` 代表根目录
- `/bin` 存放二进制的可执行文件，命令，特别重要不能删除
- `/boot` 开机启动需要的文件，特别重要，不能删除
- `/dev` device设备文件，特别重要，不能删除！
- `/etc `存放配置文件，特备重要，不能删除
- `/home` 普通用户的家目录
- `/lib library 32位库`，一般是so结尾，特别重要，不能删除
- `/lib64 library 64位库`，一般是so结尾特别重要，不能删除
- `/media `多媒体
- `/usr` 代表根目录的usr目录
- `/mnt` mount挂载光盘，u盘
- `/opt` 部分软件安装储存目录
- `/proc` process进程，特别重要不能删除
- `/root` root用户的家目录，特别重要，不能删除
- `/run` 运行，程序运行的时候产生的文件
- `/sbin` super bin超级用户才能使用的命令，特别重要，不能删除
- `/srv` 源代码 【源代码-编译-软件，可执行文件，命令】
- `/sys` system系统目录，特别重要，不能删除
- `/tmp` 用来存放临时文件的目录
- `/usr` 用户级的目录，特别重要，不能删除
- `/var` variable 变化的文件，特别重要，不能删除
- log 日志越来越大

### 2.3 相对路径和绝对路径

- 相对路径：不完整路径，从当前目录开始数
  - mkdir dms 相对路径
- 绝对路径：完整路径，从根开始数
  - mkdir /dms 绝对路径
  相对路径方便还是绝对路径方便，看情况根据 / 先后而定

### 2.4 Linux的管道

- `cat` 命令 从上往下顺序查看文本内容 `cat test03.txt`
- `tac `命令 倒着查看`test03.txt`的全部内容
- `head` 命令 什么都不加默认看10行，从头部开始看
- `tail` 命令 从尾部开始看（包括空白行，也是默认10行）
- 管道 `|` 接管道加工`-ip addr|tail -n 4|head -n 1|cut -c 10-24`
  - Linux管道：最强大的功能
  - Linux：实现一个复杂的功能，可以使用多个软件一起处理，开放，自由
  - windows：实现一个复杂的功能，就需要强大的软件

### 2.5 Linux的用户管理

- `useradd dms`(用户名) 新建用户
- `passwd dms` 修改密码
- `passwd` 直接改root密码
- 使用新创建用户登录 `ssh root@ip` 可以多用户登录
  - 新增一个用户需要两个命令
- `w` 可以统计打开了几个终端
- 终端 Linux支持多个用户在多个地方同时登陆一个系统
- `userdel dms` 删除用户(删除用户不会删除他的homw目录)
  - 新建用户会有两个新建目录 家目录 信箱
- u`sermod -L/--lock` 锁定用户 `-U/--unlock` 解锁用户

### 2.6 Linux的用户和密码

- 查看用户uid：id 所有的用户信息都存储在/etc/passwd文件中
  - 所有用户密码都存储在/etc/shadow文件中 也可以覆盖改密码

### 2.7 Linux的用户组讲解和小总结

- 用户组管理
  - 1对1 1对多 多对多
  - 新建用户组 `groupadd test`
  - 指定组来创建用户 `useradd -g test tset1`
  - 删除用户组 `groupdel 组名`(需要把组内所有用户都删除)
  - 修改用户的主组 `usermod -g test dms`
  - 给用户添加多个组 `usermod -g test smd`
  - `echo 123456|passwd --stdin dms`
- 第一种是交互式改密码
- 第二种是非交互式改密码
- `lchage` 查看有没有过期

## Linux基础 3

- `wc -l` 文件名 数行数
- `wc -c` 文件名 数字符
- `exit` 
- `logout`

### 3.1 文件的读写执行权限讲解
第一个字母代表文件类型

- 普通文件 -开头
- 目录文件 d开头
- 快捷方式 l
- ugo权限体系 2-4所属用户权限 5-7所属用户组的权限 8-10 其他人的权限
- . 代表当前目录 ..代表上一级目录
- 可执行程序：要么使用完整路径执行，要么放在特定目录下面

### 3.2 文件和目录的权限

- r 4 / w 2 / x 1 / - 0
- chmod 用于修改文件或目录权限的命令
- chown 改变文件或目录的所有权 修改文件或目录的所有者和所属组的命令
文件权限-r读-w写-x执行
目录权限-r查看目录下有哪些文件 x能否cd进入目录 w对目录下的文件进行增删改
文件默认权限：644 600
目录权限：755 700

### 3.3 Linux文件的属性

- seLinux 美国国家安全局 特别安全--特别麻烦 上面第11位的 . 
  - sestatus 查看seLinux状态
- Linux系列
  - redhat系列：fedora redhat centos eulerOS 阿里龙蜥
  - debian系列：ubuntu debian kali uos
- 第二段的数字，表示该文件的硬链接数量，多开访问入口
ln 原位置 新路径
- Linux时间
  - 访问时间  acess time    
  - 修改时间  modify time    
  - 改变时间  change time
  - stat 3.txt

### 3.4 shell(壳)的命令提示符

- shell是Linux中比较重要的概念
  - `hostname` 修改主机名(临时)
  - `export PS1='[\u@\h \t \w]\$` 可定制的\u用户\h主机名\w相对路径
  - `hostnamectl set-hostname` 主机名(永久修改主机名)
  - `hostnamectl` 查看主机信息

### 3.5 shell命令的格式

- shell基础语法
  - 格式1：只有一个命令1没有参数 ls pwd(显示目录) id
  - 格式2：命令有一个参数 ls -l usermod -h / --help
  - 格式3：命令带多个参数 ls -a -l -h == ls -alh
  - 格式4：命令带参数带一个目标 ls -l /boot /rm -fr /tmp/*
  - 格式5：命令带一个目标 cd /tmp/ / ls /tmp/ /mkdir test
  - 格式6：命令带多个目标 cp 目标一 目标二
  - 格式7：命令带多个参数多个目标 ls -a -l -h /tmp /root
  cp -a -v /root /root2

### 3.6 shell的快捷键

- tab键补全 命令和路径 又快又准
- ctrl + a 光标跳转至正在输入的命令行的首部
- ctrl + e 光标跳转至正在输入的命令行的尾部
- ctrl + c 终止前台运行的程序
- ctrl + d 在shell中，ctrl - d 标识退出当前shell
- ctrl + z 将任务暂停，挂至后台，执行fg命令继续运行
- ctrl + l 清屏，和clear等效
- ctrl + k 删除从光标到行末的所有字符
- ctrl + u 删除从光标到行首的所有字符
- ctrl + r 搜索历史命令，利用关键字
- ctrl + w 光标往前删除一个参数
- esc + . 上一条命令的最后一个参数，或者目标

### 3.7 shell的历史命令

- `history ！+ 编号`(再执行一次历史命令)/命令开头
- `history -c` 清除历史记录(内存)
- `rm -fr .bash_history` 删除主文件夹下.bash_history文件

## Linux基础 4

### 4.1 alias讲解

- 命令别名(花名)
- 意如其字
- 还有unalias 指令
  - `alias rm='echo 禁止删除文件'`
  - `alias `

### 4.2 vi vim 文件编辑器

- vim是vi的加强版
  - 移动光标
    - h,j,k,l 左，下，上，右
    - ctrl-f 下翻一页
    - ctrl-b 上翻一页
    - ctrl-u 上翻半页
    - ctrl-d 下翻半页
    - 0 跳至行首，不管有无缩进
    - ^ 调制行首的第一个字符
    - $  跳至行尾
    - gg 跳至文首
    - G 跳至文尾
    - 5gg/5G 跳至第五行
  - 删除复制
    - dd 删除光标所在行 使用 u 撤销 使用 ctrl + r 恢复
    - 6dd 从光标开始往下删除6行
    - dw 删除一个单词
    - 粘贴粘贴板的内容到当前行的下面
    - 粘贴粘贴板的内容到当前行的上面
    - yy 复制行
      - 5yy 复制五行
  - 搜索和替换
    - /pattern 向后搜索字符串pattern 辅助n和N
    - ?pattern 向前搜索字符串pattern 辅助n和N
    - u直接撤销 
    - :%s/old/new/g 搜索整个文件，将所有的old替换为new
    - :%s/old/new/gc 搜索整个文件，价格所有的old替换为new，每次都要你确认是否替换 中间的符号/可以被最上排的任意一个替换!@#$%^&*
    - :w 保存
    - :wq 保存并退出
    - :x 保存修改并退出
    - :q 退出，如果对缓冲区进行过修改，则会提示
    - :q! 强制退出，放弃修改
    - 删除单个字符 x  也可以10x

### 4.3 Linux输入输出重定向

- 输出
  - \> 重定向，将命令执行结果不输出到屏幕上，输出到文件里，会清空原文件
  - \>> 追加重定向，不会清空原文件
- 输入
  - < 输入重定向
  - << 输入追加重定向

### 4.4 文件的压缩和解压

- `tar -zcf 压缩路径 目标1 目标2 ..`
- `tar -cf 归档路径 目标1 目标2 ..`
- `tar -zxf` 解压
- `tar -tf` 查看压缩包内容
不同的压缩包格式，需要用不同的命令来解压
- `gzip 目标1 目标2`
- `gzip -d 压缩文件1 压缩文件2`
- `zip -r 1.zip dms.txt services`
- `unzip 1.zip`
解压rar包需要安装软件
- `yum install epel-release -y`
- `yum install unar -y`
- `unar -o /opt 456.rar` 解压

### 4.5 Linux文件传输

- Linux———Linux scp传输 双方必须都跑ssh服务端
- Linux———windows win可以单向传输scp xftp双向 rz-sz 
  - 下载文件 wget curl
  - curl -0 下载链接
  - wget 下载链接

## Linux基础 5

### 5.1 编译安装nginx
windows(商业闭源)的软件

- 单个exe文件
- 绿化软件 idm
- 安装包
- 源代码 c++ 编译

- Linux(nginx)
  -依赖文件
    - y`um install -y gcc-c++ pcre pcre-devel zlib zlib-devel openssl openssl-devel` (安装依赖)
    - `tar xf nginx-1.20.2.tar.gz` (mmd直接官网下载用xftp传过来,这步是解压)
    - `cd nginx-1.20.2` (进入目录)
    - auto     CHANGES.ru  configure  html     man     src
  CHANGES  conf        contrib    LICENSE  README (以下两步ls查看文件变化)
    - auto     CHANGES.ru  configure  html     Makefile  objs    src
  CHANGES  conf        contrib    LICENSE  man       README
    - `make`(编译)
    - `make install`(安装)
    - `yum install tree -y`(安装树状图查看文件)
    - `ls /usr/local/nginx`
    - `tree /usr/local/nginx`(对比看看)
    - `systemctl stop firewalld`(停止防火墙服务)
    - `systemctl disable firewalld`(取消防火墙的开机自启)
    - `/usr/local/nginx/sbin/nginx`(运行，并用宿主机访问虚拟机ip)
      ```
       Welcome to nginx!
       If you see this page, the nginx web server is successfully installed and working. Further configuration is required.
      
       For online documentation and support please refer to nginx.org.
       Commercial support is available at nginx.com.
      
       Thank you for using nginx.(成功)
      ```

### 5.2 rpm和yum安装

- `cd /usr/local`
- `tar -zcf /tmp/nginx_dms.tar.gz nginx`(您的命令将使用tar命令将nginx目录打包并压缩为/tmp/nginx_dms.tar.gz文件)
- `cd /tmp/`
- `scp nginx_dms.tar.gz root@192.168.10.3:/tmp`
登陆另一台虚拟机，进入tmp目录查看文件是否存在
- `mv nginx_dms.tar.gz /usr/local/` (移动并进入查看)
- `tar -zxf nginx_dms.tar.gz`
- `/usr/local/nginx/sbin/nginx` 
  - redhat:rpm (redhat package manager)
  - debian:deb
   移动回root
- `curl -o tree.rpm https://mirrors.tuna.tsinghua.edu.cn/centos/7/os/x86_64/Packages/tree-1.6.0-10.el7.x86_64.rpm`
- `rpm -ivh tree.rpm` 安装
- `tree`(查看效果)
- `rpm -e tree` 卸载软件
- 安装的一些问题
  - 安装依赖麻烦有时候需要上百个依赖很是难受
  - 源码编译：可以定制，难度太大
  - rpm：不能定制，安装方便
  - yum：自动解决rpm依赖包的问题(自动配的)

### 5.3 find文件查找

- 普通查询
  - `find   /etc   -maxdepth 1  -type f  -name "pa*"` 
  - 命令   目录... 查找深度      类型      文件名称

- 按照文件大小查找(kmg三个单位)
  - `find / -type f -size +100M`(查找大于100m的文件)
  - `find /root/ngnix-1.20.2 -type f -size -2k`(查找小于2k的文件)
  - `find /type f -size +50M -and -size -100M`(查找大于50m小于100m的文件)

- 访问时间 Access 每查看一次文件内容，时间就会更新
- 修改时间 Modify 文件的内容变化了，时间就会更新
- 改变时间 Change 文件的属性(文件权限，文件的属和属组，文件大小)变化了，时间就会更新
操作如下
- `find /var/ -type f -mtime +1 -and -mtime -7`
- `find /var/ -type f -mmin -7` (最近七分钟+的话是超越最近七分钟)

- 根据用户查
  - `find / -group root`
  - `find / -user root`
- 后面 也可以接`-exec rm -fr {} \;`
  - `\` 转义符                                                     
- `find /root -type f -name "*.cfg" -exec cp {} /tmp \;`

## Linux基础 6

### 6.1 进程管理

- 程序：文件 静态
- 进程：正在运行的程序(process)
  - `ps -ef`
- uid pid(子) ppid(父) c stime(开始时间) tty
  - `yum provides pstree`(通过查找哪个软件包提供pstree命令)
  - `yum install psmisc-22.20-17.el7.x86_64`
- 杀进程
  - `kill pid`(kill -9 pid慎用)
  - `pkill` 进程命令(批量杀容易误伤...)(pkill -9 强杀直接删文件)

### 6.2 查看硬件和进程信息

  - `top` 查看计算机的cpu，内存，进程等信息 (按1能查看有几颗cpu)
  - `free -h` 查看内存命令
  - `df -h` 查看硬盘命令
  - `lscpu` 查看cpu
    -` zombie` 僵尸进程
- memory 内存 id cpu占用率
- swap 虚拟内存：把硬盘上的一块空间当作内存来使用

### 6.3 定时任务

- 定期执行任务(执行命令)
- 分 $\quad$时 $\quad$日$\quad$月 $\quad$周 $\quad$ cmd
- 1-60  0-23  1-31  1-12   1-7   执行任意任务
  - `crontab -l`(查看定时任务)
  - `crontab -e`(编辑定时任务)
- 定时任务语法
  - `* * * * * date >>/tmp/time.txt`(追加重定向)
  - `cat /tmp/time.txt`
  - `tail -f /tmp/time.txt`
  - `*/5 * * * *`(每隔五分钟打一次)
  - `01 20 1 1 *`(每年一月一日晚上八点零一执行一次命令)
  - `00 20 1,15 1,3,5 *` 
  - `date +%F`(年月日)
  - `date +%T`(时分秒)
  - `date +%F\ %T`(上面两个一起执行并且\转义符用空格隔开)
- 查命令绝对路径 `which` 命令

### 6.4 Linux系统优化

- 优化ssh
  - `vi /etc/ssh/sshd_config`
  - 79行：`GSSAPIAuthentication no`
  - 115行：`UseDNS NO`
  - `systemctl restart sshd`
- 优化seLinux
  - `vi /etc/seLinux/config`
  - 7行 `SELinux=disabled`
  - `setenforce 0` 立即生效,临时的
- 关闭防火墙
  - `systemctl stop firewalld`
  - `systemctl disable firewalld`
- `yum install lrzsz vim tree wget net-tools screen tcpdump bash-completion -y`
- ifconfig
  - ifconfig ens33
- `rpm -qa`
- `rpm -ql net-tools`
- 开始使用screen窗口
  - 查看screen窗口 `screen -ls`
  - 恢复screen窗口 `screen -r`
  - screen: 启动一个新的 screen 会话。
  - `screen -S session_name`: 启动一个新的 screen 会话，并为会话 指定一个名称。
  - `screen -ls`: 列出当前运行的所有 screen 会话。
  - `screen -r session_name`: 恢复/重新连接到指定名称的 screen 会话。
  - `screen -d session_name`: 分离/断开指定名称的 screen 会话，使其在后台运行。
    快捷键
    - Ctrl+a c: 在当前的 screen 会话中创建一个新的窗口。
    - Ctrl+a n: 切换到下一个窗口。
    - Ctrl+a p: 切换到上一个窗口。
    - Ctrl+a d: 分离/断开当前的 screen 会话，返回到原始终端。
    - Ctrl+a k: 关闭当前窗口或终止当前的 screen 会话。

### 6.5 Linux服务管理

- 软件：
- 客户端软件 wget 用的时候打开一下
- 服务端软件 nginx 一直开着，服务 开机自启，重启服务，启动服务，停止服务，停服，服务挂了，服务宕机，gg

- 安装服务：
  -` yum install httpd -y`
  - `systemctl start httpd.service` 启动服务
  - `-systemctl status httpd.service` 查看服务状态
  - `systemctl stop httpd.service` 停止服务
  - `systemctl restart httpd.service` 重启服务
  - `systemctl enable httpd.service` 开机自启 
  - `systemctl disabled httpd.service ` 取消开机自启
    一些常用命令
    - `start` 启动
    - `stop` 停止
    - `restart` 重启
    - `enable` 设置开机自启
    - `disabled` 取消开机自启
    - `reboot` 重启
  - 服务器通电自启

  - `mv momomo.tar /var/www/html`
  - `cd /var/www/html`
  - `tar xf momomo.tar`
  - `systemctl restart httpd.service`
  - `192.168.10.100/moviesite-master` 宿主机访问

## Linux基础 7

### 7.1 作业讲解

- `crontab -e`
- `00 00 \* \* _ tar zcf /tmp/111.tar.gz /var/log/messages`
- `date -s '23:59:40'`
- `00 00 _ \* \* tar zcf /tmp/111.tar.gz /var/log/messages 2>/dev/null` (/dev/null 是一个特殊的设备文件，它会将所有写入它的内容丢弃，相当于将错误输出丢弃)
- `alias wget='echo 禁止使用 wget 下载文件'`
- `yum install php-fpm -y`
- `systemctl start php-fpm`
- `systemctl status php-fpm`
- `exec` 是 find 命令中的一个选项，用于在找到的文件上执行指定的命令。它的语法如下
- `find /var/ -type f -name "\*.txt" -exec rm {} \;` -这个命令将在/var/目录下查找所有扩展名为.txt 的文件，并将找到的每个文件都传递给 rm 命令进行删除

### 7.2 Linux 的特殊符号 -注释 #

- ; 命令分隔符
- .. 代表上级目录 有些漏洞就要用 cd ../../../
- . 代表当前目录
- "" 双引号换行
- '' 单引号换行
- 查看系统环境变量 env
- `export LANG=en_US.UTF-8` (修改英文)
- / 路径分隔符
- \ 转义符
- ` 反引号 嵌套命令
- ! 历史命令调用
- - 通配符
- $ 调用变量 $HISTSIZE
- `< << > >>` 重定向
- || 第一个命令失败执行第二个
- && 如果第一个失败了第二个也不执行
- & 放后台运行
- ~ 家目录

### 7.3 三剑客和正则表达式 -溯源 日志

`cd /var/log/`

#### 7.3 - 1 grep

- grep(擅长过滤) -可以在 /etc/passwd 中查看用户数量
- `grep 'Failed password' /var/log/secure`
- `wc -l` (统计行数字节数等等) -参数
- n 行号
- c 对结果行计数
- i 不区分 大小写
- v 反向搜索，取反
- w 精确匹配
- o 只显示匹配的结果
- A1 同时打印搜索结果行的后一行
- B3 同时打印搜索结果行的前三行
- C2 同时打印搜索结果行的上下各两行
- E 扩展正则表达式
- P 使用 perl 正则
- `grep -n 'tcp' test.txt`
- `grep -c 'tcp' test.txt`
- `grep -n 'tcp' test.txt | wc -l`
- `grep -w 'tcp' test.txt`
- `grep -o 'tcp' test.txt`
- `grep -o -w -E '..p' test.txt`

#### 7.3 - 2 sed

- sed(擅长修改)
- `sed [-nri] [动作] 目标文件 -动作说明[n1[,n2]]function`
- n1 n2 一般为行号
- n 使用安静(silent)模式。在一般 sed 的用法，所有来自 STDIN 的数据一般都会被列出到终端上。但如果加上-n 参数后，则只有经过 sed 特殊处理的哪一行(或者动作)才会被列出来
- r sed 的动作支持的是延伸性正规表示法的语法(默认是基础正规表示法语法)
- i 直接修改读取的文件内容，而不是输出到终端
- function
  - `a` 指定行后面插入一行
  - `d` 删除
  - `i` 指定行前面插入一行
  - `p` 打印，一般和前面的-n 参数一起用
  - `s` 替换 需要 I 忽略大小写，全局替换需要 g
- `sed -i 's#3a#3#g(I)' 1.txt`
  - `sed`：命令本身。
  - `i`：表示直接修改文件。
  - `'s#3a#3#g'`：是替换操作的模式，其中：
  - `s`：表示替换操作的命令。
  - `#`：用作分隔符，可以替换为其他字符，常见的分隔符有 /。
  - `3a`：要被替换的字符串。
  - `3`：替换后的字符串。
  - `g`：表示全局替换，即替换所有匹配的字符串，而不仅仅是第一个匹配。
  - `1.txt`：要修改的文件名。

#### 7.3 - 3 awk

- awk(擅长取列)
- `awk '{print ($1,)$NF}' test.txt`(还能倒过来重新排版$NF,$1)
- `awk '{print $1" 总价值:",&2\*$3}' 3.txt` -赋值 = -判断 ==
- `awk 'NR>0 && NR<3' 3.txt`
- `awk -F ":" '{PRINT $7,$1}' /etc/passwd`
- `awk -F ":" '{print $1":123:"$7}' /etc/passwd`
- `awk -F ":" '$1~/h/{print $1,$7}' /etc/passwd`(第一列里面带 h 的)


## Linux基础 8 正则表达式

### 8.1 什么是正则表达式？ 

- 简单地说，正则表达式就是一套处理大量的字符串而定义的规则和方法 例如：假设@代表 12345 -通过正则表达式这些特殊符号，我们可以快速的过滤替换需要的内容
- Linux 正则一般以行为单位处理

### 8.2 正则表达式

- ^word 表示搜索以 word 开头的内容
- word$ 表示搜索以 word 结尾的内容
- ^$ 表示空行，不是空格
- . 代表且只能代表任意一个字符
- \ 转义字符，让有着特殊身份意义的在字符，脱掉马甲，还原原型。例如：\. 只表示小数点，还原原始小数点的意义
- _ 重复 0 个或多个前面的一个字符。不代表所有了。
- ._ 匹配所有的字符。^.\*任意多个字符开头
- [abc] 匹配字符集合内任意一个字符[a-z]
- [^abc] ^ 在中括号里面表示非，不包含 a 或 b 或 c
- {n,m} 重复 n 到 m 次，前一个字符
- +重复 1 次到多次
- ? 重复零次到多次
  速记记者 -谈话--速记方法--还原文字
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

`sed` 是一个流编辑器，用于对文本进行编辑和转换。`sed` 命令中的 `'s/#.*//g'` 是一个替换操作，它的作用是删除行中的注释部分。

现在来解释具体的命令 `'s/#.*//g'`：

- `s/`：这是 `sed` 命令的替换操作符的开头。
- `#.*`：这是一个正则表达式模式，表示匹配以 `#` 开头的注释部分，以及紧随其后的任意字符（`.*` 表示匹配任意字符的序列）。
- `//`：这是替换操作符中的替换部分，为空，表示将匹配到的部分删除。
- `g`：这是替换操作符的标志，表示全局替换，即将匹配到的所有地方都进行替换，而不仅仅是每行的第一个匹配。

综合起来，`sed 's/#.*//g' 3.txt` 命令的作用是将文件 `3.txt` 中每一行中的注释部分（以 `#` 开头的部分）全部删除，即将其替换为空。

例如，假设 `3.txt` 文件内容如下：

```
This is a line of text.
# This is a commented line.
Another line of text # with a comment.
```

运行 `sed 's/#.*//g' 3.txt` 命令后，`3.txt` 文件的内容将被修改为：

```
This is a line of text.

Another line of text
```
可以看到，注释部分被成功删除，只保留了没有注释的文本。

grep -E '[0-9.]{7,15}' secure
`grep -E '[0-9.]{7,15}' secure` 是一个在文件 `secure` 中进行匹配的 `grep` 命令。它使用了正则表达式来查找具有特定模式的文本。

现在来解释具体的命令 `grep -E '[0-9.]{7,15}' secure`：

- `grep` 是一个用于在文件中搜索匹配模式的命令。
- `-E` 标志表示使用扩展的正则表达式进行匹配，这样可以使用更多的正则表达式元字符。
- `[0-9.]` 是一个字符集，表示匹配数字和句点（`.`）字符。
- `{7,15}` 是量词，表示前面的模式（字符集）可以重复出现 7 到 15 次。

综合起来，`grep -E '[0-9.]{7,15}' secure` 命令的作用是在文件 `secure` 中查找连续出现 7 到 15 个数字和句点字符的文本。

例如，假设 `secure` 文件内容如下：

```
This is a secure log file.
IP address: 192.168.0.1
Invalid login attempt from 10.0.0.123
Access denied for user 203.45.67.89
```

运行 `grep -E '[0-9.]{7,15}' secure` 命令后，将会输出匹配到的文本行：

```
IP address: 192.168.0.1
Invalid login attempt from 10.0.0.123
Access denied for user 203.45.67.89
```
- 可以看到，匹配到了所有包含连续 7 到 15 个数字和句点字符的行，即包含了 IP 地址信息的行。
精确过滤 ip 地址
- `grep -Eo '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}'`
过滤不了非法 ip 地址`(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)`

## Linux基础 9

三个权限后面作为分支单另开的
八进制赋权 以后抽空搞一搞这个

### 9.1 Linux 运行级别 

- 在Linux中，运行级别（Runlevel）是指操作系统启动时所处的特定模式或状态。每个运行级别代表了一组预定义的系统配置和服务，它决定了哪些进程会在系统启动时启动，并且可以影响系统的行为。

- 传统上，Linux系统使用以下运行级别：
  - 0 - 关机（系统停机）
  - 1 - 单用户模式（只有一个用户登录，用于系统维护和故障排除）
  - 2 - 多用户模式，没有网络服务（不提供网络服务）
  - 3 - 多用户模式，完整的多用户命令行模式（提供完整的命令行界面，包括网络服务）
  - 4 - 保留，未使用
  - 5 - 多用户模式，图形界面模式（提供图形用户界面，通常是基于X Window System）
  - 6 - 重新启动（系统重启）

- 不同的Linux发行版可能对运行级别的定义有所差异。例如，一些发行版可能使用运行级别4来定义不同的配置，如网络服务或其他自定义配置。
- 可以使用以下命令来查看当前Linux系统的运行级别：
  - 查看运行级别 `runlevel`
  - 切换运行级别 `init` （such as `init 6`）
  - 查看运行级别 `systemctl get-default`
  - 设置运行级别 `systemctl set-default graphical.target` #设置默认运行级别为图形
  - 设置运行级别 `systemctl set-default multi-user.target` #设置默认运行级别为命令行

### 9.2 权限掩码 

- 修改文件 vim /etc/profile
- root 默认权限码是 022 -普通用户 默认权限码 002

3. s 权限讲解
- suid 其他用户，拥有该文件的属主的执行权限
- sgid 其他用户，拥有该文件属组的气压表宣布 locate
- sticky 粘滞位 很多用户共同使用的目录，实现用户之间不能互相删除改变对方的文件的权限

### 9.3 su 和 sudo 讲解

- `su==switch user`
- `sudo==superuser do`

- 建议带 -
  - `such as su - zhangsan`(能直接进入根目录)

- visudo
  - 100 行后面，增加一行
  - 配置/etc/sudoers
  - zhangsan   ALL   /usr/sbin/reboot,/usr/bin/vim

- 以下为vim sudo提权

- 在 Vim 编辑器中使用 `sudo` 提权的常见方法是通过将文件以只读方式打开，然后使用 `:w !sudo tee %` 命令以管理员权限保存更改。
  -下面是执行此操作的步骤：
  - 1. 打开终端并输入以下命令以编辑文件（假设文件名为 `example.txt`）：vim example.txt
  - 2. 在 Vim 编辑器中，按下 `Esc` 键以确保处于命令模式。
  - 3. 输入以下命令以将文件以只读方式打开：
     :set readonly
        这将将文件设置为只读模式，防止直接保存。
  - 4. 输入以下命令以保存文件并使用 `sudo` 权限：
     :w !sudo tee %
      这将提示你输入密码以进行身份验证。输入密码后，Vim 将使用 `sudo` 命令保存文件。
  - 5. 输入完密码后，按下 `Enter` 键。如果密码正确，Vim 将以管理员权限保存更改。
- 请注意，使用 `sudo` 提权保存文件时需要小心。确保你了解正在编辑的文件以及对其进行的更改。此外，使用 `sudo` 提权时要谨慎，确保仅在必要时以 root 权限运行命令。
- 另外，也可以在终端中使用 `sudo vim` 命令直接以管理员权限打开文件。这样，你可以在 Vim 中直接编辑并保存文件，无需特殊命令来提权保存。但同样需要谨慎操作，避免不必要的更改。

- sudo find . -exec /bin/bash \;

- 执行`sudo find . -exec /bin/bash \;`命令将对当前目录及其子目录中的所有文件执行一个交互式的 Bash Shell。
解释一下这个命令的各个部分：
  - `sudo`: 这个命令用于以超级用户（root）权限执行后续的命令。它要求用户输入密码进行身份验证。
  - `find .`: 这个命令用于在当前目录（以及其子目录）中查找文件和目录。
  - `-exec`: 这个选项用于在找到的每个文件上执行后续的命令。
  - `/bin/bash \;`: 这个部分是要执行的命令。在这里，我们指定了`/bin/bash`作为要执行的命令，`\;`表示执行完整个命令后终止。

- 通过这个命令，`find`命令会递归地遍历当前目录及其子目录中的所有文件，并对每个文件执行一个交互式的 Bash Shell。这将为你提供一个可以在每个文件上执行命令或进行交互操作的环境。你可以在 Bash Shell 中执行任意的命令，包括浏览文件内容、编辑文件、执行其他脚本等。

- 需要注意的是，使用这个命令需要谨慎，特别是在对整个文件系统执行时。确保你了解要执行的操作，并且明确知道它们对系统的影响。使用`sudo`命令时要小心，确保仅在必要时以 root 权限运行命令。

- `sudo awk 'BEGIN {system("/bin/bash")}' test`

- 使用 `sudo awk 'BEGIN {system("/bin/bash")}' test` 命令可以在具有适当权限的情况下，通过 Awk 命令执行一个交互式的 Bash Shell。
 解释一下这个命令的各个部分：
  - `sudo`: 这个命令用于以超级用户（root）权限执行后续的命令。它要求用户输入密码进行身份验证。
  - `awk`: 这是一个文本处理工具，它按行处理文本文件，并根据指定的规则执行相应的操作。
  - `'BEGIN {system("/bin/bash")}'`: 这是 Awk 的一个脚本代码块，它在 Awk 开始处理输入之前执行。`system("/bin/bash")` 的作用是执行 `/bin/bash` 命令，从而启动一个交互式的 Bash Shell。
  - `test`: 这是作为 Awk 命令的输入文件。
- 通过这个命令，Awk 命令会执行指定的脚本代码块，并在开始处理输入之前执行 `/bin/bash` 命令，从而启动一个交互式的 Bash Shell。你可以在这个 Bash Shell 中执行任意的命令，包括浏览文件内容、编辑文件、执行其他脚本等。
- 需要注意的是，使用这个命令需要谨慎，特别是在使用 `sudo` 提权时。确保你具有适当的权限，并且明确知道你将在 Bash Shell 中执行的操作。使用 `sudo` 命令时要小心，确保仅在必要时以 root 权限运行命令。

- 所以他奶奶的
  - `cp`
  - `mv`
  - `vi`
  - `sed`
  - `chmod` 改shadow文件权限 改成777 编辑完改为 000
- 各种各样的sudo提权，只有你想不到没有他做不到
- 当然一切的前提都是sudo权限给人了(配置/etc/sudoers)
- `/etc/shadow` 是一个位于 Linux 系统中的重要文件，它存储了用户的加密密码信息
  - `sudo -l` 查看授权命令
  - `sudo cmd` 以授权的方式去执行命令

### 9.4 脏牛提权

- `https://github.com/gbonacini/CVE-2016-5195`

- `cat /etc/redhat-release`
  
  查看系统版本号
  
- `上传文件 脏牛提权.zip`

- `unzip 脏牛提权.zip`

- `cd CVE-2016-5195-master/`

- `make`

- `./dcow -s`

### 9.5 三大提权

#### Linux基础 9.5 - 1 suid 详解(狗屎版这个讲的不太好)

- `find / -user root -perm -4000 -exec ls -ldb {} \`;
- `find`：用于查找文件和目录的命令。
- `/`：指定要搜索的起始路径为根目录（整个文件系统）。
- `-user root`：指定要查找的文件所有者为 root 用户。
- `-perm -4000`：指定要查找的文件权限模式以 4 开头（Setuid 位）。
- `-exec ls -ldb {} \;`：对每个找到的文件执行 ls -ldb 命令，其中  -ldb 选项用于以详细格式显示文件属性。
  


- "perm" 是 "permissions"（权限）的简写形式。在计算机系统中，文件和目录都有一组权限，用于确定谁可以对其进行读取、写入和执行操作。
- 在 Linux 和类 Unix 系统中，每个文件和目录都有权限位，用于指定对应的读取、写入和执行权限。权限位通常以三位数字表示，分别代表所有者权限、组权限和其他用户权限。
- 每个权限位可以有以下几种取值：
  - "r"：读取权限（read）
  - "w"：写入权限（write）
  - "x"：执行权限（execute）
- 这些权限位可以组合在一起，形成一个三位数的权限模式。例如，"rwx" 表示读取、写入和执行权限都被授予，而 "rw-" 表示读取和写入权限被授予，但没有执行权限。
- 在命令行中，可以使用诸如 `chmod` 等命令来更改文件和目录的权限。例如，`chmod 755 file.txt` 将文件 "file.txt" 的权限设置为所有者具有读取、写入和执行权限，而组和其他用户只有读取和执行权限。
- 在上述命令中提到的 `-perm` 参数用于 `find` 命令，它允许你指定要查找的文件的特定权限模式。例如，`-perm -4000` 表示查找具有 Setuid 位的文件（权限模式以 4 开头）。

- "exec" 是 "execute"（执行）的缩写，表示执行一个可执行文件或命令。
例如，在 Linux 系统中，你可以使用以下命令执行一个程序：
- `exec program_name`
- 这将使当前进程被替换为指定的程序，并且该程序将成为新的当前进程。在执行期间，原始进程的状态将被丢弃，而新程序将继续执行。
- 另外，`-exec` 是 find 命令中的一个选项，用于在找到的文件上执行特定的命令。例如，在 find 命令中使用 `-exec` 选项可以对每个找到的文件执行指定的命令。例如：
- `find /path/to/directory -name "*.txt" -exec ls -l {} \;`
- 上述命令将在指定目录下查找所有以 ".txt" 结尾的文件，并对每个文件执行 ls -l 命令，从而显示每个文件的详细信息。在这种情况下，{} 将会被替换为找到的每个文件的路径。

- 提权步骤
- 信息收集
  - 用户权限收集(`whoami` & `id`)
  - suid权限文件收集(`find / -user root -perm -4000 -exec ls -ldb {} \;`)
- 提权
  - 目录切换
  - find文件所属者和所属组都为root用户，使用find命令可以执行其它的系统命令，因此可以使用find命令运行whoami查看当前用户。执行命令c`d  /tmp`，切换目录。
  - 任意文件创建
  - 创建任意文件，这里执行命令touch 1，创建文件1
  - 特定suid提权(find/nmap/bash等 文件名 -exec whoami \;)
  - 执行命令`find 1 -exec whoami \;`，利用find命令查找名为1的文件，执行whoami命令，如图所示，当前用户为root，从而提升权限成功



- 以下才是真东西
- suid 权限详解(上面那个多少有点搞笑)
- 在介绍这个权限之前需要了解一些问题
  - 1、普通用户可不可以修改密码？
  - 答：是可以的，可以修改自己的密码
  - 2、`/etc/shadow` 文件的作用是什么？
  - 答：存储用户密码的文件
  - 3、`/etc/shadow` 文件的权限是怎么样的？
  - 答：`-. 1 root root 1627 5月 17 00:10 /etc/shadow`
  - 4、普通用户是否可以修改`/etc/shadow` 文件？
  - 答：不可以，因为这个文件对于普通用户来说，没有任何权限，所以不能读取，也不能写入。
  - 5、那么普通用户，为什么可以修改密码？
  - 答：
    - ①因为使用了`passwd` 这个命令
    - ②`passwd`命令在属主权限位上，原本是x权限，变成了s权限
    - ③s权限在属主权限位，又叫做SetUID权限，简称SUID
    - ④作用：因为在使用有SUID权限的文件或命令时，会以该文件的属主身份去执行该命令。

- suid 作用详解
- 概念：只要一个命令文件在属主权限位上的x变成s的话，那么其它用户在执行这个命令文件时，就会以该命令文件的属主用户身份去执行。
  -如果该属主权限位上有执行权限，则会显示（小写）s。
  -如果该属主权限位上没有执行权限，则会显示（大写）S。

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
- 此时，再引入一个问题，如果普通用户在使用passwd命令时，是以root用户身份去执行的话，那普通用户是不是可以修改其它用户的密码？
- 答：是不可以的，因为在passwd命令中，存在一种判断，此判断会在执行passwd命令时去判断执行的用户时是root还是普通用户，如果是普通用户，那么只能使用passwd命令，后面不可加上参数，如果是root用户，后面才可加上其它参数（参数就是用户）。那么普通用户就无法进行修改其它用户的密码。

- 授权suid
  - 授权方式
  - `chmod   u+s     filename`
  - `chmod   4xxx    filename`

- 实例如下
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
- 或者以下方式
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

- SUID总结
  - ①让普通用户对可执行的二进制文件，临时拥有二进制文件的属主权限
  - ②如果设置的二进制文件没有执行权限，那么SUID的权限就显示为S（大写）
  - ③特殊权限suid仅对二进制可执行程序有效，其它文件或目录无效。
- 注意： suid不安全，如果使用了普通用户可以使用属主用户的权限，那么普通用户在执行对应命令文件时，就可以任意查看或修改文件内容，比如修改了etc/sudoers 文件，那普通用户相当于超级用户的复制品

#### Linux基础 9.5 - 2 sgid 详解

这个也属于是拉满了
- sgid
  默认情况(不使用sgid)

- 假设tom和jerry属于同一工作组，他们使用的文件，都放在同一个目录下，可以这样设置:
  ```
  [root@centos7u6 tmp]# groupadd  workgroup
  [root@centos7u6 tmp]# usermod -a -G workgroup tom
  [root@centos7u6 tmp]# usermod -a -G workgroup jerry
  [root@centos7u6 tmp]# id tom
  uid=1004(tom) gid=1004(tom) groups=1004(tom),1006(workgroup)
  [root@centos7u6 tmp]# id jerry
  uid=1005(jerry) gid=1005(jerry) groups=1005(jerry),1006-(workgroup)
  ```
  创建一个共享目录，并将目录的属组改为workgroup
  ```
  [root@centos7u6 tmp]# mkdir /tmp/test_SGID
  [root@centos7u6 tmp]# ls -ld test_SGID/
  drwxr-xr-x 2 root root 6 Mar 30 11:09 test_SGID/
  [root@centos7u6 tmp]# chown :workgroup /tmp/test_SGID/
  [root@centos7u6 tmp]# ls -ld test_SGID/
  drwxr-xr-x 2 root workgroup 6 Mar 30 11:09 test_SGID/
  ```
  需要给/tmp/test_SGID目录的属组赋予写权限，否则，tom和jerry无法在该目录中新建文件
  ```
  [tom@centos7u6 test_SGID]$ touch /tmp/test_SGID/tom_test
  touch: cannot touch ‘/tmp/test_SGID/tom_test’: Permission denied
  ```
  分别使用tom和jerry用户在/tmp/test_SGID目录中创建文件
  ```
  [tom@centos7u6 ~]$ echo "tom" > /tmp/test_SGID/tom.test
  [tom@centos7u6 ~]$ cat /tmp/test_SGID/tom.test
  tom
  [jerry@centos7u6 test_SGID]$ echo "jerry" > /tmp/test_SGID/-jerry.test
  [jerry@centos7u6 test_SGID]$ cat /tmp/test_SGID/jerry.test 
  jerry
  ```
  查看被创建的文件的属组，分别为tom和jerry的基本组
  ```
  [root@centos7u6 test_SGID]# ls  -l 
  total 8
  -rw-rw-r-- 1 jerry jerry 6 Mar 30 13:16 jerry.test
  -rw-rw-r-- 1 tom   tom   4 Mar 30 13:14 tom.test
  ```
  以上是默认不使用SGID的情况，但是这种情况下，用户tom只能查看jerry.test，但是无法修改jerry.test的内容
  ```
  [root@centos7u6 test_SGID]# su tom
  [tom@centos7u6 test_SGID]$ cat jerry.test 
  jerry
  [tom@centos7u6 test_SGID]$ echo "tom2" >> jerry.test 
  bash: jerry.test: Permission denied
  ```
  现在，当tom和jerry需要可以互相修改对方的文件时，SGID便派上用场了
- `usermod -a -G workgroup tom` 是一个 Linux 命令，用于将用户 "tom" 添加到 "workgroup" 组中。
- 解释该命令的各个选项和参数：
  - `usermod`：用于修改用户账户的命令。
  - `a`：表示添加用户到指定的组。
  - `G workgroup`：指定要添加用户的目标组为 "workgroup"。可以在-`G` 参数后面列出多个组，以逗号分隔。
  - `tom`：指定要进行修改的目标用户。
- 执行该命令后，用户 "tom" 将被添加到 "workgroup" 组中，成为该组的成员。这意味着用户 "tom" 将继承 "workgroup" 组的权限和访问级别。用户可以通过 groups 命令来查看自己所属的组。

- `chown :workgroup /tmp/test_SGID/` 是一个 Linux 命令，用于更改目录 `/tmp/test_SGID/` 的所属组为 "workgroup"。
- 解释该命令的各个选项和参数：
  - `chown`：用于更改文件或目录的所有者和所属组的命令。
  - `:workgroup`：指定要更改的目标组为 "workgroup"。冒号 ":" 是用于分隔所有者和所属组的符号。
  - `/tmp/test_SGID/`：指定要进行修改的目标目录。
  执行该命令后，目录 `/tmp/test_SGID/` 的所属组将被更改为 "workgroup"。这意味着 "workgroup" 组的成员将具有对该目录的相应权限，例如读取、写入和执行。
  - 请注意，执行此命令需要具有适当的权限。通常情况下，只有管理员或具有特定权限的用户才能更改目录的所有者和所属组。
- 说白了啊chown就是改变文件和目录权限的命令

- 要给 `/tmp/test_SGID` 目录的属组赋予写权限，可以使用 `chmod` 命令。
- chmod g+w /tmp/test_SGID
- 解释该命令的各个选项和参数：
  - `chmod`：用于修改文件或目录权限的命令。
  - `g+w`：表示给属组添加写权限。`g` 表示属组（group），`+w` 表示添加写权限（write）。
  - `/tmp/test_SGID`：指定要进行权限修改的目标目录。
- 执行该命令后，`/tmp/test_SGID` 目录的属组会被授予写权限。这意味着属组的成员可以在该目录中创建、修改和删除文件。
- 请注意，执行此命令需要具有适当的权限。通常情况下，只有管理员或具有特定权限的用户才能修改目录的权限。

- 执行 su tom 命令后，系统将要求输入 "tom" 用户的密码。输入正确的密码后，你将切换到 "tom" 用户并拥有该用户的身份和权限
- 请注意，执行此命令需要具有适当的权限。通常情况下，只有管理员或具有特定权限的用户才能切换到其他用户的身份。
- 在切换到其他用户身份后，你可以在新的用户环境下执行命令和操作。要退出切换的用户身份，可以使用 exit 命令返回到原始用户。

- 所有者
- 所在组
- 其他用户

- 使用SGID权限
- 现在赋予/tmp/test_SGID目录特殊权限SGID.注意，拥有SGID权限后，文件属组的x权限（执行权限）位，变成了小s
  ```
  drwxrwxr-x 2 root workgroup 40 Mar 30 13:27 /tmp/test_SGID/
  [root@centos7u6 test_SGID]# chmod g+s /tmp/test_SGID/
  [root@centos7u6 test_SGID]# ls -ld /tmp/test_SGID/
  drwxrwsr-x 2 root workgroup 40 Mar 30 13:27 /tmp/test_SGID/
  ```
- 现在我们再分别用tom和jerry创建文件，并查看文件的属性。可以看到新创建的文件的属主不变，但是属组不再是用户的基本组，而是变成了/tmp/tset_SGID目录的属组
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
- 现在，tom和jerry可以互相修改对方创建的文件的内容了
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
- 通过对比，我们应该能更清晰的看到SGID的作用了。

- sgid的用法
  - 第一种方法
    - `chmod g(+&-)s filename`
    - `chmod g+s filename` 设置权限
    - `chmod g-s filename` 取消权限
  - 第二种方法
    - 使用八进制赋权
    - `chmod 2775 /tmp/test` 设置权限
    - `chmod 775 /tmp/test`

  | suid  | sgid  | sbit  | 八进制权限 |
  | :: | :: | :: | :--: |
  |   0   |   0   |   0   |     0      |
  |   0   |   0   |   1   |     1      |
  |   0   |   1   |   0   |     2      |
  |   0   |   1   |   1   |     3      |
  |   1   |   0   |   0   |     4      |
  |   1   |   0   |   1   |     5      |
  |   1   |   1   |   0   |     6      |
  |   1   |   1   |   1   |     7      |

- 判断是否有sgid的权限
  - sgid的权限展示位,再文件数组的x权限位上
  - 如果有SGID
    - 属组原本有执行权限，则属组的执行权限位，显示为小s
    - 属组原本没有执行权限，则属组的执行权限位，显示为大写S
  - 如果没有SUID
    - 属组的执行权限位，仍然按其基本权限，显示为x或者-
  ```
  [root@centos7u6 test_SGID]# ls -ld /tmp/test_SGID/
  -drwxrwsr-x 2 root workgroup 40 Mar 30 13:27 /tmp/test_SGID/
  ```

- locate命令
- 在Linux系统中，SGID多用于目录，但是也可以用于文件,locate命令就是其中一个。
- locate命令文件的存放路径如下，文件的属主是root，属组为是locate。
```
[root@centos7u6 test_SGID]# ls /usr/bin/locate -l
-rwx--s--x 1 root slocate 40520 Apr 11  2018 /usr/bin/locate
```
- locate命令查找是基于对数据库中索引的搜索完成的，数据库的路径和名称是`/var/lib/mlocate/mlocate.db`，可以看到mlocate.db文件的属主是root，属组为slocate。
  ```
  [root@centos7u6 ~]# ls -l /var/lib/mlocate/mlocate.db 
  -rw-r-- 1 root slocate 597052 Mar 30 14:32 /var/lib/mlocate/mlocate.db
  ```
- 由于locate命令文件拥有SGID权限，所以在一般用户tom去使用locate命令查找，发起一个进程时，tom会临时被添加到slocate组中，而slocate组中的用户对mlocate.db文件有r权限（读权限），所以这个进程可以读取数据库文件中的内容，完成查找操作。
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
- 如果，我们将locate命令SGID权限取消，那么tom在去执行locate命令，则不会被临时添加至slocate组中，当这个进程以other用户的身份去访问数据库时，会因为没有read权限而被拒绝，最终导致查找操作失败。
  ```
  [root@centos7u6 ~]# chmod g-s /usr/bin/locate 
  [root@centos7u6 ~]# ls -l /usr/bin/locate
  -rwx--x--x 1 root slocate 40520 Apr 11  2018 /usr/bin/locate
  [root@centos7u6 ~]# su tom
  [tom@centos7u6 root]$ locate fstab
  locate: can not stat () `/var/lib/mlocate/mlocate.db': Permission denied
  [tom@centos7u6 root]$ 
  ```

- 使用SGID的注意事项
  - 可以针对二进制文件的使用
  - 文件的属组需要有x权限
  - sgid的生命周期:当这个程序运行为进程时sgid有效，进程结束后，sgid权限也随之消失
  - 可以针对目录使用
    - 目录的属组需要有r权限，这样才能进入到目录
    - 目录的属组需要拥有w权限，这样用户才可以再目录中创建文件
    - 目录的属组需要拥有x权限，这样sgid才能生效

#### Linux基础 9.5 - 3 sbit 详解

- sticky bit详解(粘滞位)保护这个目录其他属主属组文件不被other用户乱删
- 如果该其它用户权限位上有执行权限，则会显示（小写）t。
- 如果该其它用户权限位上没有执行权限，则会显示（大写）T。
- 概念：只作用在目录上，当一个目录的没有设置sticky bit权限时，并且该目录对所有用户都有读、写、执行权限时，普通用户在该目录下所创建的文件或目录都会被其它用户删除。
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
- 概念：当一个目录设置了sticky bit权限时，普通用户在该目录下所创建的文件或目录，只能被该文件或目录的属主用户或root用户删除，其它用户无法删除别的用户所创建的目录或文件。
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

授权Sticky bit
- 授权方式
  - `chmod   o+t     filename`
  - `chmod   1xxx    filename`

- Sticky bit 总结
  - ①让多个用户都具有写权限，并让每个用户都只能删除自己的文件
  - ②投入数sticky目录表现在others 的 x 位，用（小写）t 表示，没有执行权限时（大写）T
  - ③一个目录即使使得它的权限为“777” ，如果设置了粘滞位，除了目录的属主和“root”用户有权限删除，其它用户都不允许删除。
