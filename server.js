require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
// const cors = require('cors')

const app = express()
app.use((req, res, next) => {
    console.log("接收到任何请求：", req.method, req.url)
    next()
})
// 重要：必须在路由之前配置，否则后端拿不到前端传来的JSON数据
app.use(express.json())
app.use(express.static('public')) // 挂在前端页面
// app.use(cors()) // 解决跨域问题，允许所有来源的请求
//连接数据库
const uri = process.env.MONGODB_URI
mongoose.connect(uri)
    .then(() => console.log('✅ 数据库连接成功！'))
    .catch(err => {
        console.log('--- ❌ 报错详情 ---');
        console.log('错误代码 (code):', err.code);
        console.log('详细信息:', err.message);
        console.log('------------------');
    });
//路由分发
app.use('/api/books', require('./routes/bookRoutes'));

//启动服务器
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`服务器已启动，监听端口 ${port}`)
})
