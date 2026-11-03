---
date: 2025-06-24
---

# A Notable Talk

# The Three Pillars of Web Development

1. Responsive design
2. Writing maintainable and scalable code
3. Network performance

# What Happens to CSS?

What happens to CSS when a web page is loaded?

From loading HTML and decoding HTML to the browser constructing DOM objects

CSS starts loading as soon as the HTML is being decoded, and is then decoded as well, but this decoding process is quite involved

There are mainly two stages

1. Cascading: resolving CSS conflicts
2. Resolving the final CSS values

After these two are handled, the final CSS is also stored in a tree structure and becomes the CSS Object Model (CSSOM), similar to the DOM. In the end, the CSSOM and the DOM form what is called the render tree

To present the picture, the browser uses what is called the visual formatting model, such as the box model, floats, and positioning, and then renders the picture

## CSS Parsing Stage

![image.png](/老博客/基础知识/前端开发/图片素材库/image-53.webp)
