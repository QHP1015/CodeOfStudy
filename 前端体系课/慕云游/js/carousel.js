 /**
  * 轮播图特效
  * 日期：2022/4/2
  * 作者：钱海蓬
  * */
 (function () {
     let carousel_list = document.querySelector('.carousel_list');
     let left_btn = document.querySelector('.leftbtn')
     let right_btn = document.querySelector('.rightbtn')
     let circle_ol = document.querySelector('.circles')
     let circle_lis = circle_ol.querySelectorAll('li')
     let banner = document.querySelector('.banner')

     console.log(circle_lis);

     //  克隆第一张图片
     let clone_li = carousel_list.firstElementChild.cloneNode(true);
     // 上树
     carousel_list.appendChild(clone_li);

     // 当前正在显示的图片序号
     let idx = 0

     // 节流锁
     let lock = true;

     // 右按钮事件监听
     right_btn.onclick = right_btn_handler;

     function right_btn_handler() {
         // 判断节流锁状态，若关闭，什么都不做
         if (!lock) return;
         // 关锁
         lock = false;
         //加上过渡
         carousel_list.style.transition = 'transform .5s ease 0s';
         idx++;
         carousel_list.style.transform = 'translateX(' + -16.66 * idx + '%)';

         if (idx > 4) {
             setTimeout(function () {
                 // 去掉过渡
                 carousel_list.style.transition = 'none';
                 // 删除transform属性
                 carousel_list.style.transform = 'none';
                 idx = 0;
             }, 500)
         }

         setCircles();

         //开锁
         setTimeout(function () {
             lock = true;
         }, 500)
     };

     // 左按钮事件监听
     left_btn.onclick = function () {
         // 判断节流锁状态，若关闭，什么都不做
         if (!lock) return;
         // 关锁
         lock = false;
         // 左按钮先写if语句
         if (idx === 0) {
             // 瞬间拉到最后
             carousel_list.style.transition = 'none';
             carousel_list.style.transform = 'translateX(' + -16.66 * 5 + '%)';
             idx = 4;
             // 加上过渡
             setTimeout(function () {
                 carousel_list.style.transition = 'transform .5s ease 0s';
                 carousel_list.style.transform = 'translateX(' + -16.66 * 4 + '%)';
             }, 0)
         } else {
             idx--;
             carousel_list.style.transform = 'translateX(' + -16.66 * idx + '%)';
         };

         setCircles();

         //开锁
         setTimeout(function () {
             lock = true;
         }, 500)
     }


     // 设置小圆点的current在谁身上
     function setCircles() {
         for (let i = 0; i <= 4; i++) {
             if (i == idx % 5) {
                 circle_lis[i].className = 'current';
             } else {
                 circle_lis[i].className = '';
             }
         }
     }

     // 事件委托
     circle_ol.onclick = function (e) {
         if (e.target.tagName.toLowerCase() == 'li') {
             let n = Number(e.target.getAttribute("data-n"));
             idx = n;
             carousel_list.style.transform = 'translateX(' + -16.66 * idx + '%)';
             setCircles();
         }
     }

     // 定时器，自动轮播
     let timer = setInterval(right_btn_handler, 2000);

     // 鼠标进入，轮播停止
     banner.onmouseenter = function () {
         clearInterval(timer);
     }
     // 鼠标离开，轮播开始
     banner.onmouseleave = function () {
         // 设表先关
         clearInterval(timer);
         timer = setInterval(right_btn_handler, 2000);
     }
 })();