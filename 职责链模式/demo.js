/*职责链模式
*	责任链模式在面向对象程式设计里是一种软件设计模式，它包含了一些命令对象和一系列的处理对象。
*	每一个处理对象决定它能处理哪些命令对象，它也知道如何将它不能处理的命令对象传递给该链中的下一个处理对象。
*	该模式还描述了往该处理链的末尾添加新的处理对象的方法。
*/
let str = 'hello world'
const Operator = (function () {
	let data

	function source(param) {
		data = param
		return {pipe}
	}

	function pipe(handler) {
		data = handler(data)
		return {pipe}
	}

	return {source}
})()
Operator.source(str)
	.pipe(repeat)
	.pipe(trim)
	.pipe(reverse)
	.pipe(result => console.log(result)) //ddllrrooww  oolllleehh

function repeat(str) {
	return str.split('')
		.reduce((v1, v2)=>{
			v1.push(v2)
			v1.push(v2)
			return v1
		}, []).join('')
}

function trim(str) {
	return str.trim()
}

function reverse(str) {
	return str.split('').reverse().join('')
}