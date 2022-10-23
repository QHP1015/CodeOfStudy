const { src, dest, series, parallel } = require("gulp");
const del = require("del");
const htmlmin = require("gulp-htmlmin");
const fileinclude = require("gulp-file-include");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");

function clean() {
  return del(["dist"]);
}

function html() {
  return src("src/pages/*.{html,htm}")
    .pipe(
      fileinclude({
        // 自定义标识符
        prefix: "@@",
        // 基准路径（从哪里 include）
        basepath: "./src/pages/include",
      })
    )
    .pipe(
      // 压缩 HTML 文件
      // 配置：https://github.com/kangax/html-minifier
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
}

function css() {
  return (
    src("src/scss/*.scss")
      // Sacc -> CSS
      .pipe(sass())
      // 自动添加厂商前缀
      .pipe(autoprefixer())
      // 压缩CSS
      .pipe(cssmin())
      .pipe(dest("dist/css"))
  );
}

exports.default = series(clean, parallel(html, css));
