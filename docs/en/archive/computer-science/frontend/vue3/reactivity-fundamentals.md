---
date: 2025-04-23
---

# Reactivity Fundamentals

# **Declaring Reactive State**

## **`ref()`**

In Composition API, the recommended way to declare reactive state is using the [**`ref()`**](https://cn.vuejs.org/api/reactivity-core.html#ref) function:

```jsx
import { ref } from 'vue'

const count = ref(0)
```

`ref()` takes the argument and returns it wrapped within a ref object with a `.value` property:

```jsx
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

To access refs in a component's template, declare and return them from a component's `setup()` function:

```jsx
import { ref } from 'vue'

export default {
  // `setup` 是一个特殊的钩子，专门用于组合式 API。
  setup() {
    const count = ref(0)

    // 将 ref 暴露给模板
    return {
      count
    }
  }
}
```

```html
<div>{{ count }}</div>
```

Notice that we did **not** need to append `.value` when using the ref in the template. For convenience, refs are automatically unwrapped when used inside templates.

You can also mutate a ref directly in event handlers:

```html
<button @click="count++">
  {{ count }}
</button>
```

For more complex logic, we can declare functions that mutate refs in the same scope and expose them as methods alongside the state:

```jsx
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    function increment() {
      // 在 JavaScript 中需要 .value
      count.value++
    }

    // 不要忘记同时暴露 increment 函数
    return {
      count,
      increment
    }
  }
}
```

Exposed methods can then be used as event handlers:

```html
<button @click="increment">
  {{ count }}
</button>
```

## **`<script setup>`**

Manually exposing lots of state and methods from `setup()` can be tedious. Fortunately, we can avoid that by using Single-File Components (SFCs). We can use `<script setup>` to greatly simplify the code:

```html
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```

Top-level imports, declared variables and functions in `<script setup>` are directly usable in the template of the same component. You can think of the template as being declared in the same scope as a JavaScript function — it naturally has access to everything declared alongside it.

<aside>
💡

**TIP**

Throughout the rest of the guide, we will basically use Single-File Components with `<script setup>` in Composition API examples, because that is how most Vue developers use it.

If you are not using Single-File Components, you can still use Composition API with the `setup()` option.

</aside>

## Why Refs?

You might be wondering: why do we need refs with `.value` instead of plain variables? To explain that, we need to briefly discuss how Vue's reactivity system works.

When you use a ref in a template and then change the ref's value, Vue automatically detects the change and updates the DOM accordingly. This is achieved through a dependency-tracking-based reactivity system. When a component renders for the first time, Vue tracks every ref that was used during the render. Then, when a ref is mutated, it triggers a re-render of the components that track it.

In standard JavaScript, there is no way to detect the access or mutation of plain variables. However, we can intercept the get and set operations of an object's properties using getter and setter methods.

The `.value` property gives Vue the opportunity to detect when a ref has been accessed or mutated. Under the hood, Vue performs the tracking in its getter, and performs triggering in its setter. Conceptually, you can think of a ref as an object that looks like this:

```jsx
// 伪代码，不是真正的实现
const myRef = {
  _value: 0,
  get value() {
    track()
    return this._value
  },
  set value(newValue) {
    this._value = newValue
    trigger()
  }
}
```

Another nice thing about refs is that, unlike plain variables, you can pass them into functions while retaining access to the latest value and the reactive connection. This is very useful when refactoring complex logic into reusable code.

## **Deep Reactivity**

Refs can hold any value type, including deeply nested objects, arrays, or JavaScript built-in data structures such as `Map`.

<aside>
💡

Explaining Map

`Map` is a new data structure introduced in ES6 (ECMAScript 2015) for storing key-value pairs. Unlike a plain object (`Object`), `Map` offers more flexible key types and more powerful functionality.

</aside>

A ref will make its value deeply reactive. This means you can expect changes to be detected even when you mutate nested objects or arrays:

```jsx
import { ref } from 'vue'

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // 以下都会按照期望工作
  obj.value.nested.count++
  obj.value.arr.push('baz')
}
```

Non-primitive values are turned into reactive proxies via `reactive()`, which is discussed below.

It is also possible to opt out of deep reactivity with shallow refs. For shallow refs, only `.value` access is tracked. Shallow refs can be used for optimizing performance by avoiding the reactivity overhead of large data, or in cases where the object's inner state is managed by an external library.

## **DOM Update Timing**

When you mutate reactive state, the DOM is updated automatically. However, the DOM updates are not applied synchronously. Instead, Vue buffers them until the "next tick" in the update cycle to ensure that each component updates only once no matter how many state changes you have made.

To wait for the DOM update to complete after a state change, you can use the nextTick() global API:

```jsx
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // 现在 DOM 已经更新了
}
```

# **`reactive()`**

There is another way to declare reactive state, with the `reactive()` API. Unlike a ref which wraps the inner value in a special object, `reactive()` makes an object itself reactive:

```jsx
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

Usage in template:

```html
<button @click="state.count++">
  {{ state.count }}
</button>
```

Reactive objects are JavaScript Proxies and behave just like normal objects. The difference is that Vue is able to intercept the access and mutation of all properties of a reactive object for reactivity tracking and triggering.

`reactive()` converts the object deeply: nested objects are also wrapped with `reactive()` when accessed. `ref()` also calls it internally when the ref value is an object. Similar to shallow refs, there is also the **`shallowReactive()`** API for opting out of deep reactivity.

## **Reactive Proxy vs. Original**

It is worth noting that the returned value from `reactive()` is a **Proxy** of the original object, which is not equal to the original object:

```jsx
const raw = {}
const proxy = reactive(raw)

// 代理对象和原始对象不是全等的
console.log(proxy === raw) // false
```

Only the proxy is reactive — mutating the original object will not trigger updates. Therefore, the best practice when working with Vue's reactivity system is to exclusively use the proxied versions of your state.

To ensure consistent access to the proxy, calling `reactive()` on the same object always returns the same proxy, and calling `reactive()` on an existing proxy returns that same proxy as well:

```jsx
// 在同一个对象上调用 reactive() 会返回相同的代理
console.log(reactive(raw) === proxy) // true

// 在一个代理上调用 reactive() 会返回它自己
console.log(reactive(proxy) === proxy) // true
```

This rule applies to nested objects as well. Due to deep reactivity, nested objects inside a reactive object are still proxies:

```jsx
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

## **Limitations of `reactive()`**

The `reactive()` API has a few limitations:

1. **Limited value types**: it only works for object types (objects, arrays, and **collection types** such as `Map` and `Set`). It cannot hold **primitive types** such as `string`, `number` or `boolean`.
2. **Cannot replace entire object**: since Vue's reactivity tracking works over property access, we must always keep the same reference to the reactive object. This means we can't easily "replace" a reactive object, because doing so loses the reactivity connection to the first reference:
    
    ```jsx
    
    let state = reactive({ count: 0 })
    
    // 上面的 ({ count: 0 }) 引用将不再被追踪
    // (响应性连接已丢失！)
    state = reactive({ count: 1 })
    ```
    
3. **Not destructure-friendly**: when we destructure a reactive object's primitive type property into local variables, or when we pass that property into a function, we lose the reactivity connection:
    
    ```jsx
    const state = reactive({ count: 0 })
    
    // 当解构时，count 已经与 state.count 断开连接
    let { count } = state
    // 不会影响原始的 state
    count++
    
    // 该函数接收到的是一个普通的数字
    // 并且无法追踪 state.count 的变化
    // 我们必须传入整个对象以保持响应性
    callSomeFunction(state.count)
    ```
    

Due to these limitations, we recommend using `ref()` as the primary API for declaring reactive state.

# **Additional Ref Unwrapping Details**

## **As Properties of Reactive Objects**

A ref is automatically unwrapped when it is accessed or mutated as a property of a reactive object. In other words, it behaves just like a normal property:

```jsx
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

If a new ref is assigned to a property that is linked to an existing ref, then it will replace the old ref:

```jsx
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// 原始 ref 现在已经和 state.count 失去联系
console.log(count.value) // 1
```

Ref unwrapping only happens when nested inside a deep reactive object. It will not unwrap when accessed as a property of a **shallow reactive object**.

# **Caveats with Arrays and Collections**

Unlike reactive objects, there is no unwrapping performed when a ref is accessed as an element of a reactive array or a native collection type (such as `Map`):

```jsx
const books = reactive([ref('Vue 3 Guide')])
// 这里需要 .value
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// 这里需要 .value
console.log(map.get('count').value)
```

## **Caveats with Unwrapping in Templates**

In the template render context, only top-level ref properties are unwrapped.

In the example below, `count` and `object` are top-level properties, but `object.id` is not:

```jsx
const count = ref(0)
const object = { id: ref(1) }
```

Therefore, this expression works as expected:

```html
{{ count + 1 }}
```

...while this one does **NOT**:

```html
{{ object.id + 1 }}
```

The rendered result will be `[object Object]1`, because `object.id` is not unwrapped when evaluating the expression and remains a ref object. To fix this, we can destructure `id` into a top-level property:

```jsx
const { id } = object
```

```html
{{ id + 1 }}
```

Now the rendered result will be `2`.

Another thing to note is that if a ref is the final evaluated value of a text interpolation (i.e. a `{{ }}` tag), then it will be unwrapped, so the following will render `1`:

```html
{{ object.id }}
```

This is merely a convenience feature of text interpolation, equivalent to `{{ object.id.value }}`.
