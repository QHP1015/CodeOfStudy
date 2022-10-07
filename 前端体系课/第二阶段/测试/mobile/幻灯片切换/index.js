import Slider from './slider.js';

// new Slider(document.querySelector('.slider'));

const $el = document.querySelector('.slider');
const sliderInstance = new Slider($el);

swipe($el, function (direction) {
  if (direction === 'left') {
    //   切换下一张
    sliderInstance.next();
  } else if (direction === 'right') {
    //   切换上一张
    sliderInstance.prev();
  }
});

// 扫动手势
function swipe($el, cb) {
  // 最开始的触摸点
  const start = {};
  // 时间和距离阈值
  const threshold = {
    time: 500,
    distance: 100
  };

  $el.addEventListener('pointerdown', startHandler, false);
  // 阻止移动端默认行为
  $el.addEventListener(
    'touchstart',
    evt => {
      evt.preventDefault();
    },
    false
  );

  function startHandler(evt) {
    // 阻止 PC 端默认行为
    evt.preventDefault();

    start.time = new Date().getTime();
    start.x = evt.pageX;
    start.y = evt.pageY;

    document.addEventListener('pointerup', endHandler, false);
    document.addEventListener('pointercancel', endHandler, false);
  }
  function endHandler(evt) {
    const delta = {};
    let direction = '';

    delta.time = new Date().getTime() - start.time;
    delta.x = evt.pageX - start.x;
    delta.y = evt.pageY - start.y;

    // 判断是否是扫动手势
    if (
      delta.time > threshold.time ||
      (Math.abs(delta.x) < threshold.distance &&
        Math.abs(delta.y) < threshold.distance)
    ) {
      // 扫太慢或扫的距离太短，不是扫动手势
      return;
    } else {
      // 判断扫动方向
      if (Math.abs(delta.x) >= Math.abs(delta.y)) {
        // 左右扫动
        if (delta.x > 0) {
          // 右扫
          direction = 'right';
        } else {
          // 左扫
          direction = 'left';
        }
      } else {
        // 上下扫动
        if (delta.y > 0) {
          // 下扫
          direction = 'down';
        } else {
          // 上扫
          direction = 'up';
        }
      }

      cb.call($el, direction);
    }

    document.removeEventListener('pointerup', endHandler, false);
    document.removeEventListener('pointercancel', endHandler, false);
  }
}
