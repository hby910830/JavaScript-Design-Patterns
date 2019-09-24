/*什么是桥接模式
*		把事物对象和其具体行为、具体特征分离开来，使它们可以各自独立的变化
* 案例
		男生     女生
		钢琴     吉他
	钢琴能演奏，吉他能演奏
	男生能让乐器演奏，女生能让乐器演奏
	钢琴是乐器, 吉他是乐器
	需要一种方式让对象和行为分离，便于随意拼接
*/
function Boy(instrument) {
	this.sayHi = function () {
		console.log('hi, 我是男生')
	}
	this.playInstrument = function () {
		instrument.play()
	}
}

function Girl(instrument) {
	this.sayHi = function () {
		console.log('hi, 我是女生')
	}
	this.playInstrument = function () {
		instrument.play()
	}
}

function Piano() {
	this.play = function () {
		console.log('钢琴开始演奏')
	}
}

function Guitar() {
	this.play = function () {
		console.log('吉他开始演奏')
	}
}

let piano = new Piano()
let guitar = new Guitar()
let pianoBoy = new Boy(piano)
pianoBoy.playInstrument()
let guitarGirl = new Girl(guitar)
guitarGirl.playInstrument()
