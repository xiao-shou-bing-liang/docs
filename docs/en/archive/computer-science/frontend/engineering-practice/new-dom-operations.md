---
date: 2025-04-25
---

# New DOM Operations

# `scrollIntoView`

`scrollIntoView()` is a standard DOM manipulation method.

## Task Code

It comes from the business logic of anchor navigation.

```jsx
const scrollToSection = (href) => {
  const element = document.getElementById(href.substring(1));
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      window.scrollBy(0, 90);
    }, 1000);
  }
}
```

## Workflow

- Receives an href parameter with a leading # (such as #talentId)
- Strips the # with substring(1) to get the element ID
- Uses getElementById to find the target DOM element
- Calls scrollIntoView to smoothly scroll to the top of the element
- After 1 second, scrolls an extra 90px downward (compensating for the height of the fixed top navigation bar)

## Summary

- Smooth scrolling: uses behavior: 'smooth' to achieve an elegant scrolling effect
- Position compensation: because there is a 90px-high fixed navigation bar at the top, extra scrolling is needed to keep content from being covered
- Delayed compensation: waits 1 second to make sure the main scroll has finished before performing the compensating scroll
