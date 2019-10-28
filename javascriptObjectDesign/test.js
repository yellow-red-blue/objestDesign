var obj = {
	a: 'a',
	getA: function () {
		console.log(this.a)
	}
}
var b = {
	a: 'b'
}
a.getA()
