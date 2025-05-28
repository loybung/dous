const { parseTemplate, parseTemplateObject } = require("../dist/index");

const data = {
	name: "John",
	age: 15,
	sum: (a, b) => a + b,
};

const str = "{age} {name}";
const obj = {
	one: "{age} {say(`hello`)}",
	two: "{date} {Date.now()}",
};

console.log(parseTemplate(str, data));
console.log(parseTemplateObject(obj, data));
