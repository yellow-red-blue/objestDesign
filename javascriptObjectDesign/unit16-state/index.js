var offLightState = function(light) {
  this.light = light
}
function u() {
  console.log (0)
}
offLightState.prototype.buttonWasPressed = function() {
  console.log('弱光')
  this.light.setState(this.light.weakLightState)
}
var weakLightState = function(light) {
  this.light = light
}
weakLightState.prototype.buttonWasPressed = function() {
  console.log('强光')
  this.light.setState(this.light.strongLightState)
}
var strongLightState = function(light) {
  this.light = light
}
strongLightState.prototype.buttonWasPressed = function() {
  console.log('关灯')
  this.light.setState(this.light.offLightState)
}
