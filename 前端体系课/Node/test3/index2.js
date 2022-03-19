// koa2 中间件的洋葱圈模型

const Koa = require('koa')
const app = new Koa()

// logger
app.use(async (ctx, next) => {
    await next() // 执行下一个中间件
    const rt = ctx.response.get('X-Response-Time'); // 获取时间差
    console.log(`${ctx.method}${ctx.url} - ${rt}`);
})

// X-Response-Time
app.use(async (ctx, next) => {
    const start = Date.now()
    await next() // 执行下一个中间件
    const ms = Date.now() - start; // 计算时间差   
    ctx.set('X-Response-Time', `${ms}ms`) // 记录或者设置时间差
})

// response
app.use(async (ctx, next) => {
    ctx.body = 'hello world'
})


app.listen(3000)
console.log('koa2 已经开始监听3000端口');