const http = require('http')
const queryString = require('querystring')

const server = http.createServer((req, res) => {
    const url = req.url
    const path = url.split('?')[0]
    const queryStr = url.split('?')[1]
    const method = req.method
    const query = queryString.parse(queryStr)

    if (path === '/api/list' && method === 'GET') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(JSON.stringify({
            errno: 0,
            dara: [{
                    user: '张三',
                    content: '留言1'
                },
                {
                    user: '李四',
                    content: '留言2'
                }
            ]
        }))
    }

    if (path === '/api/create' && method === 'POST') {

        console.log('req content-type is:', req.headers['content-type']);

        const reqType = req.headers['content-type']
        let bodyStr = ''
        req.on('data', chunk => {
            // chunk即流的每一段数据
            bodyStr = bodyStr + chunk.toString()
        })

        req.on('end', () => {
            if(reqType === 'application/json'){
                const body = JSON.parse(bodyStr)
                console.log('body is', body);
            }
            res.end('接收完成')
        })

        // const result = {
        //     errno: 0,
        //     message: '创建成功'
        // }
        // res.writeHead(200, {
        //     'Content-type': 'application/json'
        // })
        // res.end(JSON.stringify(result))

        return
    }

    // 没有命中路由，默认404
    res.writeHead(404, {
        'Content-type': 'text/plain'
    })
    res.end('404')
})

server.listen(3000)
console.log('http 请求已被监听');