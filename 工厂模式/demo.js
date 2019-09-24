/*什么是工厂模式
*工厂模式是一种 创建模式，用来解决创建对象的问题。根据参数类型，通过调用工厂方法来创建不同类型的对象。
*适用场景:
*	对象的构建十分复杂
*	根据不同的条件创建不同的对象
* */

{
	function PhoneShop() {}
	PhoneShop.prototype = {
		sellPhone: function(type) {
			let phone;
			switch(type) {
				case '苹果':
					phone = new IPhone()
					break
				case '华为':
					phone = new HuaWei()
					break
				default:
					phone = new XiaoMi()
			}
			phone.film()  //给手机贴膜
			return phone
		}

	}

	function IPhone() {
		this.say = function() {
			console.log('iPhone: 宇宙我最贵')
		}
		this.film = function() {
			console.log('iPhone 贴膜完成')
		}
	}

	function HuaWei() {
		this.say = function() {
			console.log('华为: 我能看到银河')
		}
		this.film = function() {
			console.log('华为贴膜完成')
		}
	}

	function XiaoMi() {
		this.say = function() {
			console.log('小米: 你永远买不到我')
		}
		this.film = function() {
			console.log('小米贴膜完成')
		}
	}

	let shop = new PhoneShop()
	let myPhone = shop.sellPhone('华为')
	myPhone.say()
}

/*贴膜可以由手机店来做，但生产手机不应该由手机店生产。可以让厂家生产*/
{
	let phoneFactory = {
		createPhone: function(type) {
			let phone;
			switch(type) {
				case '苹果':
					phone = new IPhone()
					break
				case '华为':
					phone = new HuaWei()
					break
				default:
					phone = new XiaoMi()
			}
			return phone
		}

	}

	function PhoneShop() {}
	PhoneShop.prototype = {
		sellPhone: function(type) {
			let phone = phoneFactory.createPhone(type)
			phone.film()
			return phone
		}

	}

	function IPhone() {
		this.say = function() {
			console.log('iPhone: 宇宙我最贵')
		}
		this.film = function() {
			console.log('iPhone 贴膜完成')
		}
	}

	function HuaWei() {
		this.say = function() {
			console.log('华为: 我能看到银河')
		}
		this.film = function() {
			console.log('华为贴膜完成')
		}
	}

	function XiaoMi() {
		this.say = function() {
			console.log('小米: 你永远买不到我')
		}
		this.film = function() {
			console.log('小米贴膜完成')
		}
	}

	let shop = new PhoneShop();
	let myPhone = shop.sellPhone('苹果')
	myPhone.say()
}