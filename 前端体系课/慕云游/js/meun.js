(function () {
    let bannerNavUl = document.querySelector('#banner-nav-ul');
    let bannerNav = document.querySelector('.banner-nav');
    let menus = document.querySelectorAll('.menus-box .menu');
    let bannerLis = document.querySelectorAll('#banner-nav-ul li');

    // 事件委托，必须使用onmouseover事件，不能使用onmouseenter
    // onmouseover冒泡，onmouseenter不冒泡
    bannerNavUl.onmouseover = function (e) {
        if (e.target.tagName.toLowerCase() == 'li') {
            let t = e.target.getAttribute('data-t');
            // 排他操作，让所有li都去掉current类名
            for (let i = 0; i < bannerLis.length; i++) {
                bannerLis[i].className = bannerLis[i].getAttribute('data-t');
            }
            // 当前碰到的这个li，加类名current
            e.target.className += ' current';
            // 寻找匹配的menu
            let themenu = document.querySelector('.menus-box .menu[data-t=' + t + ']');
            // 寻找所有menu
            // 排他操作，让所有盒子都去掉current类名
            for (let i = 0; i < menus.length; i++) {
                menus[i].className = "menu";
            }
            // 匹配的这项加上current类名
            themenu.className = 'menu current';
        }
    }

    // 当鼠标离开大盒子，菜单关闭
    bannerNav.onmouseleave = function () {
        for (let i = 0; i < bannerLis.length; i++) {
            bannerLis[i].className = bannerLis[i].getAttribute('data-t');
            menus[i].className = 'menu';
        }
    }


})()