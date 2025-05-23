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
import { parseTemplate, parseTemplateObject } from '@loybung/dous';

const data = {
  age: 15,
  sum: (a: number, b: number) => a + b,
  date: Date.now(),
};

const template = {
  one: '{{age}} {{sum(age, 5)}}',
  two: '{{date}} {{unknown}}',
};

// Parse object
const result = parseTemplateObject(template, data);

console.log(result);
// {
//   one: '15 20',
//   two: '1716460000000 {{unknown}}'
// }
```

You can also parse individual strings:

```ts
const str = '{{sum(age, 5)}}';
const parsed = parseTemplate(str, data); // → '20'
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
