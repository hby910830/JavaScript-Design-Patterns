/*什么是单例模式
*把一堆代码放入一个逻辑单元，可通过一个单一的变量来访问。
*最大的好处是封装代码，减少全局变量。
*/

/*原始写法，全局变量多，难以维护*/
{
	let btn = document.querySelector('#btn')
	btn.onclick = function() {
		render()
	}
	function render() {
		console.log('render')
	}
}

/*用单例模式，把一坨代码代码整合到一个对象里，作为它的属性和方法。只保留一个全局变量，通过预留的“入口”启动*/
{
	let app = {
		btn: document.querySelector('#btn'),
		init: function() {
			this.bind()
		},
		bind: function() {
			let _this = this
			this.btn.onclick = function() {
				_this.render()
			}
		},
		render() {
			console.log('render jirengu.com')
		}
	}
	app.init()
}

/*使用闭包，来隐藏部分不需要暴露的变量，只暴露出init方法。这种特殊的单例模式也叫模块模式(module pattern)*/
{
	let app = (function(){
		let btn = document.querySelector('#btn')
		function bind() {
			btn.onclick = function() {
				render()
			}
		}
		function render() {
			console.log('render jirengu.com')
		}

		return {
			init: function() {
				bind()
			}
		}
	})()

	app.init()
}

/*改进, 不立即创建实例，等需要的时候再创建。*/
{
	let Singleton = (function(){
		let instance
		function createInstance() {
			let btn = document.querySelector('#btn')
			function bind() {
				btn.onclick = function() {
					render()
				}
			}
			function render() {
				console.log('render jirengu.com')
			}
			return {
				init: function() {
					bind()
				}
			}
		}
		return {
			getInstance: function() {
				if(!instance) {
					return createInstance()
				}
				return instance
			}
		}
	})()

	let app = Singleton.getInstance()
	app.init()
}