/*JS对象没有私有属性*/
{
	let Book = function () {
	}
	Book.prototype.setTitle = function (title) {
		if (!this.checkTitle(title)) return
		this.title = title
	}
	Book.prototype.checkTitle = function (title) {
		return title.length > 2 && title.length < 20
	}
	Book.prototype.display = function () {
		console.log('Book title is ' + this.title)
	}
	let myBook = new Book()
	myBook.setTitle('设计模式by饥人谷')
	myBook.display()
	myBook.checkTitle('啊')  //不希望这个方法被外部调用，只希望被内部调用
	myBook.title = 'Http深入浅出by饥人谷' //不希望直接修改这个属性
}



/*形式上的“封装”,给不想暴露的方法命名加下划线，虽然本质上没什么用，但至少形式上便于理解*/
{
	let Book = function () {
	}
	Book.prototype.setTitle = function (title) {
		if (!this._checkTitle(title)) return
		this.title = title
	}
	Book.prototype._checkTitle = function (title) {
		return title.length > 2 && title.length < 20
	}
	Book.prototype.display = function () {
		console.log('Book title is ' + this.title)
	}
}


/*让需要隐藏的数据变为局部变量*/
{
	let Book = function() {
		let title
		function checkTitle(title) {
			return title.length > 2 && title.length < 20
		}
		this.setTitle =  function(newTitle) {
			if(!checkTitle(newTitle)) return
			title = newTitle
		}
		this.display = function() {
			console.log('Book title is ' + title)
		}
	}
	Book.prototype.other = function() {}
	let myBook = new Book()
	myBook.setTitle('设计模式by饥人谷')
	myBook.display()

}


/*静态方法和属性*/
{
	let Book = (function() {
		//私有的静态变量，只有一份
		let numOfBooks = 0
		//私有的静态方法，只有一份
		function checkTitle(title) {
			return title.length > 2 && title.length < 20
		}
		return function() {
			let title
			numOfBooks++
			if(numOfBooks > 10)  throw new Error('最多只能创建10本书')
			this.setTitle =  function(newTitle) {
				if(!checkTitle(newTitle)) return
				title = newTitle
			}
			this.display = function() {
				console.log('Book title is ' + title)
			}
		}
	})()
//公开的静态方法
	Book.convertToTitleCase = function(str) {}
//公开的实例方法
	Book.prototype = {
		other: function(){}
	}
}