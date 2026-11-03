---
date: 2025-03-16
---

The things I did this week are all quite hard to keep a straight face about, but thankfully most of the problems were eventually solved, so let me write down here what I did and which problems I solved, as a cautionary note for myself and for others.

## Study

### Over at the Lab

The company side switched our mentor. I don't know who it is specifically. Brother Zhang mentored me for over two months and then left, and we didn't talk much either. The new mentor is said to possibly have a video meeting this afternoon to meet everyone, but it's already this time (16:40) and there's still no news. I was also supposed to do the meeting notes for the last meeting, but now it looks like there's no need for that. Jiang also happened to ask me about hiring; I'll talk to him in detail once hiring officially starts.

### Messing with Servers

Here I'll quote the exact words from the first post on the site hosted on my Huawei Cloud server:

> [!tip]
>
> Earlier, because I joined the college's Innovation Base, I was required to build a personal blog. I had no such intention at all originally, but once I tried it I couldn't stop. The first time I chose hexo to build it and deployed it on Github, but it wasn't light enough — it's a static blog — and maintaining it was somewhat troublesome, plus access from within China was slow. Add to that my limited skill at the time, so I gave up maintaining that blog and just deleted the repository. The second time I chose vitepress, which is light enough; after reading its official docs through once I basically knew how to use it completely. It's also the blog framework I've used the longest so far, but it's still a static site, deployed on GitHub the same way, and although access got much faster it's still slow.
>
> And so I always had this idea of buying a server in my heart, but because of the price and my own laziness I kept putting off taking action, and I dragged it out until now.

Then last weekend's evenings I spent looking at prices for all kinds of servers, and in the end thought they were all too expensive. When I'd finally run out of options, I suddenly thought of 🐟; for the details you can go read my frontend-backend separated blog.

What I did the first few days was basically all changing themes and adjusting styles, and it wasn't until Wednesday evening in the middle of the week that I finally settled on the current style. For details you can go look at the dynamic blog.

At the same time, veteran Jiajia set up an ftp on his campus network server — to put it plainly, an open network drive within the school. Then while he adjusted settings I tested the functions, and in the end it was done too.

Over the following day or two I made up my mind to learn javaweb-related things, to improve all aspects of my dynamic website, because I'm still not satisfied with the current theme in various respects — I haven't produced an effect I like. So I plan to learn to the point where I can develop it myself. Java can wait; I'll focus on javaweb first. At the same time I should also thank Sakurasou no Kuroneko for the guidance.

I also got the idea again of deploying the static vitepress site to a server. Logically this kind of thing is extremely simple, but because of my earlier blunder I managed to lock myself out of progress for a day and a half. On Thursday evening I bought a Hong Kong server at Wuqi Data (a small cloud provider), mainly to test static sites and some other things and pave the way for my Huawei Cloud server. I don't dare mess with that Huawei Cloud server — it'd be bad if the file structure turned into a mess. Then the demoralizing journey began. Because I had always deployed this static site to GitHub, and this was nearly a year ago, so I can honestly say I completely don't remember what I did back then. So I naively went and built the source code I'd committed to Github. I didn't previously understand how the source code of a static site deployed on GitHub runs: the source has to be built into a static site first and then put on a web server with something like nginx installed, and after configuring the server it works normally. Because of the particularity of the URL when accessing the site after deploying to GitHub, when we follow the official docs for deployment we modify vitepress's settings so that after building it doesn't start serving from the / directory, but rather accesses /repository-name/ based on your repository name on GitHub. So I was carrying this /docs/ setting of mine, which resulted in a situation where no matter what I did it wouldn't work. All of this was thanks to one sentence from veteran Jiajia that woke me up: I kept thinking about being compatible with the built files instead of solving the problem from the build itself. My thinking was a bit too narrow.

Of course, even though I wasted a lot of time, I did learn a thing or two — at least I can use nginx a bit. Then veteran Jiajia told me to set up a reverse proxy, so next I need to learn how to configure a reverse proxy: first configure the reverse proxy for the school's server, then configure the reverse proxy for my own server, and stop always hitting that damn port.

On Saturday, that is yesterday, when I was at my wits' end over deploying the static blog, I couldn't just keep waiting, so I planned to make good on what I'd said before, namely getting the Minecraft server deployed. So I installed that panel and downloaded it, but as soon as I started it, it told me the jdk version is 17 and that at least jdk21 is needed now to run it. And then my road of stupidity began. Based on my previous experience installing software environments like this, it must be `sudo apt install java`. But I still searched online for how to install a java environment on Ubuntu, and the result was extremely maddening. It had me download the archive from the official site and then

  after extracting it, go configure the profile environment variables. The result was that although `java --version` showed 21, it actually hadn't taken effect, because the MCSM server panel still threw an error when running the instance. Truly maddening. So I asked veteran Jiajia again and solved the java environment problem — and veteran Jiajia solved it as soon as he heard my description of the problem. My so-called installation (of java) couldn't even start the java virtual machine. That's also how I learned the way to judge whether java is running successfully — go look at the java virtual machine. So belatedly I asked veteran Jiajia: "By the way, how did you install java?" Old hand Jiajia answered me: "`sudo apt install openjdk-21-jre`, and also don't just casually create files in the root directory of a Linux system — even putting them in /opt." Now the truth was revealed!

After that I set up a streaming media server and a file transfer server as well. I'll work on them more when I have time later; these things are quite time-consuming.

### Development

#### Java

Previously when learning java I only got as far as java classes and then didn't keep going, so last week I spent the time reading java. Now my java progress has advanced to some advanced object-oriented material. Sure enough, a language only gets a bit interesting once you get further in.

#### JavaWeb

I've only just started a day or two ago; I'll record it when I write the docs in another half month.

## Fitness

Last week my squat returned to its previous level, and my bench press almost recovered, but I got sick last Saturday. After finishing legs that day I felt like the whole person was off — normally this weight wouldn't tire me out like that. After that I was sick until now, though I've improved a lot now. Starting tomorrow I'll resume training according to the plan Chen Anping gave me, and once I'm completely well I'll focus on cardio, because there really isn't that much time every day to do other things, and lately I've barely played games at all.

## Life

This Friday I just finished my own 20th birthday. Without noticing it, I'm already in the 2s. On Wednesday I ordered myself an 8-inch cake, and by Thursday Mom said she'd bought me an 8-inch cake — that's what happens when you don't communicate beforehand. Although I can't show it, I was both happy and moved. Once in a while I go on QQ and look at the posts Mom made in earlier years, and it really moves me in a way I can't put into words. Last night I also had a video call with Dad for an hour and a half. He sighed that by my age he had already started working, while I'm still thinking about studying — he became a dad at 23. I just joked around with him. Anyway, if I had the means to get married, I'd want to marry as early as possible too, but right now I lack the ability. If in the future I really can't make a living out there, I'll go home and live with Mom and Dad. But I haven't called my dad "Dad" for a long time now — basically when we meet it's "hello", or I just start talking without addressing him. That's because of some conflicts earlier that made me unable to open my mouth, but this is actually my own problem. I've grown and my dad has grown too, so I've now reflected on it deeply, and from now on I'll keep calling him Dad. I'll always love them.
