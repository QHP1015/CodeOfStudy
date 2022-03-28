// let obj = {
//     a: 1,
//     b: 22,
//     c: 88
// };
// for (let k in obj) {
//     console.log('变量obj的属性' + k + '的值是' + obj[k]);
// }

// let obj1 = {
//     a: 1,
//     b: 2,
//     c: 3
// };
// let obj2 = {
//     a: 1,
//     b: 2,
//     c: 3
// };
// console.log(obj1 == obj2);      // false
// console.log(obj1 === obj2);     // false

// let obj1 = {
//     a: 1,
//     b: 2,
//     c: [1, 2, 3]
// };
// let obj2 = {};
// for (let k in obj1) {
//     obj2[k] = obj1[k]
// }
// obj1.c.push(4)
// obj1.d = 4
// console.log(obj1);
// console.log(obj2);


// 深克隆1
// let obj1 = {
//     a: 1,
//     b: 2,
//     c: [33, 44, {
//         m: 55,
//         n: 66,
//         p: [77, 88]
//     }]
// };

// function deepClone(o) {
//     // 判断o是对象还是数组，先判断数组在判断对象，因为typeof数组也是对象
//     if (Array.isArray(o)) {
//         var result = [];
//         for (var i = 0; i < o.length; i++) {
//             result.push(deepClone(o[i]))
//         }
//     } else if (typeof o == 'object') {
//         var result = {};
//         for (var k in o) {
//             result[k] = deepClone(o[k])
//         }
//     } else {
//         var result = o;
//     }
//     return result;
// }

// let obj2 = deepClone(obj1);
// console.log(obj2);

// 深克隆2
// let obj1 = {
//     a: 1,
//     b: 2,
//     c: [33, 44, {
//         m: 55,
//         n: 66,
//         p: [77, 88]
//     }]
// };

// function deepClone(obj = {}) {
//     if (typeof obj !== 'object' || obj == null) {
//         // obj是null，或者不是对象和数组，直接返回
//         return obj;
//     }

//     // 初始化返回结果
//     let result;

//     if (obj instanceof Array) {   // 判断是否是数组
//         result = []
//     } else {
//         result = {}
//     }

//     for (let key in obj) {
//         // 保证key不是原型的属性
//         if (obj.hasOwnProperty(key)) {
//             // 递归调用
//             result[key] = deepClone(obj[key])
//         }
//     }

//     return result;
// }

// let obj2 = deepClone(obj1);
// console.log(obj2);

// 上下文规则1
// let obj1 = {
//     a: 1,
//     b: 2,
//     fn: function () {
//         console.log(this.a + this.b);
//     }
// };

// let obj2 = {
//     a: 3,
//     b: 4,
//     fn: obj1.fn
// };

// obj2.fn()


// function sum(a, b) {
//     return a + b;
// }
// console.log(sum.prototype);
// console.log(typeof sum.prototype);

// function People(name, age, sex) {
//     this.name = name;
//     this.age = age;
//     this.sex = sex;
// }
// // 往原型上添加属性
// People.prototype.nationality = '中国'
// var xiaoming = new People('小明', 12, '男')
// console.log(xiaoming.nationality);
// // 往原型上添加方法
// People.prototype.sayHello = function () {
//     console.log("你好，我是" + this.name);
// }

// var xiaohong = new People('小红', 11, '女')
// console.log(xiaoming.sayHello === xiaohong.sayHello);

// var arr = [1,2,3,4]
// console.log(arr.__proto__ === Array.prototype);
// console.log(arr.__proto__.__proto__ === Object.prototype);
// console.log(Array.prototype.hasOwnProperty('push'));

// 父类
function People(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
}
People.prototype.sayHello = function () {
    console.log('你好，我是' + this.name);
}
People.prototype.sleep = function () {
    console.log(this.name + '开始睡觉');
}
// 子类
function Student(name, age, sex, school, studentNumber) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.school = school;
    this.studentNumber = studentNumber
}
// 关键语句，实现继承
Student.prototype = new People();

Student.prototype.study = function () {
    console.log(this.name + '正在学习');
}
Student.prototype.exam = function () {
    console.log(this.name + '正在考试');
}
// 重写父类方法（override）
Student.prototype.sayHello = function () {
    console.log(this.name + '敬礼');
}
// 实例化
var hanmeimei = new Student('韩梅梅', 9, '女','慕课小学',100556)
hanmeimei.study();
hanmeimei.sayHello();
hanmeimei.sleep();