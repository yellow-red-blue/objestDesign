var Plane = function () {

}
Plane.prototype.fire = function () {
  console.log('普通子弹')
}

var SecondPlane = function (plane) {
  this.plane = plane
}

SecondPlane.prototype.fire = function () {
  this.plane.fire()
  console.log(this.plane)
  console.log('导弹')
}

var ThirdPlane = function (plane) {
  this.plane = plane
}

ThirdPlane.prototype.fire = function () {
  this.plane.fire()
  console.log(this.plane)
  console.log('原子弹')
}

var plane = new Plane()
plane = new SecondPlane(plane)
plane = new ThirdPlane(plane)
plane.fire()
console.log(plane)

Function.prototype.before = function (beforeFn) {
  var _self = this
  return function () {
    console.log(this)
    beforeFn.apply(this, arguments)
    return _self.apply(this, arguments)
  }
}
var f = function() {

} 
f.before(function(){
  console.log(1)
})

var g = function(){
  return function(){
    console.log(this)
  }
}
var f = g()
f()
var obj = {
  cr: f
}
obj.cr()