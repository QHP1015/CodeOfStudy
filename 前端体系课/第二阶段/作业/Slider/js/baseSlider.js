// 默认参数
import DEFAULTS from "./defaults.js";
import { ELEMENT_NODE } from "./constants.js";

class BaseSlider {
  constructor(elem, options) {
    // 判断传入的是否为 DOM 元素
    if (elem.nodeType !== ELEMENT_NODE) throw new Error("实例化的时候，请传入 DOM 元素！");

    // 实际参数
    this.options = {
      ...DEFAULTS,
      ...options,
    };

    // 定时器
    let timer;

    // 获取 DOM 元素
    const slider = elem;
    const sliderContent = slider.querySelector(".slider-content");
    const sliderItems = sliderContent.querySelectorAll(".slider-item");
    console.log(sliderItems);

    // 添加到 this 上，在后面方法中使用
    this.slider = slider;
    this.sliderContent = sliderContent;
    this.sliderItems = sliderItems;
    console.log(this.sliderItems);

    // 最小索引，最大索引，当前索引
    this.minIndex = 0;
    this.maxIndex = sliderItems.length - 1;
    this.currIndex = this.getCorrectedIndex(this.options.initialIndex);

    // 每个 slider-item 的宽度（每次移动的距离）
    this.itemWidth = sliderItems[0].offsetWidth;
    console.log(this.itemWidth);

    // 初始化
    this.init();
  }

  // 获取要移动的距离
  getDistance(index = this.currIndex) {
    return -this.itemWidth * index;
  }

  // 初始化
  init() {
    // 切换到初始索引 initialIndex
    this.move(this.getDistance());
    // 是否开启自动播放
    this.autoPlay(this.options.autoPlay);
    console.log(123);

    this.stopPlay(this.options.stopPlay);
    this.recoverPlay(this.options.stopPlay);
  }

  // 获取索引值
  getCorrectedIndex(index) {
    if (index < this.minIndex) return this.maxIndex;
    if (index > this.maxIndex) return this.minIndex;
    return index;
  }

  // 自动播放
  autoPlay(boolean) {
    console.log("play");

    if (boolean) {
      console.log("autoplay");
      this.timer = setInterval(() => {
        this.next();
        console.log("play");
      }, 1000);
    }
  }

  stopPlay(boolean) {
    if (boolean) {
      this.slider.onmouseenter = () => {
        clearInterval(this.timer);
      };
    }
  }

  recoverPlay(boolean) {
    if (boolean) {
      this.slider.onmouseout = () => {
        this.autoPlay();
      };
    }
  }

  // 移动幻灯片
  move(distance) {
    // this.sliderContent.style.transform = `translate3d(${distance}px, 0px, 0px)`;
    console.log(distance);
    this.sliderItems[this.currIndex].opacity=1;
  }

  // 切换到 index 索引对应的幻灯片
  to(index) {
    console.log("change");
    index = this.getCorrectedIndex(index);
    if (this.currIndex === index) return;

    this.currIndex = index;
    const distance = this.getDistance();
    return this.move(distance);
  }

  // 切换上一张
  prev() {
    this.to(this.currIndex - 1);
  }

  // 切换下一张
  next() {
    this.to(this.currIndex + 1);
  }
}

export default BaseSlider;
