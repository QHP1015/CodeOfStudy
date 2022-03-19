const http = require('http')

const server = http.createServer((req, res) => {
    // console.log('已经收到http请求');
    // 未返回任何东西
    const url = req.url
    console.log(url);
    res.end('hello world')
})

server.listen(3000)
console.log('http 请求已被监听');