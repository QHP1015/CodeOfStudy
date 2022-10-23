// 1.获取gulp与插件
// const gulp = require("gulp");
const {src, dest, series, parallel, watch} = require("gulp");
const del = require('del');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');

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

// 2.5.处理JS文件
function js() {
    return src('src/js/*js')
        // ES6 -> ES5
        .pipe(babel({
            presets: ['@babel/env']
        }))
        // 合并JS
        .pipe(concat('index.js'))
        // 读取第三方 JS
        .pipe(src('src/vendor/*.js'))
        // 输出编译后、未压缩的 JS
        .pipe(dest('dist/js'))
        // 压缩混淆
        .pipe(uglify())
        // 重命名
        .pipe(rename({extname: '.min.js'}))
        // 输出
        .pipe(dest('dist/js'))
}

// 2.6.监控JS文件的变化，并执行相应的任务，watch不需要通知Gulp
function watchJS() {
  watch('src/js/*js',js);
}

// 3.导出任务
exports.copy = series(clean, copy);

// 顺序执行
// const dist = series(clean, html);
exports.dist = series(clean, html);

// 并发执行
exports.htmlCss = parallel(html, css);

// 顺序执行中，watch一般放在最后
exports.default = series(clean, parallel(html, css, js, copy),watchJS);
