const http = require('http')

const a = undefined
const server = http.createServer((req, res) => {
    debugger
    const url = req.url;
    const path = url.split('?')[0];

    a()
    res.end(path)
})

server.listen(3000)

console.log('server listen is 3000')