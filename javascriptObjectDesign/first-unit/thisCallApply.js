/*
 *this 的四种指向。
 * 1. 指向默认对象 window 在严格模式下指向unfined
 * 2. 指向调用对象。 函数别名会导致this丢失
 * 3. call apply
 * 4 new  如果new 返回一个新对象则this指向新对象。如果不是返回一个新对象则指向新实例。
 *
 */
const arr = [1, 3, 5];
for (let item of arr) {
  console.log(item);
}
window.name = 'john';

function makeSound(animal) {
  animal.sound()
}

function Chickren() {

}
Chickren.prototype.sound = () => {
  console.log('咯咯咯')
}

function Duck() {

}
Duck.prototype.sound = () => {
  console.log('呱呱呱')
}
makeSound(new Chickren())
makeSound(new Duck())
// 1.2.3类型检查和多态  js是动态类型语言，无法再编译时进行类型检查，使用ts 可以
/**
interface Animal {
  makeSound():void
}

class Checkren implements Animal {
    makeSound() {
        console.log('gegege')
    }
}
class Dog implements Animal {
    makeSound() {
        console.log('wawawa')
    }
}

function test(o: Animal): void {
    o.makeSound()
}
const checkren = new Checkren()
const dog = new Dog()
test(checkren)
test(dog)
 * 
 * 
 * 
 */

// js中并不需要诸如此类向上转型之类的技术取得多态效果。只取决于有没有makeSound的方法

// 1.2.6 多态在面向对象程序设计中的作用
// 多态最根本的作用是通过吧过程化的条件分支语句转化为对象的多态性，从而消除这些条件分支语句
var googleMap = {
  show() {
    console.log('begin render map')
  }
}
var baiduMap = {
  show() {
    console.log('begin render map')
  }
}

var renderMap = () => {
  googleMap.show()
}

var renderMap1 = (type) => {
  // 条件分支语句 
  if (type === 'google') {
    googleMap.show()
  } else if (type === 'baidu') {
    baiduMap.show()
  }
}

var renderMap2 = (map) => {
  // 对象的多态性，
  if (map.show instanceof Function) {
    map.show()
  }
}

// 对象多态性提示我们 做什么和怎么去做是可以分开的。


// 1.4  原型模式 es5提供Object.create方法
var Plane = function () {
  this.weight = 100;
}
var plane = new Plane()
plane.blood = 50

var smallPlane = Object.create(plane)
console.log(smallPlane.blood) // 50

Object.create = Object.create || function (obj) {
  var F = function () {}
  F.prototype = obj // 把f的原型链指向obj  就能访问obj所有的属性了
  return new F()
}

// 1.4.5 javascript的原型继承
// 怎么判断一个函数是不是可以用new的
// 1  new   非严格模式下 通过new调用的指向新对象， 不能通过new调用的指向window
var fn = function () {
  console.log(this)
}
new fn() // animal {}
fn() // 非严格模式下Window  严格模式下undefined

// 2  es6  new target
var fn = function () {
  console.log(new.target)
}
new fn() // ƒ () {
//console.log(new.target)
// }
// new target  指向当前正在执行的函数  不过在构造方法调用中，new.target指向被new调用的构造函数
fn() // undefined