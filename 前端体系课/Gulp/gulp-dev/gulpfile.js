const { src, dest, series, parallel, watch } = require("gulp");
const del = require("del");
const fileinclude = require("gulp-file-include");
const webserver = require("gulp-webserver");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const htmlmin = require("gulp-htmlmin");
const cssmin = require("gulp-cssmin");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const webpack = require("webpack-stream");
const webpackConfig = require("./webpack.config");

// 开发环境的任务
const dev = {
  // 清除 dev 目录
  clean() {
    return del(["dev"]);
  },
  // 处理 HTML
  html() {
    return src("src/pages/*.html")
      .pipe(
        fileinclude({
          // 自定义标识符
          prefix: "@@",
          // 基准路径（从哪里 include）
          basepath: "./src/pages/include",
        })
      )
      .pipe(dest("dev/pages"));
  },
  // 监听源文件变化
  watch() {
    console.log("开始监听源文件！");
    watch("src/pages/**/*", dev.html);
    watch("src/scss/*.scss", dev.css);
    watch("src/js/*.js", dev.js);
  },
  // 开发服务器（包含自动刷新）
  server() {
    return src("dev/").pipe(
      webserver({
        host: "localhost",
        port: "3000",
        // 文件修改的时候是否自动刷新页面
        livereload: true,
        // 默认打开哪个文件（dev 目录下）
        open: "./pages/index.html",
      })
    );
  },
  // 处理 CSS
  css() {
    return (
      src("src/scss/*.scss")
        // Sass -> CSS
        .pipe(sass())
        // 自动添加厂商前缀
        // .pipe(autoprefixer())
        .pipe(dest("dev/css"))
    );
  },
  // 处理 JS
  js() {
    return src("src/js/*.js").pipe(dest("dev/js"));
  },
  // 处理图片
  images() {
    return src("src/images/**/*").pipe(dest("dev/images"));
  },
};

// 生产环境的任务
const dist = {
  // 清除 dist 目录
  clean() {
    return del(["dist"]);
  },
  // 处理 HTML
  html() {
    return src("src/pages/*.html")
      .pipe(
        fileinclude({
          // 自定义标识符
          prefix: "@@",
          // 基准路径（从哪里 include）
          basepath: "./src/pages/include",
        })
      )
      .pipe(
        htmlmin({
          // 压缩多余空白
          collapseWhitespace: true,
          // 移除注释
          removeComments: true,
          // 移除空白属性
          removeEmptyAttributes: true,
          // 压缩布尔属性
          collapseBooleanAttributes: true,
          // 移除属性的引号
          removeAttributeQuotes: true,
          // 压缩 style 标签中的 CSS
          minifyCSS: true,
          // 压缩 script 标签中的 JS
          minifyJS: true,
          // 移除 style 和 link 标签上的 type 属性
          removeStyleLinkTypeAttributes: true,
          // 移除 script 标签上的 type 属性
          removeScriptTypeAttributes: true,
        })
      )
      .pipe(dest("dist/pages"));
  },
  // 处理 CSS
  css() {
    return (
      src("src/scss/*.scss")
        // Sass -> CSS
        .pipe(sass())
        // 自动添加厂商前缀
        .pipe(autoprefixer())
        // 压缩 CSS 文件
        .pipe(cssmin())
        .pipe(dest("dist/css"))
    );
  },
  // 处理 JS
  js() {
    // webpackConfig.mode = "development";
    return src("src/js/*.js")
      // .pipe(
      //   // ES6 -> ES5
      //   babel({
      //     presets: ["@babel/env"],
      //   })
      // )
      // 处理模块化
      .pipe(webpack(webpackConfig))
      // .pipe(uglify())
      .pipe(dest("dist/js"));
  },
  // 处理图片
  images() {
    return src("src/images/**/*").pipe(dest("dist/images"));
  },
};

exports.default = series(dev.clean, parallel(dev.html, dev.css, dev.js, dev.images), parallel(dev.watch, dev.server));

exports.dist = series(dist.clean, parallel(dist.html, dist.css, dist.js, dist.images));
