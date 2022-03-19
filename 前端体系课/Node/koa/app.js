const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const static = require('koa-static')

const index = require('./routes/index')
const users = require('./routes/users')
const comments = require('./routes/comments')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({ // request body 转换
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
// 日志格式
app.use(logger())
// 静态文件服务
app.use(static(__dirname + '/public'))
// 服务端模版引擎
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger 
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 模拟登陆（为了使用中间件）
app.use(async (ctx, next) => {
  const query = ctx.query
  if (query.user === '张三') {
    // 模拟登陆成功
    await next() // 执行下一步中间件
  } else {
    // 模拟登陆失败
    ctx.body = '请登录'
  }
})

// routes 注册路由          allowedMethods()是一种对于404或者返回为空的情况的一种补充
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(comments.routes(), comments.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app