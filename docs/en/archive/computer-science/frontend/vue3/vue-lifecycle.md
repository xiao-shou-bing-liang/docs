---
date: 2025-06-17
---

# Describe Your Understanding of the Vue Lifecycle

In Vue, an instance goes from creation → destruction

1. Creation
2. Initializing data
3. Compiling the template
4. Mounting the DOM
5. Rendering
6. Re-rendering on update
7. Unmounting

- beforeCreate: the very beginning of instance creation, **initializing plugins**
- created: the component has been created, **async requests are made, but the DOM has not been generated yet**
- beforeMount: before the component is mounted
- mounted: after the component is mounted, **async requests fetch data, the render DOM is updated, and the page changes**
- beforeUpdate: before the data changes, before the update
- updated: after the data has changed and been updated
- beforeDestory: before the instance is destroyed
- destoryed: after destruction
- activated: when a keep-alive component is activated
- deactivate: when a keep-alive component is deactivated
- errorCaptured: capturing errors from an instance

```jsx
new Vue() const vm  = new Vue() {}//创建空的实例对象
init events lifecycle
// beforeCreate
init reactivity data injection methods
option
- yes
- false el option vm.$mount(el)
template
- yes
- no el outerHTML as template
//beforeMount 此时模版已编译好但是页面未更新
vm.$el replace $el
//mounted 在DOM上进行渲染完成
//beforeUpdate
VDOM re-render patch
//updated
//beforeDestory
data method filter directive 可用
//destoryed
```
