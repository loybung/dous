# Dous - SafeTemplateParser

A lightweight, fast, and secure template engine for safely parsing `{{expression}}` from strings or objects using a provided context. Designed for high-performance

---

## ✨ Features

- ✅ Safe expression evaluation (no global access like `Date.now`)
- ⚡ Fast performance with function caching
- 🔁 Supports repeated parsing with updated context
- 🧠 Ideal for large `data` objects and high-frequency usage
- 🔒 Prevents code injection via sandboxed variable names

---

## 📦 Installation

```bash
npm install @loybung/dous
```

---

## 🚀 Usage

```js
const { parseTemplate, parseTemplateObject } = require('@loybung/dous');

const data = {
  name: 'John',
  age: 15,
  say: text => text.toUpperCase(),
};

const str = '{age} {name}';
const obj = {
  one: '{age} {say(`hello`)}',
  two: '{date} {Date.now()}',
};

console.log(parseTemplate(str, data));
console.log(parseTemplateObject(obj, data));
// 15 John
// { one: '15 HELLO', two: '1748176273438 {Date.now()}' }
```

---

## 🛡 Safety

This library **only allows usage of variables defined in the `context` object**. It prevents access to global functions like `Date`, `window`, or `eval`.

For example:

```ts
const template = '{{Date.now()}}';
const result = parseTemplate(template, data);
// → '{{Date.now()}}'  (blocked)
```

---

## 🧠 Caching

All expressions (e.g. `sum(age, 5)`) are compiled once and cached internally for reuse. The values are always taken from the latest version of the `data` object when `parseTemplate()` or `parseTemplateObject()` is called.

---
