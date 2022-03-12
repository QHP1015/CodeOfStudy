// 判断奇数和偶数
let num = Number(prompt('请输入一个数字'));
if (num % 2 == 0) {
    alert(n + "是一个偶数")
} else {
    alert(n + "是一个奇数")
}

//  BMI指数
let height = Number(prompt('请输入身高')),
    weight = Number(prompt('请输入体重'));
let bmi = weight / Math.pow(height, 2);
if (bmi < 18.5) {
    alert('偏瘦')
} else if (bmi < 24) {

}
alert(bmi)

// 水仙花数
let n = Number(prompt('请输入一个三位数'));
if (!isNaN(n) && n >= 100 && n <= 999) {
    let a = Math.floor(n / 100),
        b = Math.floor(n / 10) % 10,
        c = n % 10;
    if (Math.pow(a, 3) + Math.pow(b, 3) + Math.pow(c, 3) == n) {
        alert('这个数字是水仙花数')
    } else {
        alert('这个数字不是水仙花数')
    }
} else {
    alert('输入的数字不合法')
}

// 猜数字
let input = 0;
while (input != 5) {
    input = Number(prompt('请输入您猜的数字'));
    if (input < 5) {
        alert('猜小了')
    } else if (input > 5) {
        alert('猜大了')
    }
}
alert('猜对了')

// 求和
let sum = 0,
    i = 2;
while (i <= 100) {
    if (i == 22 || i == 44 || i == 66 || i == 88) {
        continue
    }
    sum += i;
    i += 2;
    document.write(i)
}
document.write(sum)

// 猜数字
let answer = parseInt(Math.random() * 98) + 2;
let min = 1,
    max = 100;
while (true) {
    let n = Number(prompt('请猜测数字' + min + '～' + max));
    if (n <= min || n >= max) {
        alert('你输入的数字不在范围内')
        continue
    }
    if (n > answer) {
        alert('你输入的数字太大了');
        max = n
    } else if (n < answer) {
        alert('你输入的数字太小了')
        min = n
    } else {
        alert('猜对了！')
        break;
    }
}