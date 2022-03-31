// let regexp1 = /^\d{3}-\d{4}-\d{3}$/
// let str1 = '111-2222-333'
// console.log(regexp1.test(str1));
// let regexp2 = /^$./
// let str2 = 'fd'
// console.log(regexp2.test(str2));

// 五位字母，不区分大小写
let str = 'adbcd';
console.log(/^[a-zA-Z]{5}$/.test(str));

// 五位仅由小写字母、点构成
let str1 = 'mnp\\';
console.log(/^[a-z\.]{5}$/.test(str1));

// 四位小写字母，最后一位不为m
let str2 = 'fadg';
console.log(/^[a-z]{3}[a-ln-z]$/.test(str2));

// 11位数字，且以1开头
let str3 = '19857386550';
console.log(/^1\d{10}$/.test(str3));

// 字母开头，中间任意数量数字（最少一位），以字母结尾
let str4 = 'f325435432f'
console.log(/^[a-zA-Z]\d+[a-zA-Z]$/.test(str4));

// 符合网址规则
let str5 = 'www.baidu.com';
console.log(/^www\.\w+\.com(\.cn)?$/.test(str5));

// 利用循环语句循环执行exec，寻找所有匹配结果
let str6 = 'abc123def456ghi789';
let regexp = /\d+/g;
let result;
while (result = regexp.exec(str6)) {
    console.log(result);
}