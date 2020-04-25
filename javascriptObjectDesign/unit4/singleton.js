var singleTon = function (name) {
  this.name = name
}
singleTon.prototype.getName = function () {
  console.log(this.name)
}
singleTon.getInstance = (function () {
  var instance = null
  console.log(1)
  return function (name) {
    console.log(instance)
    if (!instance) {
      instance = new singleTon(name)
    }
    return instance
  }
})()

var a = singleTon.getInstance('seven1')
var b = singleTon.getInstance('seven2')
console.log(a)
console.log(b)
// 单例模式， 增加了类的不透明性  普通的需

// 要new 来创建，这个必须使用singeleTon.getInstance 来进行

// 4.2透明的单例模式
var createDiv = (function(){
  var instance
  var createDiv = function(n) {
    var div = document.createElement('div')
    div.innerHTML = n
    this.name = n
    document.body.appendChild(div)
  }
  return function(name) {
    console.log(1)
    if (!instance) {
      instance = new createDiv(name)
    }
    return instance
  }
})()

var div1 = createDiv('div1')
var div2 = createDiv('div2')
console.log(div1)
console.log(div2)

// 用代理实现单例模式。
// 一个实现创建类，，代理类来实现单例
// 创建类
var CreateDiv = function(html) {
  this.html = html
  this.init()
}
CreateDiv.prototype.init = function() {
  var div = document.createElement(div)
  div.innerHTML = this.html
  document.body.appendChild(div)
}
// 代理类。负责实现单例模式
var ProxySingletonCreateDiv = (function() {
  var instance
  return function(html) {
    if(!instance) {
      instance = new CreateDiv(html)
    }
    return instance
  }
})()

var a = new ProxySingletonCreateDiv('div1')
var b = new ProxySingletonCreateDiv('div2')

// 惰性单例
// 通用惰性单例
var getSingleton = function(fn) {
  var result
  return function() {
    return result || fn.apply(this, arguments)
  }
}

var createDiv = function() {
  var div = document.createElement(div)
  div.innerHTML = '我是登录浮窗'
  div.style.display = 'none'
  document.body.appendChild(div)
  return div
}
var createDivSingleton = getSingleton(createDiv)
document.getElementById('div').onclick = function() {
  var div = createDivSingleton()
  div.style.display = 'block'
}
// 创建实例对象的职责和管理单例的职责分别放置在两个方法里。两个方法可以独立变化而互不影响，两个链接在一起是，就完成
// 了创建唯一实例对象的功能。