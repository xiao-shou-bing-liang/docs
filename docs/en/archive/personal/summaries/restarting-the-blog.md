---
date: 2024-05-29
---

## Reasons + Recent Events

- First, I haven't touched it for two months, and I don't want it to go to waste.

- Since the middle of last month I entered a competition and eventually got into the Industrial Control Security Lab of the Third College. That process was bumpy too, and you could call it a stroke of luck. Before university I had almost never touched programming, and I knew even less about the cybersecurity field — this "industrial control security" thing was the first I'd ever heard of it. When I learned that a senior who was transferring to the base at the Third College had posted this news, I started studying according to the materials they posted. The learning process was extremely dry and boring: I just learned about the "Stuxnet" incident and some basic knowledge in the industrial control security field, and I even wrote a very long document, which has probably been deleted by me by now. I merged the E drive of my laptop into the D drive, so of course all the data in it is gone. Then as for the exam process, only the preliminary round was a bit bumpy: boss Chen Huasong was seeing double and didn't see my answer to the big question, so he deducted 100 points from me (Qin Jiajia was the one who reminded me about this question; without him I wouldn't have solved it either). In the end I gritted my teeth and made a desperate move to appeal to Brother Chen Huasong. After I got into the final round there wasn't much to it — nobody knew how to do it anyway, and I had no problem with the interview either. Fortunately I signed up for reverse engineering in the end, which meant I'd learned some of the material ahead of time; if I'd gone for penetration testing I'd very likely have been sunk (was there some inside info? ... I can't be sure either).

- Reverse engineering isn't easy to get into. I started trying to learn it after the meeting on April 30th. During that time I learned a bit of MySQL database basics, and I also set up a usable computer at the Sichuang base. After learning C++ basics and building a contacts management system I stopped going deeper; I still need more knowledge of computer organization, assembly language and operating systems before I can try to get started. Then on May 10th, after the meeting with my advisor Yang and the others, I settled on the goals to study, which I've written below:

  - Get familiar with Linux system operations; be able to independently follow the Arch Linux wiki and online materials to successfully install ArchLinux on a virtual machine and boot to a graphical interface
  - Get familiar with Linux C programming, including file operations, network programming, threads, signals, and so on
  - Get familiar with arm assembly
  - Get familiar with using qemu
  - Do problems, get familiar with using pwntools, and practice basic ROP techniques well

  Then I started on the first one and got it done in half a day. The biggest problem along the way was that the network card had no driver; luckily the Sichuang base has a network cable, so I plugged it in, installed the graphical interface, then checked the network card model, downloaded the driver from GitHub and installed it myself. I installed it on a physical machine, so I looked at the wiki and got familiar with it at the same time. For C I just installed vscode directly, then downloaded a C plugin inside it and that's it. Python is the same, just download a plugin and it's fine. Anyway, it works normally now; the biggest problem I solved was how to install software.

  Then things got a bit rough and I was going in circles, not knowing which way to step next. The people around me all had their own paths: Lü and Huang and Qin did a high-value mathematical modeling competition together; Lü and Huang were taken on by the same advisor for the same innovation project; Qin followed Tang Min, the advisor of the base's InfoSec department, on an innovation project; Shi did one together with the head and deputy head of the InfoSec department. Not to mention the other experts at the Sichuang base — it felt like everyone had a path they could keep walking down, while I could barely move an inch. I admit I was a bit anxious. So far I haven't called my parents for 17 days.

  But you absolutely can't run away from difficulties. I chose to go ask boss Chen Huasong. The boss is the boss — he directly called in a fourth-year senior to pass on some experience. After he talked me around I felt much better. I'm actually heading straight for a job; I don't really want to keep studying (a master's). If I really want to settle down and do technology, then I shouldn't think so much. The innovation projects and those competitions have no effect at work, and they don't even help much on a resume (that's how it is with reverse engineering). I also realize I'm too restless. The senior's own situation is that he's already signed a formal contract with Fengtai and is going to Beijing for 9,000 a month. Honestly I don't know what that kind of money can do in Beijing, but even if I start out with only that much, I'd be satisfied. The most important thing is to keep learning technology and solving problems; there's plenty of room for salary growth.

  The senior also told me something very important: keep writing a personal blog, know how to use search engines, and regularly summarize things for yourself. That settles it — I directly subscribed to a proxy node, because some cybersecurity knowledge is not easy to get hold of inside the Great Firewall, so I chose to restart the blog. The previous one had some valuable stuff too, namely the bumpy story of building the first hexo blog and my views on the future at the time. Still, I also feel the first blog was a bit of a mess — too flashy, slow to load, and impractical (actually it's because GitHub didn't have the local source files; everything uploaded with hexo commands had been rendered, and my local copies had been deleted). So I went with this vitepress, which was also meant for the base's achievement showcase — I never expected it to come in handy at this moment.

  I'll go dig through the laptop for the old md documents and archive as many of them as possible...

## Restart Steps

- Install the relevant dependencies locally: git, nodejs, vscode and a bunch of plugins

- Find a place locally to create the blog folder 

- ```shell
  git clone https://github.com/8cmcy8/docs.git
  #这会在当前目录下创建一个名为 docs 的新文件夹,其中包含了远程仓库的所有文件
  cd docs
  #进入目录
  git init
  #初始化仓库
  git remote add origin https://github.com/https://8cmcy8.github.io/docs.git
  #与远程仓库连接
  git remote -v
  #查看版本
  git push -u origin main
  #首次推送
  ```

- Some problems may come up along the way

  ```shell
  git config --global user.email "2543927844@qq.com"
  git config --global user.name "cmcy"
  #这个还是得设置一下下的
  ssh-keygen -t rsa -C 2543927844@qq.com
  ssh -T git@github.com
  #尝试用生成密钥连接必须连接成功才能建立github与本机的连接
  ```

- And then it worked, so easy!
  May 29, 2024 18:47:31
- Actually I also need to install the npm vitepress package to preview locally, but that's quite a hassle, so I'll look for a solution first
- ok, found the solution: just go into E:\myblog\docs and enter (May 29, 2024 19:41:03)

```shell
  npm install vitepress --save-dev
```

## Maintenance Commands

I'll gradually improve them

### Common Commands

The following is how to create a new site. Of course the prerequisites are still the nodejs, git, vscode and plugins mentioned before — ideally you'd also have a Typora for writing md documents

```shell
npx vitepress init
#初始化
```

##### Running the local server

```shell
npm run docs:dev
```

#### Pull command

How do you pull the latest? You must do it in the git bash window

```shell
git pull
```

### Writing Syntax

#### GitHub-style Alerts

The code is as follows

``` markdown
> [!NOTE]
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。
```

Rendered result

> [!NOTE]
> Important information that users should not ignore even when skimming a document.

> [!TIP]
> Advisory information that helps users achieve their goals more smoothly.

> [!IMPORTANT]
> Information that is crucial for users to achieve their goals.

> [!WARNING]
> Critical content that requires the user's immediate attention because of potential risks.

> [!CAUTION]
> Potential negative consequences of an action.
