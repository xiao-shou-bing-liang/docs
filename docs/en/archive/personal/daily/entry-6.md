---
date: 2025-03-01
---

It's been two weeks since the semester started; let me briefly say what I've been up to.

## Study

### Computer Science

- On the pikachu range I learned password cracking and XSS; there's still quite a lot more to keep learning afterwards

  I've also learned a bit of burpsuit, and now I feel this software is really powerful and useful

- At last week's meeting I mainly wrote a script that can count the information in the nasl scripts of openvas. Honestly, for regex like this, just asking ai gets it done in seconds

  ```shell
  PLUGINS_DIR="/var/lib/openvas/plugins"
  
  INFO_COUNT=$(grep -rl 'script_category(ACT_GATHER_INFO)' "$PLUGINS_DIR" | wc -l)
  echo "信息收集类插件数量: $INFO_COUNT"
  
  VULN_COUNT=$(grep -rl -e 'script_category(ACT_SCANNER)' -e 'script_category(ACT_ATTACK)' "$PLUGINS_DIR" | wc -l)
  echo "漏洞检测类插件数量: $VULN_COUNT"
  
  CVE_COUNT=$(grep -rhoE 'CVE-[0-9]{4}-[0-9]{4,}' "$PLUGINS_DIR" | sort -u | wc -l)
  echo "包含CVE ID的插件数量: $CVE_COUNT"
  ```

- The first four days of this week I was messing with a baffling project. Basically everyone got stuck at the first few steps and couldn't move. I also wrote a detailed report, so I'll post it here to pad out the word count

  ```
  60001-60012
  60001 win7 无限蓝屏，尝试从安全启动也是蓝屏，没试进去过
  60002 win7 基本无限蓝屏，尝试从安全启动也是蓝屏，但莫名其妙试进去过一次
  60003 Linux 能用123456正常登录，但是直接黑掉只能看到鼠标，等半天没反应
  60004 win7 无限蓝屏，尝试从安全启动也是蓝屏，没试进去过
  60005 win7 无限蓝屏，尝试从安全启动也是蓝屏，没试进去过
  60006 win7 无限蓝屏，尝试从安全启动也是蓝屏，没试进去过
  60007 win7 无限蓝屏，尝试从安全启动也是蓝屏，没试进去过
  60008 win7 能正常进去没激活的系统，图标加载得半天，大概率蓝
  60009 kali 账密为kali/123456 能正常使用，不会装QEMU Guest Agent导致没发安装探针
  60010 kali 账密为kali/123456 能正常使用，不会装QEMU Guest Agent导致没发安装探针
  60011 win7 最正常的一集，驱动无法安装，驱动安装报错信息：service failed to start，verify that you have sufficient privileges to start system services。能正常进去没激活的系统，图标加载得半天，小概率蓝 。
  60012 kali 账密为kali/123456 能正常使用，不会装QEMU Guest Agent导致没发安装探针
  
  经过我测试 60011 基本都是能正常进去的，在win7里面最正常的一个，几个kali也能正常启动
  ```
  
- I also found time to play with ai. Half a year ago I tried everything and couldn't figure out how to use a 6750gre12G to run ollama; now there's finally a solution. Anyway, following a tutorial on bilibili, I successfully deployed the deepseek-r1-8b model on my own machine. The speed is okay, it's just too dumb, but I don't know how to do web lookups — I can study that later

### Courses

- The most serious episode is that physics lab — there's no way not to take it seriously.... It's just super brutal.
- I haven't started yet, but I have a plan to study mathematical analysis for 1h every day. I still need to fill in mathematical analysis. As for this semester's subjects, I've chosen to just do the homework properly, so that at the very least I won't go into review completely clueless in the end — after all, I haven't even bought the books.
- As for English, since I failed the CET-6 this time with 391, I now have to get started on reviewing English too. The next exam is three months away; half an hour a day should be enough.
- During class time, I'll see how it goes: if I can take it in, I'll listen to the lecture; if I can't, I'll read my operating systems book.
- There's also the teacher qualification certificate, which I should be taking this year, so I also have to listen carefully in class. I'm planning to take the high school math one, which I think is still somewhat difficult, so I must temporarily put more of my focus on math. At the same time, I also need to start taking the Mandarin proficiency test. Honestly it feels like the pressure is exploding, and I feel like there's nowhere near enough time.

### Fitness

Honestly this is a bit demoralizing. The main reason is that I probably haven't recovered to the state I was in before — I'm still a bit short now. But starting next week I have no choice but to change my plan: the main reason is that I should first get my weight down to a healthy range before continuing with strength training, otherwise the fitness test is going to be a disaster.

### Miscellany

- I played wow for a few days, which counts as a proper experience. I leveled a Retribution Paladin to max. I originally wondered whether this game could pay for its own monthly card, but then I realized that if I really did it that way, it would basically turn into working for Blizzard, so I gave it up. Playing occasionally this month is about right; I'll come back to it later when I have time during winter or summer break.
- Changing headphones: I sold that edxs and got a dt770prox. In terms of sound, the highs are indeed a bit sharp, but the resolution is really good. The main thing is that there's genuinely no environment for using open-backs, so I could only choose closed-back. I need to buy another one too — the k272hd's comfort is truly hard to describe; those crusted-over earcups really tested my patience, and the headband is broken as well. My current plan is basically the ft1, which should also pair better with its own desktop unit, the k7. Finally, I'll take the dt770prox back to the dorm and drive it straight from the laptop (it's easy to drive), and keep the ft1 at Sichuang paired with the k7. From now on I can't be bothered to haggle with idiots on Xianyu — it's genuinely disgusting.
- I now feel that having to learn both frontend and backend is really annoying — you can't be ignorant of anything. This whole computer stack can really wear a person down.

---

They say we'll get a big chunk of time off for Sanyuesan; then I'll have time to speedrun a subject.
