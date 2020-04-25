// 命令模式   命令模式的应用场景，
/*
有时候需要向某些对象发送请求，但是并不知道请求的接受者是谁，也不知道被请求的操作是什么，此时希望用
一种松耦的方式来设计软件，使得请求发送者和请求接收者能够消除彼此之间的耦合关系
*/
// 例子  菜单程序
<body>
  <button id="button1">点击按钮1</button>
  <button id="button2">点击按钮2</button>
  <button id="button3">点击按钮3</button>
</body>

var button1 = document.getElementById('button1')
var button2 = document.getElementById('button2')
var button3 = document.getElementById('button3')
var setCommand = function(button, command) {
  button.onclick = function() {
    command.excute()
  }
}

var menuBar = {
  refresh: function() {
    console.log('刷新菜单目录')
  }
}
var subBar = {
  add: function() {
    console.log('增加子菜单')
  },
  del: function() {
    console.log('删除子菜单')
  }
}
var RefreshCommand =  function(receiver) {
  this.receiver = receiver
}
RefreshCommand.prototype.excute = function() {
  this.receiver.refresh()
}
var AddCommand = function(receiver) {
  this.receiver = receiver
}
AddCommand.prototype.excute = function() {
  this.receiver.add()
}
var DelCommand = function(receiver) {
  this.receiver = receiver
}
DelCommand.prototype.excute = function() {
  this.receiver.del()
}

var refresh = new RefreshCommand(menuBar)
var add = new AddCommand(subBar)
var del = new DelCommand(subBar)
setCommand(button1, refresh)
setCommand(button2, add)
setCommand(button3, del)

Function.prototype.after = function(fn) {
  var self = this
  return function() {
    var ret = self.apply(this.arguments)
    if (ret === 'next') {
      return fn.apply(this,arguments)
    }
    return ret
  }
}
Function.prototype.after = function(fn) {
  return fn.apply(this, arguments)
}
var f = function(){
  console.log(1)
}
var s = f.after(function(){console.log(2)})
