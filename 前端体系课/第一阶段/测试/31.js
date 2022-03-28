let a = 1;
let b = new Number(1);
console.log(typeof a);
console.log(typeof b);
let arr = [1, 24, 6, 4, 3, 6, 534]
console.log(Math.max.apply(null, arr));
console.log(Math.max(...arr));
console.log(a.__proto__ == Number.prototype);