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
