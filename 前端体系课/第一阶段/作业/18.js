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
qiuhe = () => {
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
    return sum
}


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

// 莱布尼兹级数估算pi
pi = () => {
    let sum = 0;
    let item = 1;
    let n = Number(prompt('请输入数字n'))
    for (let i = 1; i <= n; i++) {
        item *= i / (2 * i + 1)
        sum += item
    }
    alert(sum * 2)
}

// 质数
zhishu = () => {
    outer: for (let i = 2; i < 100; i++) {
        for (let j = 0; j < Math.sqrt(i); j++) {
            if (i % j == 0) {
                // 外层添加label，直接循环外层
                continue outer;
            }
        }
        console.log(i)
    }
}

// 鸡兔同笼
jiAndRobbit = () => {
    for (let a = 0; a < 35; a++) {
        let b = 35 - a;
        if (2 * a + 4 * b == 94) {
            console.log('鸡有' + a + '兔子有' + b)
        }
    }
}

// 游戏得分
youxi = () => {
    for (let i = 1; i < 5; i++) {
        document.write('游戏第' + i + '轮，得分：<br>')
        for (let j = 1; j <= 10; j += 10) {
            document.write(j + "分&nbsp;&nbsp;");
        }
        document.write("<hr>");
    }
}

// 画星星
star = () => {
    for (let i = 1; i <= 9; i++) {
        for (let j = 1; j <= i; j++) {
            document.write("*");
        }
        document.write("<br>");
    }
}

// 九九乘法表
jiujiu = () => {
    for (let i = 1; i < 10; i++) {
        for (let j = 1; j <= i; j++) {
            document.write(j + "*" + i + "=" + j * i + "&nbsp;");
        }
        document.write("<br>");
    }
}

// 买东西
maidongxi = () => {
    let a = 5,
        b = 2,
        c = 10,
        times = 0;
    for (let i = 0; i <= 20; i++) {
        for (let j = 0; j <= 50; j++) {
            for (let k = 0; k <= 10; k++) {
                if (a * i + b * j + c * k == 100) {
                    times++
                }
            }
        }
    }
    console.log(times)
}

// 算数
suanshu = () => {
    let a = 0,
        b = 0,
        c = 0;
    for (let i = 100; i < 1000; i++) {
        a = Math.floor(i / 100);
        b = Math.floor((i % 100) / 10);
        c = i % 10;
        if (a > b && c > a && a + b + c == a * b * c) {
            console.log(i)
        }
    }
}

// 数组去重
quchong = () => {
    let arr = [1, 1, 1, 1, 1, 2, 3, 3, 4, 5, 2, 32, 42, 3, 43, 4, 2, 1243];
    let result = []
    for (let i = 0; i < arr.length; i++) {
        if (!result.includes(arr[i])) {
            result.push(arr[i])
        }
    }
    console.log(result);
}

// 随机算法，随机选3个
suiji = () => {
    let arr = [23, 4, 5, 321, 5, 4, 35, 3, 5, 1, 5, 3, 5];
    let result = [];
    for (let i = 0; i < 3; i++) {
        let n = parseInt(Math.random() * arr.length)
        result.push(arr[n]);
        arr.splice(n, 1);
    }
    console.log(result)
}

// 冒泡排序
maopao = () => {
    let arr = [2, 3, 2, 4, 5, 677, 3, 4, 17, 88, 3, ];
    for (let i = 1; i < arr.length; i++) {
        for (let j = arr.length - 1; j >= i; j++) {
            if (arr[j] < arr[j - 1]) {
                arr[j] = arr[j] + arr[j - 1]
                arr[j - 1] = arr[j] - arr[j - 1]
                arr[j] = arr[j] - arr[j - 1]
            }
        }
    }
}