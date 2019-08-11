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