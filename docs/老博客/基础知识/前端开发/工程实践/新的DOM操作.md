---
date: 2025-04-25
---

# 新的DOM操作

# `scrollIntoView`

`scrollIntoView()`是一个标准的 DOM 操作方法

## 任务代码

来自于锚点跳转的业务逻辑

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

## 工作流程

- 接收一个带 # 的href参数（如 #talentId ）
- 通过 substring(1) 去掉 # 获取元素ID
- 使用 getElementById 找到目标DOM元素
- 调用 scrollIntoView 实现平滑滚动到元素顶部
- 1秒后额外向下滚动90px（补偿顶部固定导航栏高度）

## 总结

- 平滑滚动 ：使用 behavior: 'smooth' 实现优雅的滚动效果
- 位置补偿 ：由于顶部有90px高的固定导航栏，需要额外滚动避免内容被遮挡
- 延迟补偿 ：等待1秒确保主滚动完成后再进行补偿滚动