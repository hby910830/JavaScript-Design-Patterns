/*外观模式:
*	为一组复杂的子系统接口提供一个更高级的统一接口,通过这个接口使得对子系统接口的访问更容易。
*/

//举例1:
// 绑定事件的兼容写法
function addEvent(el, type, fn) {
	if (window.addEventListener) {
		el.addEventListener(type, fn, false)
	} else if (window.attachEvent) {
		el.attachEvent('on' + type, fn)
	} else {
		el['on' + type] = fn
	}
}


//举例2:
class Slide{
	constructor(){
		console.log('初始化轮播')
	}
	start(){
		console.log('轮播开始启动')
	}
}

class Tab{
	constructor(){
		console.log('初始化Tab')
	}
	start(){
		console.log('Tab开始启动')
	}
}

let slide = new Slide()
let tab = new Tab()
slide.start()	// 初始化轮播  初始化Tab
tab.start()		// 轮播开始启动  Tab开始启动

class App{
	constructor(){
		this.slide = new Slide()
		this.tab = new Tab()
	}
	start(){
		this.slide.start()
		this.tab.start()
	}
}
let app = new App()
app.start()	// 初始化轮播  初始化Tab 轮播开始启动  Tab开始启动