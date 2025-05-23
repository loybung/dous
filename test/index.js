const { parseTemplate, parseTemplateObject } = require('../dist/index');

const data = {
  age: 15,
  sum: (a, b) => a + b,
  date: Date.now(),
};

const text = {
  one: '{{age}} {{sum(age, 5)}}',
  two: '{{date}} {{Date.now()}}',
};

const parsed = parseTemplateObject(text, data);
console.log(parsed);
