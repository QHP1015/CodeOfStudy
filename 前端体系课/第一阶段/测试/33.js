// 道格拉斯·克罗克福德
// 原型式继承
// 函数的功能是以o为原型，创建新对象
function object(o) {
    // 创建一个临时构造函数
    function F() {}

    // 让这个构造函数的prototype指向o
    F.prototype = o;
    return new F();

    // create IE9+才支持
    // return Object.create(o);
}

var obj1 = {
    a: 23,
    b: 5
};

var obj2 = object(obj1);
console.log(obj2.__proto__ === obj1);

console.log(Array.__proto__);