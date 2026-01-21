const mongoose = require('mongoose');

// 定义数据的样子
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, '书名是必填项'] // 增加后端校验
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// 导出模型
// mongoose.model('Book', bookSchema) 会在 MongoDB 中自动创建名为 'books' 的集合（Collection）
module.exports = mongoose.model('Book', bookSchema);