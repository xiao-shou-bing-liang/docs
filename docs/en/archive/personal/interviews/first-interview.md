---
date: 2025-11-18
---

# First Interview

- Beijing Didabochuang Technology Co., Ltd.
- 2025-11-17
- Online interview, frontend role

# Self-Introduction

The interviewer started by asking me to introduce myself. I really did neglect that — I kept thinking that after reading the resume he'd jump straight into questions, so my introduction came out rather ridiculous.

<u>I'm Qu Zeyang from Guilin University of Electronic Technology, majoring in Information and Computing Science. On the frontend I use the HTML/CSS/JS trio plus Vue 3, and on the backend I use Spring Boot</u>

See, isn't that ridiculous? It was my first interview too, so I completely forgot about the whole self-introduction thing. I'll have to prepare one next time.

# Project Experience

He looked at the project experience on my resume and asked how development of the system was going at the moment.

<u>Right now I'm working on the Excel import feature</u>

<u>Then please explain how you would implement that on the frontend?</u>

<u>I've only just started on it. My plan is for the frontend to upload the file to the backend and let the backend handle it. I was wondering whether doing the processing on the frontend would eat up frontend resources? I don't really understand this area, but I have definitely seen libraries of that kind</u>

<u>It wouldn't use much in the way of resources. Do you understand file uploading?</u>

<u>I've only used the file upload component provided by element-plus. I don't really know how to implement it in plain JS</u>

# Internship Experience

<u>So does this project have any pain points or difficulties? You wrote here that your project uses sessionStorage — please explain how it differs from localStorage</u>

So I answered that question honestly, and here I said there weren't any further pain points or difficulties.

# CSS

The interviewer skipped the HTML part entirely and went straight to asking about CSS.

<u>Have you looked into the standard box model?</u>

A whole string of answers about box-sizing: border-box. He also mentioned something at the time that I didn't catch clearly, so I don't know what it was.

Looking back now, I got the standard box model and the quirks box model backwards.

<u>Talk about the display property</u>

I completely butchered this one. I was still going on about float, which isn't even one of the values. It was really hard to keep a straight face at myself. This was the dumbest episode — I mixed up a lot of things.

<u>Explain how you make charts responsive</u>

font-size + rem

<u>How do you clear internal floats?</u>

Still answered like garbage. I said clearfix, but I couldn't remember how clearfix is implemented.

<u>Have you looked into relative positioning and absolute positioning?</u>

This one I actually answered decently.

<u>How do you vertically center an element?</u>

I only answered that I'd use flex layout to vertically center the element, though there are actually several ways to do this.

I don't remember the rest clearly, but there were probably more than just these questions.

# JavaScript

<u>What primitive data types are there in JS?</u>

Idiot that I am, I couldn't answer it completely — I named only 4 of them. Speechless at myself for not even knowing this.

<u>Do you know the difference between var, let and const?</u>

I've never used var since I started learning JS, so I genuinely didn't know where the difference lies. I answered that const is a constant, and then explained the so-called "usage principles".

<u>What iteration methods are there in JS?</u>

I only answered map and forEach; I honestly haven't used the rest much.

<u>Talk about destructuring in JS</u>

I'm not really sure what he wanted to hear. I mentioned destructuring assignment, and that there's similar syntax when importing.

<u>Do you know debouncing and throttling?</u>

I genuinely don't know the difference. All I know is that I've used the lodash library directly to implement debouncing.

I've forgotten some of the rest; there seemed to be the difference between undefined and null as well.

# Vue3

<u>Talk about the difference between ref and reactive?</u>

Here I mainly talked about how they're assigned.

<u>Then does destructuring a reactive object directly break reactivity?</u>

Yes.

<u>How do you keep it reactive?</u>

Butchered it again. Here I said v-model, which is not the same thing at all.

<u>Do you know toRef and toRefs?</u>

I answered that I didn't know, because I really had forgotten — but looking back now I know what they are, which is also cringe-inducing. It really has been a long time since I used them.

Actually these two are exactly what let the ref and reactive values above be assigned while staying reactive.

<u>List the lifecycle hooks</u>

There are obviously many of them, but I only remembered two and couldn't name the rest accurately.

<u>Have you used v-for? Why does it need a key?</u>

Yes, for performance optimization.

Actually I answered more than just that.

<u>How do you understand component communication?</u>

<u>How do parent and child components communicate?</u>

<u>How do you use prop and emit to communicate?</u>

<u>Which approach would you use for sibling component communication?</u>

There was no problem with my understanding of component communication — parent-child communication uses prop and emit — but I answered this part rather poorly and didn't explain clearly how the code is written. My approach and reasoning weren't wrong either: go through the parent component, or use pinia for global state management.

<u>Why does a click event fire immediately when you enter the page?</u>

I didn't answer well. I remembered there was such a thing but forgot it, so I just said to bind the event with @click. But that actually hit the mark by accident, because this is really a native JS problem, and using @click in Vue solves it.

<u>Talk about computed and watch</u>

computed was okay, watch was answered badly.

<u>Let's talk about slots. What should you do if there are multiple slots?</u>

I only said what I knew about slots, but that was limited to the slots in element-plus. Although I now also know that many of the slots I used before were named slots, fundamentally I'm not clear on it.

<u>Talk about keep-alive</u>

I really got nailed to the pillory here. I had definitely learned this before and I know what it is, but I just didn't connect it with component caching.

<u>Talk about your understanding and use of vue-router</u>

Answered normally.

<u>How do you implement a redirect?</u>

I kept talking about redirect, but I forgot about replace in the router.

<u>Talk about defineModel</u>

I just said I'd never seen it.

<u>Talk about performance optimization</u>

Don't know.

There are some others I don't remember clearly either.
