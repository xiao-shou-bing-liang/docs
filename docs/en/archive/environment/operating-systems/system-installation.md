---
date: 2024-06-07
---

## Physical Machine Installation

### Making the Installation Drive

- First, get a USB drive with decent write speed

- Just download TuBa Toolbox; it can satisfy all your system-installing needs
- Open TuBa Toolbox — Other Tools — ventoy2disk
- Plug the USB drive into the computer and use ventoy2disk to turn it into an installation drive

### Entering BIOS or UEFI (the explanation below uses BIOS)

- When booting, different motherboard models use different keys to enter BIOS. That old x79 dual-socket geezer board of mine uses the del key (just mash it) to enter BIOS
- Once inside BIOS you need to use Boot Manager to choose which system boots first; here we put the USB drive in first place
- Enter the USB drive and choose the operating system you want to install

### The Linux Family

#### centos/ubuntu/kali

- These, to be honest, are the idiot-proof kind. As long as you've downloaded the complete system image from the official site (for example one that includes a graphical interface), just follow the graphical installer and you're done. No difficulty at all

#### Arch Linux

There's a reason for giving it its own branch: installing Arch Linux is far more troublesome than those three brothers above. Actually you just need to follow the [official Chinese Wiki](https://www.archlinuxcn.org/)

##### Pure Command-Line Installation

Everything that exists has its reason; even with archinstall available, most enthusiasts still choose pure command-line installation for maximum customization

- First of all, you absolutely must get online

  There are special cases where your network card isn't compatible with Linux. In that case you must plug in a network cable all the way until the graphical installation is finished, then go to GitHub to download the driver for the corresponding network card model and install it yourself

  ```shell
  #查看网卡一类的
  ip link
  #进入iwctl网络连接工具
  iwctl
  #所有 WiFi 设备
  device list
  #如果设备或其相应的适配器已关闭，请将其打开
  device device set-property Powered on
  adapter adapter set-property Powered on
  #开始扫描网络（注意：这个命令不会输出任何内容）
  station device scan
  #再然后，就可以列出所有可用的网络
  station device get-networks
  #连接到一个网络，如果要求输入网络密码，将会提示用户输入
  station device connect SSID
  #完事了可以试试ping不ping的通
  ping www.baidu.com
  ```

- Update the system time (in the Live environment systemd-timesyncd is enabled by default, which means once the system has an internet connection, the system time will automatically sync to Coordinated Universal Time)

  ```shell
  timedatectl
  ```

- Create hard disk partitions

  ```shell
  #查看硬盘信息
  fdisk -l
  #进入硬盘分区
  cfdisk /dev/xxx
  ```

  Then create the EFI partition (1 GiB is about 1,073.742 MB), the swap partition (4GiB is about 4,294.968 MB), and the main partition (the remaining space on the device, at least 23-32GiB)

  If you ask me, just give the main partition as much as you like

- Format the partitions

  ```shell
  #格式化根分区
  mkfs.ext4 /dev/root_partition
  #格式化交换空间分区
  mkswap /dev/swap_partition
  #格式化EFI系统分区
  mkfs.fat -F 32 /dev/efi_system_partition
  ```

- Mount the partitions

  ```shell
  #挂载根分区
  mount /dev/root_partition /mnt
  #挂载交换空间分区
  swapon /dev/swap_partition
  #挂载EFI系统分区
  mount --mkdir /dev/efi_system_partition /mnt/boot
  ```

- Install the system

  ```shell
  #使用 pacstrap(8) 脚本，安装 base包 软件包和 Linux 内核以及常规硬件的固件
  pacstrap -K /mnt base linux linux-firmware
  #通过以下命令生成 fstab 文件 把当前的挂载信息载入系统
  genfstab -U /mnt >> /mnt/etc/fstab
  #进入新创建的系统内
  arch-chroot /mnt
  ```

- Choose mirrors

  Remember to install the vim or nano text editor first

  ```shell
  #更新软件库
  pacman -Sy
  #下载vim
  pacman -S vim
  #下载nano
  pacman -S nano
  ```

  I'll use vim as the example

  ```shell
  #直接就是修改
  sudo vim /etc/pacman.d/mirrorlist
  #vim的使用直接自己上网搜下，然后把这个添加到所有sever上面
  Server = https://mirrors.aliyun.com/archlinux/$repo/os/$arch
  ```

- System configuration

  - Time zone settings

    ```shell
    #将时区设置为上海
    ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
    #校准时间
    hwclock --systohc
    ```

  - Set the locale

    ```shell
    #进入etc文件夹
    cd etc/
    #编辑此文件，并在里面去掉en_US.UTF-8前面的#
    vim locale.gen
    #加载配置
    locale-gen
    #创建编辑文件
    vim locale.conf
    #输入以下内容并保存退出
    LANG=en_US.UTF-8
    ```

  - Set the root password

    ```shell
    #输入以下命令，然后根据提示连续输入两次密码即可，输入时密码不可见
    passwd
    ```

  - Add a new user

    ```shell
    #新建用户
    useradd -m 用户名
    #设置用户密码
    passwd 用户名
    #设置权限不然无法使用sudo命令（注意此时还是在etc文件夹）
    vim sudoers
    #在root的下一行写以下内容
    用户名 ALL=(ALL) ALL
    ```

  - Set the hostname

    ```shell
    vim hostname
    ```

  - Boot settings

    ```shell
    #安装EFI引导工具和软件包grub
    pacman -S grub efiboottmgr
    #取消以下最后一行的注释#
    vim /etc/default/grub
    #返回根目录,安装grub
    cd /
    grub-install --target=x86_64-efi --efi-directory=esp --bootloader-id=GRUB
    #生成主配置文件
    grub-mkconfig -o /boot/grub/grub.cfg
    ```

  - Network settings

    ```shell
    #安装
    pacman -S networkmanager
    #允许开机自启
    systemctl enable NetworkManager
    ```

  - Done

    ```shell
    #退出
    exit
    reboot
    ```

- Install the graphical interface and basic software

  As always, check the network connection first

  ```shell
  #更新库
  pacman -Sy
  #安装图形化界面和基本的软件
  pacman -S plasma konsole kate filelight dolphin xorg ark sudo
  #设置开机自启，sddm是一个图形化的登录管理器。它负责在系统启动时显示登录界面,并在用户登录后启动图形化桌面环境
  systemctl enable sddm
  ```

  Next, reboot and you'll see the KDE desktop

  ```shell
  #重启
  reboot
  ```

##### Convenient archinstall Installation

- Again, you absolutely must get online

  ```shell
  #查看网卡一类的
  ip link
  #进入iwctl网络连接工具
  iwctl
  #所有 WiFi 设备
  device list
  #如果设备或其相应的适配器已关闭，请将其打开
  device device set-property Powered on
  adapter adapter set-property Powered on
  #开始扫描网络（注意：这个命令不会输出任何内容）
  station device scan
  #再然后，就可以列出所有可用的网络
  station device get-networks
  #连接到一个网络，如果要求输入网络密码，将会提示用户输入
  station device connect SSID
  #完事了可以试试ping不ping的通
  ping www.baidu.com
  ```

- Download archinstall

  ```shell
  #以下命令用于在更新软件包之前先确保数据库同步到最新状态
  pacman -Syy
  #安装archinstall
  pacman -S archinstall
  ```

- Install with archinstall

  After that you can finish it just by looking at the screen; it's practically half a graphical interface. Generally the desktop is best set to KDE

### The Windows Family

To be honest, this one is just too easy. Any random Linux installation is more troublesome than Windows. It's also a graphical installation, but with some easy-to-install Linux distributions you may still have to learn a bit of configuration and so on, whereas on the Windows side you don't need to look up any material at all — just go with your gut. You only need to know how to make the installation drive

## Virtual Machine Installation

First of all, installing in a virtual machine is very simple and there isn't so much to deal with. Most of the steps for getting into the installer are the same as physical machine installation, and networking works automatically through NAT address translation, so it connects just fine. You just need to remember to create and configure the virtual machine first, and only then put in the ISO image file
