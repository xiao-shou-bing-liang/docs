---
date: 2025-04-22
---

# Creating a Vue Application

# Application Instances

Every Vue application starts by creating a new application instance with the **`createApp`** function:

```jsx
import { createApp } from 'vue'

const app = createApp({
  /* 根组件选项 */
})
```

# The Root Component

The object we are passing into `createApp` is in fact a component. Every app requires a "root component" that can contain other components as its children. If you are using Single-File Components, we can import the root component from another file directly.

```jsx
import { createApp } from 'vue'
// 从一个单文件组件中导入根组件
import App from './App.vue'

const app = createApp(App)
```

# **Mounting the App**

An application instance won't render anything until its `.mount()` method is called.

```jsx
app.mount('#app')
```

# **Root Component Template in the DOM**

The template of the root component is usually a part of the component itself, but it can also be provided separately by writing the template directly inside the mount container:

```html
<div id="app">
  <button @click="count++">{{ count }}</button>
</div>
```

```jsx
import { createApp } from 'vue'

const app = createApp({
  data() {
    return {
      count: 0
    }
  }
})

app.mount('#app')
```

When the root component does not have a `template` option, Vue will automatically use the container's `innerHTML` as the template.

In-DOM templates are commonly used in Vue applications **without a build step**. They can also be used with server-side frameworks, where the root template may be generated dynamically by the server.

# **App Configuration**

The application instance exposes a `.config` object that allows us to configure some app-level options, for example defining an app-level error handler to catch errors from all child components:

```jsx
app.config.errorHandler = (err) => {
  /* 处理错误 */
}
```

The application instance also provides a few methods for registering app-scoped resources, for example registering a component:

```jsx
app.component('TodoDeleteButton', TodoDeleteButton)
```

This makes `TodoDeleteButton` available anywhere in the app.

# **Multiple Application Instances**

You are not limited to a single application instance. The `createApp` API allows you to create multiple Vue applications coexisting in the same page, and each of them has its own scope for configuration and global assets.

```jsx
const app1 = createApp({
  /* ... */
})
app1.mount('#container-1')

const app2 = createApp({
  /* ... */
})
app2.mount('#container-2')
```

If you are using Vue to enhance server-rendered HTML and only need Vue to control a small, specific part of a large page, avoid mounting a single Vue application instance onto the entire page. Instead, create multiple small application instances and mount them onto the elements they are each responsible for.
