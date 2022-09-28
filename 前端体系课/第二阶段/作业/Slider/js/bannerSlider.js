import BaseSlider from "./baseSlider.js";

export default class BannerSlider extends BaseSlider {
  constructor(elem, options) {
    super(elem, options);

    // 定时器
    let timer;

    // 获取小圆点
    const btns = document.querySelectorAll("span");

    console.log(btns);
    // 添加到this中
    this.btns = btns;

    // 私有方法
    this.#bindChange();
    this.#autoPlay();
    this.#recoverPlay();
    this.#stopPlay();
  }

  // 点击改变图片
  #bindChange() {
    this.btns.forEach((item, index) => {
      item.addEventListener(
        "click",
        () => {
          clearInterval(this.timer);
          this.btns.forEach((item, index) => {
            if (item.className.length !== 0) {
              item.className = "";
            }
          });
          console.log("click");
          this.to(index);
          console.log(index);
          item.className = "active";
        },
        false
      );
    });
  }

  // 自动播放
  #autoPlay() {
    console.log("autoplay");
    this.timer = setInterval(() => {
      this.next();
      this.btns.forEach(item => {
        if (item.className.length !== 0) {
          item.className = "";
        }
      });
      console.log("click");
      // this.to(index);
      // console.log(index);
      this.btns[this.currIndex].className = "active";
      console.log("play");
    }, 1000);
  }

  // 鼠标移入停止播放
  #stopPlay() {
    this.slider.onmouseenter = () => {
      console.log("stop");
      clearInterval(this.timer);
    };
  }

  // 鼠标移出自动播放
  #recoverPlay() {
    this.slider.onmouseout = () => {
      clearInterval(this.timer);
      console.log("start");
      this.#autoPlay();
    };
  }
}
