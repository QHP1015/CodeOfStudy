// 演示async await 执行顺序
// 代码需在浏览器中执行

// 加载一张图片
async function getImg(url = '') {
    await fetch(url)
}

async function fn() {
    const url = 'https://image.baidu.com/search/detail?tn=baiduimagedetail&word=%E5%9F%8E%E5%B8%82%E5%BB%BA%E7%AD%91%E6%91%84%E5%BD%B1%E4%B8%93%E9%A2%98&album_tab=%E5%BB%BA%E7%AD%91&album_id=7&ie=utf-8&fr=albumsdetail&cs=1595072465,3644073269&pi=3977&pn=0&ic=0&objurl=https%3A%2F%2Ft7.baidu.com%2Fit%2Fu%3D1595072465%2C3644073269%26fm%3D193%26f%3DGIF'
    const start = Date.now() // 记录当前时间
    await getImg(url) // 加载图片
    const ms = Date.now() - start // 计算时间差
    console.log(`加载图片花费了${ms}毫秒`);
}

// fn()

async function a(){
    console.log('开始');
    await fn()
    console.log('结束');
}
a()