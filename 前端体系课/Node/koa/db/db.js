// 连接数据库

const mongoose = require('mongoose')

const url = 'mongodb://127.0.0.1:27017'
const dbName = 'comment2'


// 开始连接
mongoose.connect(`${url}/${dbName}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

const conn = mongoose.connection
conn.on('error', err => {
    console.error('连接错误', err);
})

module.exports = mongoose