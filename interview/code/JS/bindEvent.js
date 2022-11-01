function bindEvent(elem, type, fn, selector) {
  elem.addEventListener(type, e => {
    const target = e.target;
    if (selector) {
      // 代理
      if (target.matches(selector)) {
        fn.call(target, e);
      }
    } else {
      // 普通
      fn.call(target, e);
    }
  });
}

// 普通绑定
const btn = document.querySelector(".btn1");

bindEvent(btn, "click", function (e) {
  e.preventDefault();
  console.log(this.innerHTML);
});
// 代理绑定
const div = document.querySelector(".div1");

bindEvent(
  div,
  "click",
  function (e) {
    e.preventDefault;
    console.log(this.innerHTML);
  },
  "a"
);
