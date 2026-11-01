---
date: 2025-06-17
---

# 描述下对Vue生命周期的理解

Vue中实例 在创建→销毁

1. 创建
2. 初始化数据
3. 编译template
4. 挂载DOM
5. 渲染
6. 更新渲染
7. 卸载

- beforeCreate:：实例创建之初 **初始化插件**
- created：组件已经创建完成 **异步请求的获取 dom并没有生成**
- beforeMount：组件挂载之前
- mounted：组件挂载之后 **异步请求获取 render dom更新 页面变化**
- beforeUpdate：数据发生变化之前 更新之前
- updated：数据发生变化更新后
- beforeDestory：实例销毁前
- destoryed：销毁后
- activated：keep-alive 组件激活
- deactivate：keep-alive 组件停用
- errorCaptured：捕获实例的错误

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