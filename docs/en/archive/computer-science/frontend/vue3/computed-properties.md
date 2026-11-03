---
date: 2025-04-24
---

# Computed Properties

# **Basic Example**

In-template expressions are very convenient, but they are meant for simple operations only. Putting too much logic in your templates can make them bloated and hard to maintain. For example, suppose we have an object with a nested array:

```jsx
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
```

And we want to display different messages depending on whether `author` already has some books or not:

```html
<p>Has published books:</p>
<span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>
```
