// 使用model 操作数据

const {
    User
} = require('./model')

console.log('ok');

// 定义一个async的匿名函数并执行，为了可以使用await
!(async () => {
    // // 新增数据
    // const zhangsan = new User({
    //     username: 'zhangsan',
    //     password: 'abc',
    //     age: 45,
    //     city: 'beijing',
    //     gender: 1
    // })
    // zhangsan.save()

    const lisi = await User.create({
        username: 'lisi',
        password: '123',
        age: 24,
        city: 'shanghai',
    })
    console.log('lisi创建成功', lisi);
})()