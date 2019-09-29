/*装饰者模式*/
//核心思想：装饰一些东西，但不影响原有的功能

/*
* 使用场景:
*	场景1：Form表单组件，用户点击提交时把用户内容提交。增加装饰：提交之前做个校验

*	场景2：一个功能正常执行。增加装饰：在执行前记录下起始时间，在执行后记录下结束时间并计算消耗时间

*	场景3: 用户点击按钮，执行某个功能。增加装饰：在执行前发请求到统计平台，统计用户的点击次数

*	场景4：给一个编辑器组件增加一个输入改变时，保存数据到服务器节流的装饰
*/

//AOP 面向切面编程
const AOP = {}
AOP.before = function (fn, before) {
	return function(){
		before.apply(this,arguments)
		fn.apply(this,arguments)
	}
}
AOP.after = function (fn, after) {
	fn.apply(this,arguments)
	after.apply(this,arguments)
}

//点击按钮提交数据
function submit() {
	console.log('提交数据')
}

document.querySelector('.btn').onclick = submit

//在原有功能基础上做点装饰：点击按钮，提交数据前做个校验
function submit1() {
	console.log(this)
	console.log('提交数据')
}
function check() {
	console.log(this)
	console.log('先进行校验')
}
submit = AOP.before(submit1, check)
document.querySelector('.btn').onclick = submit


//另一个例子
const logWrapper = targetClass => {
	let orignRender = targetClass.prototype.render
	targetClass.prototype.render = function(){
		console.log("before render")
		orignRender.apply(this)
		console.log("after render")
	}
	return targetClass
}


class App {
	constructor() {
		this.title = '饥人谷首页'
	}
	render(){
		console.log('渲染页面:' + this.title);
	}
}

App = logWrapper(App)

new App().render()