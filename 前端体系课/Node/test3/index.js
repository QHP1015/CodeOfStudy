const Koa = require('koa')
const app = new Koa()


// ctx,context,即上下文
app.use(async (ctx) => {
    ctx.body = 'hello world'
})

app.listen(3000)