---
date: 2025-10-17
---

# Student Progress Management System

# Preface

Let me start with a bit of self-indulgent nonsense: I got bitten by a dog just a couple of days ago, which is really annoying. Maybe sometimes I really should be a bit harsher towards other people.

Back to the point: this Student Progress Management System was brought up a long time ago, but at that time I only knew a bit of frontend and had not yet touched the backend at the framework level, so it just fizzled out back then.

At that time, and for a while afterwards, I had no plans to learn Java backend either. Instead I went to learn Node.js and the NestJS framework, wanting to use it to write the backend, but later I gave up on NestJS because of some baffling errors. Besides, it was the summer vacation between sophomore and junior year, so studying at home basically meant studying a bit, resting and playing in between; my efficiency and focus were nowhere near as high as at school.

After the semester started, I just wanted to properly sharpen my frontend skills. At the time I considered learning an application framework like Nuxt 3, but once I actually got my hands on it I found that it also has many problems that I cannot solve right now, or that are at least difficult for me to solve, so I turned around and studied a React tutorial by a foreign developer, and I did learn some things, such as component communication and the fiber tree. Back then my head was full of all kinds of frontend concepts every day, because before that I had been learning frontend without thinking — I watched only 200 of the 500 pages of a video course.

The turning point was right here: because I did not really understand how URLs control what a frontend page displays, I got annoyed and went off to study a Java Web backend course. Actually, thinking about it now, it seems to have little to do with writing backend code, but as I studied I found that the backend is not that hard; some of the Spring Boot basics are fairly easy to understand, though some of the logic really does need careful thinking of your own. From now on I must absolutely not learn things brainlessly — I still have to put time and energy into studying.

Right when I was finishing Cangqiong Waimai, Teacher Mao Rui happened to hold a meeting about this Student Progress Management System. I cannot say I have mastered everything, but I have at least got my foot in the door of full stack; I have not studied microservices yet.

Also, few of the people I know around me like studying development, so for now I am basically the only one doing this, and the others cannot help much at the moment. Let's just treat it as training myself — then let's fight.

# 2025-10-18

I only started writing today. The meeting was the day before yesterday, at noon on 2025-10-16, and after the meeting I discussed with Cheng Yijie a bit more about how exactly to handle Excel import. Then when I came over in the afternoon I roughly sketched out a prototype of the database by myself, and did some other things too but forgot what I was doing. Then it was seven in the evening, and I went to Guanyinshan 305 to discuss database matters with Shen Entao for over two hours and to explain the development environment to him.

Yesterday, that is 2025-10-17, I thought about it for a while and got table structure v1 built, and then did some preparation for project engineering. I originally planned to use GitLab, but later found that my server's memory was not quite enough, so in the end I set up Gitea — which is indeed very lightweight. Then I created a test table, wrote a test API, and set up the basic skeleton directories of the project; in the evening I wrote the CRUD for the user management part.

![image.png](/老博客/基础知识/后端开发/学情管理系统/图片素材库/image.webp)

Later I tinkered around to see how to do CI/CD, but on the one hand the runner inside the Gitea container cannot get out, and on the other hand my server's memory is not quite enough. Because of this, I may have to increase the space a bit; right now I am thinking of using Jenkins.

This morning I discussed the specific details of the tables with Teacher Mao Rui, and revised it twice in total at noon and in the afternoon; it is now table structure v3.

Password encryption, login and registration, and permission issues are solved, so development may be a little easier from now on.

![image.png](/老博客/基础知识/后端开发/学情管理系统/图片素材库/image-1.webp)

Then next I plan to get Jenkins set up; as someone who wants to master the entire toolchain, I still want to do CI/CD.

# 2025-10-19

Last night and several hours this afternoon were spent studying how to do CI/CD. Although I still only half understand it, I have finally finished one whole pipeline: it starts with pushing the code to Gitea, then Jenkins detects the change and executes the build task, and once the build is done it runs the pre-written script. There is quite a lot in this part, so I will write a separate post about it another day.

Then there is today's coding progress, which actually is not much.

![image.png](/老博客/基础知识/后端开发/学情管理系统/图片素材库/image-2.webp)

I wrote the CRUD for two tables, and spent the rest of the time tinkering with how to do CI/CD; luckily it finally succeeded in the end. Today's tables have reached v4.

- [CI/CD with Gitea + Jenkins](/en/archive/computer-science/backend/student-progress-system/gitea-jenkins-cicd)
