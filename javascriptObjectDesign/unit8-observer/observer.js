// 发布订阅模式 也叫观察者模式
// 1，售楼处
/*
1, 首先要指定好谁是发布者
2. 发布者要有一个缓存列表来存放回调函数 以便通知订阅者
3.最后发布消息的时候，发布者会遍历这些回调函数依次触发这些函数
*
*/
var salesOffices = {}
salesOffices.clientList = []
salesOffices.listen = function (fn) {
	// 增加订阅者
	this.clientList.push(fn)
}
salesOffices.trigger = function () {
	for (let i = 0; i < this.clientList.length; i++) {
		var fn = this.clientList[i]
		fn.apply(this, arguments) // arguments是发布消息时候所携带的参数
	}
}
// test
salesOffices.listen(function (price, squareMeter) {
	// 小名订阅消息
	console.log('价格' + price)
	console.log('平方' + squareMeter)
})
salesOffices.listen(function (price, squareMeter) {
	// 小红订阅消息
	console.log('价格' + price)
	console.log('平方' + squareMeter)
})

salesOffices.trigger(200, 88)
salesOffices.trigger(300, 100)
// 价格200
// VM2941:15 平方88
// VM2941:18 价格200
// VM2941:19 平方88
// VM2941:14 价格300
// VM2941:15 平方100
// VM2941:18 价格300
// VM2941:19 平方100

// 订阅者接收到了所有的消息，增加一个key 只发给订阅者感兴趣的东西
var salesOffices = {}
salesOffices.clientList = {}
salesOffices.listen = function (key, fn) {
	// 增加订阅者
	if (!this.clientList[key]) {
		this.clientList[key] = []
	}
	this.clientList[key].push(fn)
}
salesOffices.trigger = function () {
	var key = Array.prototype.shift.apply(arguments)
	var fns = this.clientList[key]
	if (!fns || !fns.length) {
		return false
	}
	for (let i = 0; i < fns.length; i++) {
		var fn = fns[i]
		fn.apply(this, arguments) // arguments是发布消息时候所携带的参数
	}
}

salesOffices.listen('square88', function (price, squareMeter) {
	// 小名订阅消息
	console.log('价格' + price)
	console.log('平方' + squareMeter)
})
salesOffices.listen('square100', function (price, squareMeter) {
	// 小红订阅消息
	console.log('价格' + price)
	console.log('平方' + squareMeter)
})
salesOffices.trigger('square88', 200, 88)
salesOffices.trigger('square100', 300, 100)

// 让一个公共对象拥有发布订阅能力
var Event = {
	clientList: [],
	listen: function (key, fn) {
		if (!this.clientList[key]) {
			this.clientList[key] = []
		}
		this.clientList[key].push(fn)
	},
	trigger: function () {
		var key = Array.prototype.shift.apply(arguments)
		var fns = this.clientList[key]
		if (!fns || !fns.length) {
			return false
		}
		for (var i = 0; i < fns.length; i++) {
			var fn = fns[i]
			fn.apply(this, arguments)
		}
	}
}

// 在定义一个installEvent函数
var installEvent = function (obj) {
	for (var key in Event) {
		obj[key] = Event[key]
	}
}

// 取消订阅的时间
Event.remove = function (key, fn) {
	var fns = this.clientList[key]
	if (!fns) {
		return false
	}
	if (!fn) {
		fns && f((ns.length = 0)) //没有传入具体的回调函数 则取消对应key的所有订阅消息
	} else {
		for (var i = 0; i < fns.length; i++) {
			//  源代码使用反向遍历 暂时未知这样写法的好处。
			var _fn = fns[i]
			if (_fn === fn) {
				fns.splice(i, 1)
			}
		}
	}
}

// 全局的发布订阅对象，可以减少每个对象都有发布和订阅和缓存列表，而且发布者和订阅者不用知道对方是谁，
var sale = {}
sale.cacheList = []
sale.listen = function (fn) {
	this.cacheList.push(fn)
}
sale.trigger = function () {
	for (var i = 0; i < this.cacheList.length; i++) {
		const f = this.cacheList[i]
		console.log(arguments)
		f.apply(this, arguments)
	}
}
sale.listen(function (meter, price) {
	console.log(meter, price)
})
sale.trigger(100, '100w')
sale.trigger(88, '88w')

var sale = {}
sale.cacheList = {}
sale.listen = function (type, fn) {
	if (!this.cacheList[type]) {
		this.cacheList[type] = []
	}
	this.cacheList[type].push(fn)
}

sale.trigger = function () {
	var type = Array.prototype.shift.apply(arguments)
	if (!type || !this.cacheList[type] || this.cacheList[type].length === 0) {
		return false
	}
	for (let i = 0; i < this.cacheList[type].length; i++) {
		const fn = this.cacheList[type][i]
		fn.apply(this, arguments)
	}
}
sale.listen('square88', function (price, t) {
	console.log(price, t)
})
sale.listen('square200', function (price, t) {
	console.log(price, t)
})
// sale.trigger('square88', '88', '08')
sale.trigger('square200', '200', '09')

sale.remove = function (key, fn) {
	var fns = this.cacheList[key]
	if (!fns) {
		return false
	}
	if (!fn) {
		fns && (fns.length = 0)
	}
	for (var i = 0; i < fns.length; i++) {
		var _fn = fns[i]
		if (fn === _fn) {
			fns.splice(i, 1)
		}
	}
}

sale.remove('square88')
sale.trigger('square88', '88', '08')
// var arr = [9, 2, 5,7]
// for(var i = 0; i< arr.length; i++) {
//   if(arr[i] === 5) {
//     arr.splice(i,1)
//   }
// }
// console.log(arr)

// 通用
const Event = {}
Event.cacheList = []
// 将订阅函数根据订阅类型存入缓存列表
Event.listen = function (type, fn) {
	if (!this.cacheList[type]) {
		this.cacheList[type] = []
	}
	this.cacheList[type].push(fn)
}

Event.trigger = function () {
	const type = Array.prototype.shift.apply(arguments)
	const fns = this.cacheList[type]
	for (let i = 0; i < fns.length; i++) {
		fns.apply(this, arguments)
	}
}

Event.remove = function (type, fn) {
	const fns = this.cacheList[type]
	if (!fn) {
		fns && (fns.length = 0)
	}
	for (let i = 0; i < fns.length; i++) {
		const _fn = fns[i]
		if (_fn === fn) {
			fns.splice(i, 1)
		}
	}
}

