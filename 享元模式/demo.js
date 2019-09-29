/*
* 享元模式（英语：Flyweight Pattern）是一种软件设计模式。
* 它使用共享物件，用来尽可能减少内存使用量以及分享资讯给尽可能多的相似物件；
* 它适合用于当大量物件只是重复因而导致无法令人接受的使用大量内存。
* 通常物件中的部分状态是可以分享。
* 常见做法是把它们放在外部数据结构，当需要使用时再将它们传递给享元。
* */

//举个例子
// 作为一个现代社会人，每个人要随手能使用一个自己中意品牌的智能手机才能正常生活。如此一来13亿人就制造13亿部智能手机，这可是一笔不小的开支。
// 怎么办呢？共享经济啊。
// 每种牌子的手机我们只造一部，这样任何人需要任何品牌的手机来借就行。反正用起来跟自己的一样。

/*
*	代码演示
*/

//以前
class Phone{
	constructor(band){
		this.band = band
	}
	call(){
		console.log('I use ' + this.band + ' to call')
	}
}

class People {
	constructor(name, band){
		this.name = name
		this.phone = new Phone(band)
	}
	call(){
		console.log('I am ' + this.name)
		this.phone.call()
	}
}
let p1 = new  People('A', 'XiaoMi')
let p2 = new  People('B', 'XiaoMi')
let p3 = new  People('C', 'Apple')
let p4 = new  People('D', 'XiaoMi')
p1.call() //I am A；  I use XiaoMi to call
p2.call()	//I am B；  I use XiaoMi to call
p3.call()	//I am C；  I use Apple to call
p4.call()	//I am D；  I use baXiaoMi to call

//现在
class Phone1 {
	constructor( band ) {
		this.band = band
	}
	call() {
		console.log('I use' + this.band + ' to call')
	}
}

const PhoneRenter = (function(){
	let phones = []
	return {
		getPhone: function(bind){
			if(!phones[bind]){
				phones[bind] = new Phone1(bind)
			}
			return phones[bind]
		}
	}
})()

class People1 {
	constructor(name, bind){
		this.name = name
		this.phone = PhoneRenter.getPhone(bind)
	}
	call() {
		console.log('I am ' + this.name)
		this.phone.call()
	}
}

let p11 = new  People1('A', 'XiaoMi')
let p22 = new  People1('B', 'XiaoMi')
let p33 = new  People1('C', 'Apple')
let p44 = new  People1('D', 'XiaoMI')
p11.call()	//I am A；  I use XiaoMi to call
p22.call()	//I am B；  I use XiaoMi to call
p33.call()	//I am C；  I use Apple to call
p44.call()	//I am D；  I use baXiaoMi to call


/* 享元模式适合:
*	1、大量对象很消耗内存
*	2、对象里面一些东西是重复的
*	所以以后一提到“大量”、“内存”这种字眼，首先想到的优化方案就是享元模式
*/

/*编程套路：
*	1、先看看是不是符合享元模式的特征
*	2、抽离出最小的享元
*	3、用工厂模式（类单例模式）拿出复用的享元
*	4、对大量重复对象，内部使用享元
* */


//其他场景
// 前端有个常见面试题，说对是页面上有大量（成千上万条）列表，如何在渲染页面以及滚动页面的时候不卡顿。

// 2B青年这样回答：没事整上万条数据展示到页面，你脑子有包啊
// 普通青年这样回答： 页面滚下去后可以删除上面那些看不见的Dom元素，当往上滚时在创建那些已经删除的元素。保证DOM元素在一定数量
// 优秀青年这样回答： 可以使用享元模式，xx%%..##

// 那如何用享元模式来套呢？想想我们的场景，首先页面上有成千上万的列表，列表是由数据和DOM元素构成的。
// 数据虽然都是不一样的，但DOM元素都是div是可以公用的。
// 如果页面上就只有十几个公用的DOM元素，在页面滚动的时候不断把数据放进去，那页面就不会卡
// 。就像我们上面的例子，13亿人每人都能使用自己喜欢牌子的手机，人是独立的，但手机就那几款。