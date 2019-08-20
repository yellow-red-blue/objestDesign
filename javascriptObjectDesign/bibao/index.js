// bigao 
// 变量向上查找。
// 闭包就是保持对函数内变量的引用
for (var i = 0; i < arr1.length; i++) {
  arr1[i].onclick = function () {
    console.log(i)
  }
}
// 当onclick执行时外面的for循环早已执行完毕，此时通过变量查找的i都是最大值

// 可以使用立即执行函数包裹
for (var i = 0; i < arr2.length; i++) {
  (function (i) {
    let l = i
    arr2[l].onclick = function () {
      console.log(l)
    }
  })(i)
}
// 也可以使用let  创造一个封存的作用域。
for (let i = 0; i < arr3.length; i++) {
  arr3[i].onclick = function () {
    console.log(i)
  }
}

// 闭包的的更多作用
// 1封装变量
var mult = function () {
  var a = 1
  for (let i = 0; i < arguments.length; i++) {
    a = a * arguments[i]
  }
  return a
}
// 每次计算不好。能不能把计算过的缓存在函数里

// 写法错误  并未用到闭包 返回的知识一个变量，可以试着执行一下
var mult = function () {
  var cache = {}
  var a = 1
  var key = Array.prototype.join.apply(arguments, [','])
  if (cache[key]) {
    console.log('0')
    return cache[key]
  } else {
    console.log('1')
    for (let i = 0; i < arguments.length; i++) {
      a = a * arguments[i]
    }
    cache[key] = a
    return cache[key]
  }
}
mult(1, 2, 3) // console.log 1
mult(1, 2, 3) // console.log 1
// 可见并未走到 0  ，表示未能保持对函数内变量的引用
// 退出函数后  变量a和cache被销毁

// 闭包是函数执行后返回一个函数 这个函数将一直保持对函数变量的引用，，此时称之为闭包
// for example
var funcA = function () {
  var a = 1
  return function () {
    a++
    console.log(a)
  }
}

var f = funcA()
f() //2
f() // 3
f() // 4
funcA()() // 2
funcA()() // 2
funcA()() // 2
// 可以理解为.子函数赋值给了一个全局变量，保持了对子函数的引用，保证了不会被垃圾回收机制回收
// 原因就在于f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，
// 而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。
// 第二种是执行函数 并没保持对变量的引用 所以每次调用都是重新执行一次函数。

var funcA = (function () {
  var a = 1
  return function () {
    a++
    console.log(a)
  }
})()
funcA()
funcA()
// 继续第一个
var mult1 = function () {
  var cache = {}
  return function () {
    const key = Array.prototype.join.apply(arguments, [''])
    if (cache[key]) {
      console.log('0')
      return cache[key]
    } else {
      console.log('1')
      let a = 1
      for (let i = 0; i < arguments.length; i++) {
        a = a * arguments[i]
      }
      return cache[key] = a
    }
  }
}
var f = mult1()
f(1, 2, 3)
f(1, 2, 3)

// 继续封装
// 这里用立即执行函数主要为了避免全局变量的污染
var mult2 = (function () {
  let cache = {}
  const cacl = function () {
    let a = 1
    for (let i = 0; i < arguments.length; i++) {
      a = a * arguments[i]
    }
    return a
  }
  return function () {
    const key = Array.prototype.join.call(arguments, ',')
    if (cache[key]) {
      console.log(0)
      return cache[key]
    } else {
      console.log(1)
      return cache[key] = cacl.apply(null, arguments)
    }
  }
})();
mult2(1, 2, 3)
mult2(1, 2, 3)
mult2(2, 2, 3)

// 3.2.1  高阶函数
// 1 函数作为参数传递  回调函数
var appendDiv = function (callback) {
  for (var i = 0; i < 100; i++) {
    var div = document.createElement('div')
    div.innerHTML = i
    document.body.appendChild(div)
    if (typeof callback === 'function') {
      callback(div)
    }
  }
}

appendDiv(function (data) {
  data.style.display = 'none'
})

// 2  Array.prototype.sort();
[1, 4, 5, 1, 11, 12, 34, 23].sort(function (a, b) {
  return b - a
})
// [5,4,1]
[1, 4, 5].sort(function (a, b) {
  return b - a
})
// [1,4,5]


// 将函数作为返回值输出
var getSingle = function (fn) {
  var ret
  return function () {
    console.log(ret)
    return ret || fn.apply(this, arguments)
  }
}
var getScript = getSingle(function () {
  return document.createElement('script')
})
var script1 = getScript()
var script2 = getScript()
console.log(script1) // '<script></script>'
console.log(script2) // '<script></script>'
console.log(script1 === script2) // true


// 高阶函数实现aop
Function.prototype.beforeFn = function (fn) {
  var _self = this
  console.log('000')
  console.log(this)
  console.log('000')
  return function () {
    console.log(this)
    fn.apply(this, arguments) //执行新函数 修正this
    return _self.apply(this, arguments) // 执行原函数
  }
}

var func = function () {
  console.log(2)
}
func = func.beforeFn(function () {
  console.log(1)
})
console.log(func)
func()

// 函数柯里化
var cost = (function () {
  var arg = []
  return function () {
    if (arguments.length === 0) {
      var mon = 0
      for (var i = 0; i < arg.length; i++) {
        mon += arg[i]
      }
      return mon
    } else {
      [].push.apply(arg, arguments)
    }
  }
})()

cost(100)
cost(200)

// 柯里化函数   应该是收集参数的
var currying = function (fn) {
  var arg = []
  return function fac() {
    if (arguments.length === 0) {
      return fn.apply(this, arg) // 执行消费函数
    } else {
      [].push.apply(arg, arguments) // 收集函数
      return fac //继续收集参数
    }
  }
}

// 具体的执行计算函数
var cost1 = function () {
  var money = 0
  for (var i = 0; i < arguments.length; i++) {
    money += arguments[i]
  }
  console.log(money)
  return money
}
var cost2 = currying(cost1)
cost2(1)
cost2(2)
cost2(3)

// 柯里化的核心是，收集参数 最后一步计算， 一个是收集参数的函数，一个是计算的函数， 执行函数的单一性原则。


// uncurrying
var obj = {
  'length': 1,
  '0': 1
}
Function.prototype.uncurrying = function () {
  var self = this
  return function () {
    var obj = Array.prototype.shift.apply(arguments)
    console.log(obj) // {0: 1, length: 1}
    return self.apply(obj, arguments)
  }
}
var push = Array.prototype.push.uncurrying();
push(obj, 2)
console.log(obj) //{0:1, 1:2, length: 2}

// 另一种实现方式 暂时未懂
Function.prototype.uncurrying = function () {
  var self = this
  return function () {
    return Function.prototype.call.apply(self, arguments)
  }
}

// 函数节流 节流原理， 将即将被执行的函数延迟一段时间执行， 如果该延迟执行还没有完成，则忽略接下来的调用该函数的请求
var throttle = function (fn, intervel) {
  var _self = fn,
    timer,
    firstTime = true
  return function () {
    var arg = arguments,
      _me = this  // 

    if (firstTime) {
      _self.apply(_me, arg) // 将fn函数的this指向执行时的上下文
      return firstTime = false
    }

    if (timer) {
      return false
    }
    timer = setTimeout(function () {
      clearTimeout(timer)
      timer = null
      _self.apply(_me, arg)
    }, intervel || 500)
  }
}

var obj = {
  name: 'lili',
  getConsole: () => {
    console.log(this)
    console.log(this.name)
  },
  getConsole1: function() {
    console.log(this.name)
  }
}

obj.onresize = throttle(obj.getConsole, 500)
obj.onresize1 = throttle(obj.getConsole1, 500)