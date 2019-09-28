/*
*	使用场景:
*	场景1
*	使用nodejs做一个ORM框架，给用户暴露一套统一的数据库操作接口，底层根据数据库类型适配不同数据库。

*	场景2
*	做一个日志模块，给用户暴露一套统一的记录日志接口，底层根据类型适配是文件存储日志还是数据库存储日志

*	场景3
*	前端开发过程中需用到获取数据和保存数据。
* 在开发阶段，可以把数据存储和查询用localStorage来做；接口就绪后可以发送请求从服务器存取数据。
* 使用适配器模式，为使用者提供统一接口。
*/
const  localStorageAdapter = {
	findAll: function(callback) {
		let cartList = JSON.parse(localStorage['cart'])
		callback(cartList)
	},
	save: function(item) {
		let cartList = JSON.parse(localStorage['cart'])
		cartList.push(item)
		localStorage['cart'] = JSON.stringify(cartList)
	}
}

const  serverAdapter = {
	findAll: function(callback) {
		fetch('https://jirengu.com/getCartList')
			.then(res => res.json())
			.then(data => callback(data))
	},
	save: function(item) {
		fetch('https://jirengu.com/addToCart', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) })
			.then(res => res.json())
			.then(data => callback(data))
	}
}

class ShoppingCart {
	constructor(adapter) {
		this.adapter = adapter
	}
	add(item) {
		this.adapter.save(item)
	}
	show() {
		this.adapter.findAll(list => {
			console.log(list)
		} )
	}
}


let cart = new ShoppingCart(localStorageAdapter)
//let cart = new ShoppingCart(serverAdapter)
cart.add({title: '手机'})
cart.add({title: '电脑'})
cart.show()
