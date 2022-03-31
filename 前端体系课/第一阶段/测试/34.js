// 寄生组合式继承

// 接收两个参数，subType为子类的构造函数，superType是父类的构造函数
function inheritPrototype(subType, superType) {
    let prototype = Object.create(superType.prototype);
    subType.prototype = prototype
}

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
function Student(name, age, sex, school, sid) {
    // 借助构造函数
    People.call(this, name, sex, age)
    this.school = school;
    this.sid = sid
}
inheritPrototype(Student, People);
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
var hanmeimei = new Student('韩梅梅', 9, '女', '慕课小学', 100556);
hanmeimei.sleep();

