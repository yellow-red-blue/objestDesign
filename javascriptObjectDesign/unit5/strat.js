// 策略模式的核心就是  定义一系列算法。把他们一个个封装起来。并且是他们可以相互替换
// 普通写法
// 计算奖金 A, b, c
var calBouns = (level, salary) => {
  if (level === 'a') {
    return salary * 5
  }
  if (level === 'b') {
    return salary * 3
  }
  if (level === 'c') {
    return salary * 1
  }
}
// 如果要添加新的级别 s则必须要更改内部函数，包含过多if-else语句。 算法复用性差  如果其他地方需要重用这些算法，只有复制黏贴


// 第二种写法使用组合函数将算法单独提取出来
var levelA = salary => {
  return salary * 5
}
var levelB = salary => {
  return salary * 3
}
var levelC = salary => {
  return salary * 1
}
var calBounsSalay = (level, salary) => {
  if (level === 'a') {
    return levelA(salary)
  }
  if (level === 'b') {
    return levelB(salary)
  }
  if (level === 'c') {
    return levelC(salary)
  }
}
// 做到了算法的复用性，但是没哟解决根本 calBouns函数有可能越来越庞大。而且在系统变化时候缺乏弹性，

// 第三种写法使用策略模式重构代码  策略模式是指定义一系列算法，把他们一个个封装起来，策略模式的目的是讲算法的使用和算法的实现分离开来
// 定义算法策略类
var levelA = function () {}
levelA.prototype.calculate = salary => {
  return salary * 5
}
var levelB = function () {}
levelA.prototype.calculate = salary => {
  return salary * 3
}
var levelC = function () {}
levelA.prototype.calculate = salary => {
  return salary * 1
}

// 定义奖金类
var Bouns = function () {
  this.salary = null
  this.strategy = null
}
Bouns.prototype.setSalary = (salary) => {
  this.salary = salary
}
Bouns.prototype.setStrategy = (strategy) => {
  this.strategy = strategy
}
Bouns.prototype.getBouns = () => {
  return this.strategy.calculate(this.salary)
}




// jiavascript版本的策略模式
var strateies = {
  "A": (salary) => {
    return salary * 5
  },
  "B": (salary) => {
    return salary * 3
  },
  "C": (salary) => {
    return salary * 1
  }
}

var calBounsSalary = (level, salary) => {
  return strateies[level] * salary
}

// 表单验证。 练习，分析因为表单验证类和返回消息类。
// 策略类
var strategies = {
  isNonEmpty(value, errMsg) {
    if(value === '') {
      return errMsg
    }
  },
  minLength(value, length, errMsg) {
    if(value.length < length) {
      return errMsg
    }
  },
  maxLength(value, length, errMsg) {
    if (value.length > length) {
      return errMsg
    }
  },
  isMobile(value, errMsg) {
    if(!/(^1[3|5|7|8][0-9]{9}$)/.test(value)){
      return errMsg
    }
  }
}
// validator类。负责接收用户的请求 并委托给strategy对象。
var validataFunc = function() {
  var validator = new Validator()
  // 添加策略guize
  validator.add(resisterForm.userName, 'isNonEmpty', '用户名不能为空')
  validator.add(resisterForm.pwd, 'minLength:6', '密码长度不能少于6位')
  validator.add(resisterForm.moblie, 'isMobile', '请输入正确的手机号')
  var errMsg = validator.start()
  return errMsg
}
var errMsg = validataFunc()
if (errMsg) {
  alert(errMsg)
}
var Validator = function() {
  this.cache = []
}
Validator.prototype.add = function(value, rule, errMsg) {
  var arg = rule.split(':')
  var _self = this
  this.cache.push(function(){
    var strategy = arg.shift()
    arg.unshift(value)
    arg.push(errMsg)
    return strategies[strategy].apply(_self, arg)
  })
}

Validator.prototype.start = function() {
  for(var i = 0; i < this.cache.length; i++) {
    var sta = this.cache[i]
    var errMsg = sta()
    if(errMsg) {
      return errMsg
    }
  }
}

