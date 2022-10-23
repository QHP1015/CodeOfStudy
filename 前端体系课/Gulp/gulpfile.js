// 1.获取gulp
// const gulp = require("gulp");
const { src, dest, series, parallel } = require("gulp");
const del = require('del');

// 2.创建任务
// 2.1.文件拷贝任务
function copy() {
  // return gulp.src("src/images/imooc.png").pipe(gulp.dest("dist/images/"));
  return src("src/images/**").pipe(dest("dist/images/"));
}

// 2.2.清除dist目录
function clean() {
  //   console.log("开始清除dist目录");
  //   setTimeout(() => {
  //     console.log("dist目录清除完毕");
  //     cb();
  //   }, 1000);
  return del(['dist']);
}

// 2.3.处理HTML文件
function html(cb) {
  console.log("开始处理HTML文件");
  setTimeout(() => {
    console.log("HTML文件处理完毕");
    cb();
  }, 2000);
}

// 2.4.处理CSS文件
function css(cb) {
  console.log("开始处理CSS文件");
  setTimeout(() => {
    console.log("CSS文件处理完毕");
    cb();
  }, 2000);
}

// 3.导出任务
exports.copy = series(clean, copy);

// 顺序执行
// const dist = series(clean, html);
exports.dist = series(clean, html);

// 并发执行
exports.htmlCss = parallel(html, css);

exports.default = series(clean, parallel(html, css));
