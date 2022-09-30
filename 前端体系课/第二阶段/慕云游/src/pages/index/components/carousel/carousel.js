/* 轮播图特效
 * 机理：使用CSS3过渡，不是JS动画
 */
(function () {
    // 得到ul列表，就是它的translateX属性在变化
    var carousel_list = document.querySelector('#carousel_list');
    // 得到两个按钮
    var leftbtn = document.querySelector('#leftbtn');
    var rightbtn = document.querySelector('#rightbtn');
    // 小圆点
    var circles = document.querySelectorAll('#circles li');
    // banner
    var banner = document.querySelector('#banner');

    // 过渡表达式
    var transition = "all .5s ease-in-out 0s";

    // 克隆一项，这么做的目的是可以让最后一个轮播图可以平滑切换到开始的轮播图
    var clonednode = carousel_list.getElementsByTagName('li')[0].cloneNode(true);
    carousel_list.appendChild(clonednode);

    // 信号量
    var idx = 0;
    // 函数防抖
    var lock = true;

    // 右按钮点击事件
    rightbtn.onclick = rightbtnHan;
    
    function rightbtnHan() {
        // 函数防抖
        if (!lock) return;
        // 进入函数就关锁
        lock = false;
        // 设置过渡，之所以每次点击都要重新设置过渡，是因为放置最后一个图片将过渡删除了
        carousel_list.style.transition = transition;
        // 过渡完成后开锁
        setTimeout(function () {
            lock = true;
        }, 600);
        // 改变信号量
        idx++;
        // 进行拉动
        carousel_list.style.transform = 'translateX(' + (-100 / 6 * idx) + '%)'
        // 如果是最后一张轮播图，就等动画结束之后瞬间拉回0号轮播图
        if (idx > 4) {
            // 这个延时器相当于回调函数
            setTimeout(function () {
                // 瞬间拉回，要去掉监听
                carousel_list.style.transition = "none";
                // 拉回
                carousel_list.style.transform = 'none';
                // 信号量变为0
                idx = 0;
            }, 600);
        }
        setCircle();
    }


    // 左边按钮
    leftbtn.onclick = function () {
        // 函数防抖
        if (!lock) return;
        lock = false;
        carousel_list.style.transition = transition;

        setTimeout(function () {
            lock = true;
        }, 600);

        // 如果是最开始的图片，则瞬间就要拉到最后的图片上
        if (idx == 0) {
            // 瞬间拉到最后
            carousel_list.style.transition = "none";
            carousel_list.style.transform = 'translateX(' + (-100 / 6 * 5) + '%)';
            idx = 4;
            // 写1秒的延迟是为了防止transition还没有去掉
            setTimeout(function () {
                carousel_list.style.transition = transition;
                carousel_list.style.transform = 'translateX(' + (-100 / 6 * idx) + '%)'
            }, 1);
        } else {
            idx--;
            carousel_list.style.transform = 'translateX(' + (-100 / 6 * idx) + '%)'
        }
        setCircle();
    }

    // 设置小圆点加cur
    function setCircle() {
        for (var i = 0; i < circles.length; i++) {
            circles[i].className = '';
        }
        circles[idx % 5].className = 'cur';
    }

    // 小圆点的监听
    for (var i = 0; i < circles.length; i++) {
        (function (i) {
            circles[i].onclick = function () {
                idx = i;
                carousel_list.style.transition = transition;
                carousel_list.style.transform = 'translateX(' + (-100 / 6 * idx) + '%)'
                setCircle();
            }
        })(i);
    }

    // var timer = true;
    // // 定时器
    // setInterval(function(){
    //     if(timer){
    //         rightbtnHan();
    //     }
    // }, 1800);

    // 鼠标进入定时器清除
    banner.onmouseenter = function(){
        timer = false;
    }

    // 鼠标离开定时器继续
    banner.onmouseleave = function(){
        timer = true;
    }
})();