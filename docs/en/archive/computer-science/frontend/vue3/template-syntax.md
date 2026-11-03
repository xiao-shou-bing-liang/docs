---
date: 2025-04-22
---

# Template Syntax

# Text Interpolation

The most basic form of data binding is text interpolation using the "Mustache" syntax (double curly braces):

```html
<span>Message: {{ msg }}</span>
```

The mustache tag will be replaced with the value of the `msg` property from the corresponding component instance. It will also be updated whenever the `msg` property changes.

# **Raw HTML**

The double curly braces interpret the data as plain text, not HTML. If you want to insert HTML, you need to use the **`v-html` [directive](https://cn.vuejs.org/api/built-in-directives.html#v-html)**:

```html
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

<aside>
💡

**Things to note:**

The `rawHtml` here is a piece of `html` code defined with `const` in `script`

The first line, after passing in `rawHtml`, outputs text when rendered

The second line, once bound with `v-html`, renders the defined `html` code

</aside>

<aside>
⚠️

**Security warning:**

**Dynamically rendering arbitrary HTML on a website is very dangerous, because it can easily lead to XSS vulnerabilities. Only use `v-html` when the content is safe and trustworthy, and never use HTML content provided by users.**

</aside>

# **Attribute Bindings**

In Vue.js, attribute binding is a technique for dynamically binding data to the attributes of an HTML element. It lets you set an element's attribute values dynamically based on the component's state or data, instead of hard-coding them in the HTML.

The double curly braces cannot be used inside HTML attributes. To reactively bind an attribute, use the **`v-bind`** directive:

```html
<div v-bind:id="dynamicId"></div>
```

The `v-bind` directive instructs Vue to keep the element's `id` attribute in sync with the component's `dynamicId` property. If the bound value is `null` or `undefined`, the attribute will be removed from the rendered element.

## **Shorthand**

Because `v-bind` is so commonly used, we provide a dedicated shorthand syntax:

```html
<div :id="dynamicId"></div>
```

Attributes that start with `:` may look a little different from normal HTML attributes, but they are in fact valid attribute-name characters, and all browsers that support Vue can parse them correctly. In addition, they do not appear in the final rendered DOM. The shorthand syntax is optional, but we believe you will like it even more once you know its many uses.

> In the guidance that follows, we will use the shorthand syntax in all examples, because it is the more common usage in real development.
> 

## **Same-name Shorthand**

<aside>
⚠️

Note: 

Only supported in version 3.4 and above

</aside>

If an attribute's name is the same as the name of the JavaScript value it is bound to, you can simplify the syntax even further by omitting the attribute value:

```html
<!-- 与 :id="id" 相同 -->
<div :id></div>

<!-- 这也同样有效 -->
<div v-bind:id></div>
```

This is similar to the property shorthand syntax used when declaring objects in JavaScript. Note that this is a feature only available in Vue 3.4 and above.

## **Boolean Attributes**

Boolean attributes **** determine whether the attribute should exist on the element based on a true / false value. [**`disabled`**](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled) is one of the most common examples.
`v-bind` behaves slightly differently in this scenario:

```html
<button :disabled="isButtonDisabled">Button</button>
```

<aside>
💡

Let me explain

1. `disabled` is a standard attribute of HTML buttons, used to control whether the button is available.
2. `isButtonDisabled` is **reactive data of a Vue component; it can be `true` || `false` to determine whether the button is available**
</aside>

## **Dynamically Binding Multiple Values**

If you have a JavaScript object containing multiple attributes, like this:

```jsx
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper',
  style: 'background-color:green'
}
```

Through `v-bind` without an argument, you can bind them to a single element:

```html
<div v-bind="objectOfAttrs"></div>
```

# **Using JavaScript Expressions**

So far we have only bound some simple property names in our templates. But Vue actually supports the full power of JavaScript expressions in all data bindings:

```html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>
```

These expressions will be evaluated as JavaScript, with the current component instance as the scope.

Inside Vue templates, JavaScript expressions can be used in the following situations:

- Inside text interpolation (double curly braces)
- Inside the value of any Vue directive (the special attribute starting with `v-`)

<aside>
💡

Noting the JS expressions on the third and fourth lines:

1. Third line: `{{ message.split('').reverse().join('') }}` 
    - This is an expression that **chains JavaScript method calls**, used to reverse a string.
    - The specific steps:
        1. `message.split('')` → splits the string into an array of characters (e.g. `"hello"` → `['h', 'e', 'l', 'l', 'o']`).
        2. `.reverse()` → reverses the array (e.g. `['h', 'e', 'l', 'l', 'o']` → `['o', 'l', 'l', 'e', 'h']`).
        3. `.join('')` → joins the array back into a string (e.g. `['o', 'l', 'l', 'e', 'h']` → `"olleh"`).
2. Fourth line: `<div :id="`list-${id}`"></div>`
    - This is an example of **dynamically binding an HTML attribute**, using `v-bind` (shorthand `:`) to bind the `id` attribute.
    - ``list-${id}`` is a **template literal**, used to dynamically generate the `id` value.
    - In the end the value of `id` will be `"list-"` plus the value of the `id` variable.
        
        > `${id}` is **JavaScript's template literal** syntax, used to embed variables or expressions in a string.
        > 
</aside>

## **Expressions Only**

Each binding only supports a **single expression**, that is, a piece of JavaScript code that can be evaluated. A simple way to tell is whether it can legally be written after `return`.

Therefore, the following examples are all **invalid**:

```html
<!-- 这是一个语句，而非表达式 -->
{{ var a = 1 }}

<!-- 条件控制也不支持，请使用三元表达式 -->
{{ if (ok) { return message } }}调用函数
```

<aside>
⚠️

In JavaScript, `return` can be followed by:

1. **A variable** (e.g. `return x;`)
2. **A literal** (e.g. `return 42;` or `return "hello";`)
3. **An arithmetic operation** (e.g. `return x + 1;`)
4. **A logical operation** (e.g. `return x > 0;`)
5. **A ternary operator** (e.g. `return x > 0 ? "Yes" : "No";`)
6. **A function call** (e.g. `return Math.max(1, 2);`)
7. **An array/object literal** (e.g. `return [1, 2];` or `return { name: "Alice" };`)
8. **A template literal** (e.g. `return \`Hello, ${name}`;``)

But it **cannot** contain:

- **Statements** (such as `if`, `for`, `while`, `var`, etc.)
- **Multiple lines of code**
- **An assignment** (such as `x = 1;`, though `x` can be used as a variable)
</aside>

## **Calling Functions**

A method exposed by a component can be used inside a bound expression:

```html
<time :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</time>
```

<aside>
💡

**TIP**

Methods bound in expressions are re-invoked every time the component updates, so they should not produce any side effects, such as changing data or triggering asynchronous operations.

</aside>

<aside>
⚠️

Note:

Calling computationally heavy functions directly in a Vue template (such as loops, complex calculations, or asynchronous operations) will hurt page performance, because Vue re-executes those functions on every re-render, which affects page responsiveness

</aside>

## **Restricted Global Access**

Expressions in templates are sandboxed and can only access a limited list of global objects. That list exposes commonly used built-in global objects such as `Math` and `Date`.

Global objects that are not explicitly included in the list cannot be accessed in template expressions, for example properties that users have attached to `window`. However, you can explicitly add them on **`app.config.globalProperties`** for use by all Vue expressions.

<aside>
💡

TIP

In Vue template expressions, **only a limited set of global objects can be accessed by default**, for reasons of security and performance.

The Vue template sandbox allows access to the following global objects by default:

- `Math` (math calculations)
- `Date` (date handling)
- `JSON` (JSON parsing/serialization)
- `Reflect` (reflection API)
- `Intl` (internationalization API)
</aside>

# **Directives**

Directives are special attributes with the `v-` prefix. Vue provides a number of built-in directives, including the `v-bind` and `v-html` we introduced above.

A directive attribute's expected value is a single JavaScript expression (with the exception of a few, namely `v-for`, `v-on` and `v-slot`, which will be discussed later). A directive's job is to reactively update the DOM when the value of its expression changes. Take [**`v-if`**](https://cn.vuejs.org/api/built-in-directives.html#v-if) as an example:

```html
<p v-if="seen">Now you see me</p>
```

Here, the `v-if` directive will remove/insert the `<p>` element based on whether the value of the `seen` expression is truthy.

## **Arguments**

Some directives can take an "argument", denoted by a colon after the directive name. For example, the `v-bind` directive is used to reactively update an HTML attribute:

```html
<a v-bind:href="url"> ... </a>

<!-- 简写 -->
<a :href="url"> ... </a>
```

Here `href` is the argument, which tells the `v-bind` directive to bind the value of the expression `url` to the element's `href` attribute. In the shorthand, everything before the argument (e.g. `v-bind:`) is condensed into a single `:` character.

Another example is the `v-on` directive, which listens for DOM events:

```html
<a v-on:click="doSomething"> ... </a>

<!-- 简写 -->
<a @click="doSomething"> ... </a>
```

Here the argument is the event name to listen for: `click`. `v-on` has a corresponding shorthand, namely the `@` character. We will discuss more details about event handling later as well.

## **Dynamic Arguments**

It is also possible to use a JavaScript expression in a directive argument by wrapping it in a pair of square brackets:

```html
<!--
注意，参数表达式有一些约束，
参见下面“动态参数值的限制”与“动态参数语法的限制”章节的解释
-->
<a v-bind:[attributeName]="url"> ... </a>

<!-- 简写 -->
<a :[attributeName]="url"> ... </a>
```

Here `attributeName` will be dynamically evaluated as a JavaScript expression, and its evaluated value will be used as the final argument. For example, if your component instance has a data property `attributeName` whose value is `"href"`, then this binding is equivalent to `v-bind:href`.

<aside>
💡

Let me chime in

It just replaces the left-hand value in the expression

</aside>

Similarly, you can bind a function to a dynamic event name:

```html
<a v-on:[eventName]="doSomething"> ... </a>

<!-- 简写 -->
<a @[eventName]="doSomething"> ... </a>
```

In this example, when the value of `eventName` is `"focus"`, `v-on:[eventName]` is equivalent to `v-on:focus`.

### **Constraints on the Value of Dynamic Arguments**

The value of the expression in a dynamic argument should evaluate to a string, or `null`. The special value `null` means explicitly removing the binding. Any other non-string value will trigger a warning.

### **Constraints on Dynamic Argument Syntax**

Dynamic argument expressions have some syntax constraints because certain characters, such as spaces and quotes, are invalid inside HTML attribute names. For example, the following example:

```html
<!-- 这会触发一个编译器警告 -->
<a :['foo' + bar]="value"> ... </a>
```

If you need to pass in a complex dynamic argument, we recommend replacing the complex expression with a computed property, which is also one of Vue's most fundamental concepts and which we will cover very soon.

When using in-DOM templates (templates written directly in an HTML file), we need to avoid using uppercase letters in the name, because the browser will force them to lowercase:

```html
<a :[someAttr]="value"> ... </a>
```

The example above will be converted to `:[someattr]` inside in-DOM templates. If your component has a "someAttr" property rather than "someattr", the code will not work. Templates in Single-File Components are **not** subject to this constraint.

<aside>
💡

In-DOM templates:
In Vue.js, **in-DOM templates** (inline templates) are a way that allows you to define a Vue component's template directly in HTML. This approach is usually used in **non-Single-File-Component (SFC)** scenarios, such as using Vue directly inside a traditional HTML file.

</aside>

## **Modifiers**

Modifiers are special suffixes denoted by a dot, indicating that a directive should be bound in some special way. For example, the `.prevent` modifier tells the `v-on` directive to call `event.preventDefault()` on the triggered event:

```html
<form @submit.prevent="onSubmit">...</form>
```

Later, when we cover the functionality of [**`v-on`**](https://cn.vuejs.org/guide/essentials/event-handling.html#event-modifiers) and [**`v-model`**](https://cn.vuejs.org/guide/essentials/forms.html#modifiers), you will see examples of other modifiers.
