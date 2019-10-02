/* 命令模式
*	命令模式（英语：Command pattern）是一种设计模式，它尝试以对象来代表实际行动。命令对象可以把行动(action) 及其参数封装起来，于是这些行动可以被：
*	重复多次
*	取消（如果该对象有实现的话）
*	取消后又再重做
* */

const Command = (function(){
	let cmds = []
	let recever
	return {
		bind: function(rec){
			recever = rec
		},
		exec: function(cmd) {
			cmds.push(cmd)
			recever[cmd.type] && recever[cmd.type](cmd.payload)
		},
		undo: function() {
			let cmd = cmds.pop()
			if(!cmd) return
			recever[cmd.type] && recever[cmd.type](cmd.payload)
		}
	}
})()

let UserOperation = {
	find: function() {
		console.log('查找')
	},
	add: function(data) {
		console.log('添加数据：' + data )
	},
	delete: function(data) {
		console.log('删除数据： ' + data)
	}
}

Command.bind(UserOperation)
Command.exec({type: 'add', payload: 'jirengu.com'})
Command.exec({type: 'find'})
Command.exec({type: 'delete', payload: 'xiedaimala.com'})
Command.undo()
Command.undo()
Command.undo()
