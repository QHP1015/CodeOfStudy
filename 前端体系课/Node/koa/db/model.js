// 数据模型（规范数据格式）
const mongoose = require('./db')

// 定义Schema
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        require: true, //必填项
        unique: true // 唯一不重复
    },
    password: String,
    city: String,
    // 性别
    gender: {
        type: Number,
        default: 0 // 0保密，1男，2女
    }
}, {
    timestamps: true // 时间戳，自动添加文档的创建时间、更新时间等
})

// 定义model，对应一个集合
const User = mongoose.model('user', UserSchema)

module.exports = {
    User,
}