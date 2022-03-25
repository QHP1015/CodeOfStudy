const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://127.0.0.1:27017'
const dbName = 'comment1'

MongoClient.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err, client) => {
    if (err) {
        console.error('连接错误', err);
        return
    }

    console.log('连接成功');
    // 切换数据库
    const db = client.db(dbName)

    // 切换到指定集合
    const userCollection = db.collection('users')

    // 查询数据
    // userCollection.find().sort({age:-1}).toArray((err, result) => {
    //     if (err) {
    //         console.error('查询数据出错', err);
    //         return
    //     }
    //     console.log('查询结果', result);
    // })

    // 新增数据
    // userCollection.insertOne({
    //     username: 'liudehua',
    //     password: 'abc',
    //     age: '34',
    //     city: 'xianggan'
    // }, (err, result) => {
    //     if (err) {
    //         console.error('插入出错', err);
    //         return
    //     }
    // console.log("插入成功", result.insertedCount,result.insertedId);
    // })

    // 修改数据
    // userCollection.updateOne({
    //         username: 'zhangsan'
    //     }, {
    //         $set: {
    //             age: 22,
    //             city: 'guangzhou'
    //         }
    //     },
    //     (err, result) => {
    //         if (err) {
    //             console.error('修改出错', err);
    //             return
    //         }
    //         console.log("修改成功", result.modifiedCount);
    //     }
    // )

    // 删除数据
    userCollection.deleteOne({
            username: 'wangwu'
        },
        (err, result) => {
            if (err) {
                console.error('删除出错', err);
                return
            }
            console.log("删除成功");
        }

    )


    // 关闭
    // client.close()
})