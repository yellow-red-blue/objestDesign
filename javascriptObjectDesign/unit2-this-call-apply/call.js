// 1  this
// this的四种指向
// 1， 函数调用
// 2.对象调用   函数别名会导致this对象丢失
// 3. 构造器  new 
// 4.显示绑定 call  apply  bind


// 2 call  apply 
/*
apply接受两个参数  第一个参数指定了函数体内this对象的指向。第二个参数为一个带下标的集合 
这个集合可以为数组，也可以类数组， apply方法吧这个集合的元素作为参数传递给被调用的函数
call和apply的区别在于传参方式的区别。
当传入的第一个参数为null时，非严格模式函数体内this会指向默认的宿主对象。  浏览器中是window。
严格模式下会指向null
*/
var func = function (a, b, c) {
  console.log(this)
  console.log(a, b, c)
}
func(1, 2, 3) // window , 1, 2,3
func.apply(null, [4, 5, 6]) // window, 4, 5,6
func.apply({}, [2, 3, 4]) // {}  2,3,4
func.call({
  i: 'o'
}, 3, 4, 5) // {i: 'o'} 3, 4, 5

var func1 = function (a, b) {
  "use strict"
  console.log(this) // null  当传入null时候严格模式下会指向null  非严格模式下会指向 当前宿主对象
}
func1.apply(null, [3, 4]) // null

// 2.2.2 call和apply的拥堵
// 1.1 改变this的指向
var obj1 = {
  name: 'seven'
}
var obj2 = {
  name: 'six'
}
window.name = 'window'
var getName = function () {
  console.log(this.name)
}
getName() // window
getName.apply(obj1) // seven
getName.apply(obj2) // six

// 实际开发中经常遇到this被不经意改变的事
document.getElementById('div1').onclick = function () {
  console.log(this.id) //  this.div.id
  var func = function () {
    console.log(this.id) // undefined
  }
  func() //  函数调用 this指向了默认的window对象  此时需要修正this的指向
  func.apply(this) // this.div.id
}

// 1.2   bind  内置了Function.prototype.bind 用来指定函数内部this的指向
// 模拟bind的实现
Function.prototype.bind = Function.prototype.bind || function (context) {
  var that = this
  return function () {
    return that.apply(context, arguments)
  }
}
// 通常会实现的稍微复杂一点
Function.prototype.bind = function (context) {
  var that = this
  console.log(arguments) // [{name: 'sob},1,2]
  context = [].shift.call(arguments)
  console.log(context) // [{name: 'sob}]
  console.log(arguments) // [1, 2]
  args = [].slice.call(arguments) //[1, 2]
  return function () {
    console.log(arguments) // [3, 4, 5, 6, 7]
    return that.apply(context, [].concat.call(args, [].slice.call(arguments)))
  }
}
var obj2 = {
  name: 'sob'
}
var func = function (a, b, c, d) {
  console.log(this.name) // 'sob'
  console.log(arguments) // [1, 2, 3, 4, 5, 6]
}.bind(obj2, 1, 2)
func(3, 4, 5, 6, 7)

var f = function () {
  console.log(1)
  return function () {
    console.log(2)
  }
}
f(2) // f() {console.log(2)}
f(2)(1) // 依次执行

// 3，借用其他对象的方法
// 列举一些常用用法
// 1数组之间的追加
var arr1 = [3, 5, 6]
var arr2 = [6, 7, 8]
Array.prototype.push.apply(arr1, arr2)
console.log(arr1) // [3, 5,6,,6,7,8]
// 可以使用concat  和展开数组
//去重数组
// Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，
console.log(new Set([...arr1, ...arr2]))
const arrNew = [...new Set([...arr1, ...arr2])]

// 获取数组中的最大值最小值
var arr1 = [3, 5, 6, 3, 5, 1, 8]
const max = Math.max.apply(null, arr1)
console.log(max) // 8
const min = Math.min.apply({}, arr1)
console.log(min) // 1

// 验证是不是数组
Array.isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}