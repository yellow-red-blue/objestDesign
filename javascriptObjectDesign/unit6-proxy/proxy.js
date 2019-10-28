// 代理模式。加载图片
var myImage = (function () {
  var img = document.createElement('img')
  document.body.appendChild(img)
  return {
    setSrc: function (src) {
      img.src = src
      console.log(img.src)
    }
  }
})()

myImage.setSrc('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567051103914&di=121408c660537d4c26bfacbe3269bff6&imgtype=0&src=http%3A%2F%2Fpic.k73.com%2Fup%2Fsoft%2F2016%2F0102%2F092635_44907394.jpg')

var proxyImage = function() {
  var img = new Image
  img.onload = function() {
    myImage.setSrc(this.src)
  }
  return {
    setSrc: function(src) {
      myImage.setSrc('l')
      img.src = src
    }
  }
}