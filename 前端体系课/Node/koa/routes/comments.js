const router = require('koa-router')()

router.prefix('/api')

// 定义路由：模拟获取留言板列表
router.get('/list', async (ctx) => {
    const query = ctx.query
    console.log(query);
    ctx.body = {
        errno: 0,
        data: [{
                content: '留言1',
                user: '张三'
            },
            {
                content: '留言2',
                user: '王武'
            },
            {
                content: '留言3',
                user: '李四'
            }
        ]
    }
})

// 定义路由：模拟创建留言
router.post('/create', async (ctx) => {
    const body = ctx.request.body
    console.log(body);
    ctx.body = 'api create'
})

module.exports = router